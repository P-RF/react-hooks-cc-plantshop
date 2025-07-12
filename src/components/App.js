import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {

// fetch plants
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(data => {
      setPlants(Array.isArray(data) ? data : [data]);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false)
    })
  }, []);


  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} setPlants={setPlants} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
