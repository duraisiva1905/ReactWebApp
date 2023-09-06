import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./post.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
function Post() {
  const [cards, setCards] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardImage, setNewCardImage] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardImage("");
  };

  const handleSignout = () => {
    navigate("/login");
  };

  const handleAddCard = async () => {
    try {
      const newCard = {
        image: newCardImage,
        title: newCardTitle,
        description: newCardDescription,
      };

      const token = localStorage.getItem("token");

      // Send a POST request to your backend API
      const response = await axios.post(
        `http://localhost:5000/post/add`,
        newCard,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Update the URL as needed

      newCard.id = response.data.post.id;

      console.log(newCard);
      // Check if the card was added successfully
      if (response.status === 201) {
        setCards([...cards, newCard]);
        handleCloseModal();
      } else {
        console.error("Failed to add card:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleRemoveCard = async (id, index) => {
    console.log(id);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:5000/post/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
      } else {
        // Handle the error case here
        console.error("Failed to add card:", response.data.error);
        // You can show an error message to the user if needed
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/post/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, []);

  return (
    <div className="bg">
      <Button
        type="submit"
        onClick={handleSignout}
        className="signout-btn boot-btn"
      >
        Sign Out
      </Button>

      <div className="header">
        <h1>Technologies</h1>
        <Button
          type="submit"
          onClick={handleOpenModal}
          className="boot-btn mt-2"
        >
          Add
        </Button>
      </div>

      <Modal centered size="xxs" show={modalIsOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <input
            type="text"
            placeholder="Image Link"
            value={newCardImage}
            onChange={(e) => setNewCardImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Card Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <textarea
            placeholder="Card Description"
            rows="5"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
          />
          <Button
            type="submit"
            className="boot-btn mt-2"
            onClick={handleAddCard}
          >
            Add
          </Button>
        </Modal.Body>
      </Modal>

      <div className="container">
        {cards.length === 0 ? (
          <div className="no-cards">
            <img
              src="https://cdn.dribbble.com/users/683081/screenshots/2728654/exfuse_app_main_nocontent.png"
              alt="No Cards"
              className="no-cards-image"
            />
            <p>No cards available. Please add some.</p>
          </div>
        ) : (
          cards.map((card, index) => (
            <div className="post-card" key={index}>
              <img src={card.image} alt={` ${card.title}`} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Button
                type="submit"
                className="boot-btn mt-2"
                onClick={() => handleRemoveCard(card.id, index)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Post;
