import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from './withauth';
import './Admin.css';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';

const Admin = () => {
  const [hadiths, setHadiths] = useState([]);
  const [toggle, setToggle] = useState({});
  const [showModal, setShowModal] = useState(false);


  const [hadith, setHadith] = useState('');
  const [narrator, setNarrator] = useState('');
  const [book, setBook] = useState('');
  const [info, setInfo] = useState({
    hadith : "",
    narrator: "",
    book: "",
  })


  const handleCloseSAved = () => {
    handleHadithSubmit()
    setShowModal(false)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const handleCloseUpdated = () => {
    
    setShowModal(false)
  }
  const handleShow = () => setShowModal(true);

  //toggle for haddith //
  const handleToggle = (hadith_id) => {
    setToggle(prevToggle => ({ ...prevToggle, [hadith_id]: !prevToggle[hadith_id] }));
  }
  useEffect(() => {
    axios.get('http://localhost:3005/ramadhan/admin/hadith')
      .then(res => setHadiths(res.data))
      .catch(err => console.log(err));
  }, []);

  //add  haddith //

  const handleHadithSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const hadith = form.elements.hadith.value;
    const narrator = form.elements.narrator.value;
    const book = form.elements.book.value;

    axios.post('http://localhost:3005/ramadhan/admin/hadith', {
      hadith,
      narrator,
      book
    })
      .then(res => {
        setHadiths([...hadiths, res.data]);
        setShowModal(false);
      })
      .catch(err => console.log(err));
  };


  //delete  haddith//

  const handleHadithDelete = (id) => {

    axios.delete(`http://localhost:3005/ramadhan/admin/hadith/${id}`)
      .then(() => setHadiths(hadiths.filter(hadith => hadith._id !== id)))
      .catch(err => console.log(err));
  };

const submitUpdate = (id)=>{

  const info = {
    hadith : hadith,
    narrator: narrator,
    book: book,
  };
  setInfo(info)
  axios.put(`http://localhost:3005/ramadhan/admin/hadith/${id}`,info)
  .then((response)=>setInfo(response.data))
  .catch((error)=>{console.log(error)})
}

  const handleHadithUpdate = (id) => {
    axios.put(`http://localhost:3005/ramadhan/admin/hadith/${id}`)
      .then(({ hadith }) => {

        setHadiths(hadiths.filter(hadith => hadith._id !== id))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>Hadiths</h2>

      {/* hadith card add and display */}

      <Button variant="primary" onClick={handleShow}>
        Add hadith
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hadith</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
          <Form onSubmit={handleHadithSubmit}>
            <Form.Group controlId="hadith">
              <Form.Label>Narrator</Form.Label>
              <Form.Control type="text" placeholder="Enter narrator" name="hadith" required />
            </Form.Group>

            <Form.Group controlId="narrator">
              <Form.Label>Hadiths</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter hadiths" name="narrator" required />
            </Form.Group>

            <Form.Group controlId="book">
              <Form.Label>Book</Form.Label>
              <Form.Control type="text" placeholder="Enter book" name="book" required />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Row className="gx-4 gx-md-5">
        {hadiths.map(hadith => (
          <Col lg={4} md={6} className="my-3" key={hadith._id}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-center" onClick={() => handleToggle(hadith._id)}>{hadith.narrator}</Card.Title>
                  {toggle[hadith._id] ? <h6 className="card-text mb-2 text-body-secondary">{hadith.hadith}</h6> : null}
                  <p className="card-text">{hadith.book}</p>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleHadithDelete(hadith._id)}>Delete</button>
                  {/* update hadith  */}
                 
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default withAuth(Admin);
