import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';

function VehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/vehicles/');
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (criteria) => {
        // Log the criteria passed from the SearchBar
        // console.log("Criteria from SearchBar:", criteria);

        // Remove properties with empty values to ensure they don't influence filtering.
        const cleanedCriteria = Object.keys(criteria).reduce((acc, key) => {
            if (criteria[key] !== "") {
                acc[key] = criteria[key];
            }
            return acc;
        }, {});

        // console.log("Cleaned Criteria:", cleanedCriteria); // Log the cleaned-up criteria

        setSearchCriteria(cleanedCriteria);
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        for (let key in searchCriteria) {
            if (vehicle[key] !== searchCriteria[key]) {
                return false;
            }
        }
        return true;
    });

    // Log the filtered vehicles
    console.log("Filtered Vehicles:", filteredVehicles);
    
    const constructImagePath = (vehicle) => {
        return `O:/Criminal Investigative Support Division/TAB/For Joe Pyle/Vehicle Analysis Images/${vehicle.Make}/${vehicle.Model}/${vehicle.Year}/${vehicle.Trim}/`;
    }

    const handleImageError = (event) => {
        event.target.style.display = 'none'; // Hide the broken image icon
        event.target.nextSibling.style.display = 'block'; // Show the placeholder box
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className="vehicle-card-container">
            {filteredVehicles
            .sort((a, b) => {
                if (a.Make < b.Make) return -1;
                if (a.Make > b.Make) return 1;
                if (a.Model < b.Model) return -1;
                if (a.Model > b.Model) return 1;
                return parseInt(a.Year) - parseInt(b.Year);
            })
            .map(vehicle => (
                <div key={vehicle['Reference #']} className="vehicle-card">
                    <h4 className="vehicle-title">
                        {vehicle.Year} {vehicle.Make} {vehicle.Model}
                    </h4>
                    <div className="details-group">
                        <strong>Trim:</strong> {vehicle.Trim}
                    </div>
                    <div className="details-group">
                        <strong>Type:</strong> {vehicle.Type}
                    </div>
                    {/* ... repeat for other fields ... */}
                    <div className="image-carousel">
                        {[
                            "driver_side.jpg",
                            "front.jpg",
                            "front_driver_quarter.jpg",
                            "front_pass_quarter.jpg",
                            "pass_side.jpg",
                            "rear.jpg",
                            "rear_driver_quarter.jpg",
                            "rear_pass_quarter.jpg"
                        ].map((imageName, index) => (
                            <>
                                <img 
                                    key={index} 
                                    src={`${constructImagePath(vehicle)}${imageName}`} 
                                    alt={`${vehicle.Make} ${vehicle.Model} ${imageName.replace('.jpg', '')}`} 
                                    className="image-box"
                                    onError={handleImageError}
                                />
                                <div className="vehicle-image-placeholder" style={{display: 'none'}}>
                                    {/* This div will be displayed when the image can't be loaded */}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default VehicleList;