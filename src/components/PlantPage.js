import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, setPlants }) {
  const [searchTerm, setSearchTerm] = useState("");


  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  };

  const handleUpdatePlant = (updatedPlant) => {
    setPlants(plants.map(plant => plant.id === updatedPlant.id ? updatedPlant : plant));
  };

  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
