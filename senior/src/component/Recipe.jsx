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
          alt={recipe.label}
          className="card-img-top rounded-0"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="text-center">{recipe.label}</Card.Title>
            <Card.Text className="mt-3">{recipe.source}</Card.Text>
          </div>
          <div className="text-center">
            <Button
              variant="outline-primary"
              className="px-4 py-2 mt-3 text-uppercase fw-bold"
              href={recipe.url}
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
    <Row className="gx-4 gx-md-5">
      {recipes.map((recipe, i) => (
        <RecipeCard key={i} recipe={recipe} />
      ))}
    </Row>
  );
};

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [caloriesFilter, setCaloriesFilter] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3005/ramadhan/recipe')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredRecipes = caloriesFilter
    ? recipes.filter((recipe) => {
        const calories = recipe.calories;
        if (caloriesFilter === 'low') {
          return calories < 500;
        } else if (caloriesFilter === 'medium') {
          return calories >= 500 && calories <= 800;
        } else if (caloriesFilter === 'high') {
          return calories > 800;
        } else {
          return true;
        }
      })
    : recipes;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 display-4 text-primary">
        Ramadhan Halal Recipes
      </h1>
      <Nav variant="pills" className="mb-5 justify-content-center">
        <Nav.Item>
          <Nav.Link
            className="text-uppercase fw-bold"
            onClick={() => setCaloriesFilter('low')}
          >
            Less Calories
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="text-uppercase fw-bold"
            onClick={() => setCaloriesFilter('medium')}
          >
            Medium Calories
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="text-uppercase fw-bold"
            onClick={() => setCaloriesFilter('high')}
          >
            More Calories
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {filteredRecipes.length > 0 ? (
        <RecipeList recipes={filteredRecipes} />
      ) : (
        <div className="text-center mt-5">
          <h3>No recipes found for this calorie range</h3>
        </div>
      )}
    </div>

  );
};

export default Recipe;
