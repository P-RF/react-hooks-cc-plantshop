import React, { useState } from "react";
import PlantList from "./PlantList";

function NewPlantForm({ onAddPlant }) {
  const [newPlant, setNewPlant] = useState({ name: "", image: "", price: "" });

  const handleInputChange = (e) => {setNewPlant({...newPlant, [e.target.name]: e.target.value})};

  const handleNewPlantSubmit = (e) => {
    e.preventDefault();
  
    const { name, image, price } = newPlant

    if (!name || !image || !price) {
    return;
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name,
        image,
        price
      }),
    })
    .then((r) => r.json())
    .then((data) => {
      onAddPlant(data)
      setNewPlant({ name: "", image: "", price: "" });
    })
    .catch((error) => console.error("Error posting plant:", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleNewPlantSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} onChange={handleInputChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleInputChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
