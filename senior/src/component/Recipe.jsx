import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Row, Nav } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
 
 
  return (
    <Col lg={4} md={6} className="my-3">
      <Card className="h-100 border-0 shadow-sm">
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.title}
          className="card-img-top rounded-0"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="text-center">{recipe.title}</Card.Title>
            <Card.Text className="mt-3">{recipe.description}</Card.Text>
          </div>
          <div className="text-center">
            <Button
              variant="outline-primary"
              className="px-4 py-2 mt-3 text-uppercase fw-bold"
              href={`/recipes/${recipe.id}`}
            >
            View Recipe
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <Row className="gx-4 gx-md-5" >
      {recipes.map((recipe,i) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Row>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3005/ramadhan/halalfood')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);


  // const handleCategorySelect = (category) => {
  //   axios
  //     .get(`https://api.edamam.com/search?q=${category}&app_id=82e453da&app_key=3bb5d1a3b992f408b9003effd74c9c22`)
  //     .then((response) => {
  //       setRecipes(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 display-4 text-primary">
        Ramadhan Halal Recipes
      </h1>
      <Nav variant="pills" className="mb-5 justify-content-center">
        <Nav.Item>
          <Nav.Link
            // onClick={() => handleCategorySelect('Syrian')}
            className="text-uppercase fw-bold"
          >
            Syrian
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            // onClick={() => handleCategorySelect('Egyptian')}
            className="text-uppercase fw-bold"
          >
            Egyptian
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            // onClick={() => handleCategorySelect('Tunisian')}
            className="text-uppercase fw-bold"
          >
            Tunisian
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <RecipeList recipes={recipes} />
      {recipes.length === 0 && (
        <div className="text-center mt-5">
          <h3>No recipes found for this cuisine</h3>
        </div>
      )}
    </div>
  );
};

export default App;
