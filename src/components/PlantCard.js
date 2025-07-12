import React, { useState } from "react";

function PlantCard( { plant, onUpdatePlant, onDeletePlant } ) {
  const { name, image } = plant;
  const [price, setPrice] = useState(plant.price)
  const [inStock, setInStock] = useState(true);

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    })
    .then(r => {
      if (r.ok) {
        onDeletePlant(plant.id);
      } else {
        alert("Failed to delete")
      }
    });
  };

  const handlePriceChange = ((e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
    .then(r => r.json())
    .then(updatedPlant => onUpdatePlant(updatedPlant))
  })

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}
        <input 
          type="number"
          value={price}
          step="0.01"
          onChange={handlePriceChange}
        />
      </p>
      {inStock ? (
        <button className="primary" onClick={() => setInStock(false)}>In Stock</button>
      ) : (
        <button onClick={() => setInStock(true)}>Out of Stock</button>
      )}
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
