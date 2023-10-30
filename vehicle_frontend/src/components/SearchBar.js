import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ onSearch, onReset }) {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [types, setTypes] = useState([]);
    const [tagPositions, setTagPositions] = useState([]);
    const [tailLightShapes, setTailLightShapes] = useState([]);
    const [tailLightPositions, setTailLightPositions] = useState([]);
    const [tagMouldingShapes, setTagMouldingShapes] = useState([]);
    const [whiteLocations, setWhiteLocations] = useState([]);
    const [toRoofs, setToRoofs] = useState([]);
    const [breakLight, setBreakLightPositions] = useState([]);
    const [separateRefelctors, setSeparateRefelctors] = useState([]);
    const [reflectorOrientation, setReflectorOrientation] = useState([]);
    const [bumper, setBumper] = useState([]);
    const [exhaustCount, setExhaustCount] = useState([]);
    const [exhaustShape, setExhaustShape] = useState([]);
    const [exhaustPosition, setExhaustPosition] = useState([]);
    const [makeBadgeLocation, setMakeBadgeLocation] = useState([]);
    const [modelBadgeLocation, setModelBadgeLocation] = useState([]);
    const [trimBadgeLocation, setTrimBadgeLocation] = useState([]);
    const [fogLights, setFogLights] = useState([]);
    const [grill, setGrill] = useState([]);
    const [gasTank, setGasTank] = useState([]);
    const [mainFeature, setMainFeature] = useState([]);
    const [straight, setStraight] = useState([]);
    const [bumperToBumper, setBumperToBumper] = useState([]);

    
    const [allData, setAllData] = useState([]);

        // Selected states for the fields
        const [selectedValues, setSelectedValues] = useState({
            Make: "",
            Model: "",
            Trim: "",
            Type: "",
            TagPosition: "",
            TailLightShape: "",
            TailLightPosition: "",
            TagMouldingShape: "",
            WhiteLocation: "",
            ToRoof: "",
            BreakLight: "",
            SeparateReflectors: "",
            ReflectorOrientation: "",
            Bumper: "",
            ExhaustCount: "",
            ExhaustShape: "",
            ExhaustPosition: "",
            MakeBadgeLocation: "",
            ModelBadgeLocation: "",
            TrimBadgeLocation: "",
            FogLights: "",
            Grill: "",
            GasTank: "",
            Mainfeature: "",
            Straight: "",
            bumbertobumper: ""
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/vehicles/');
                    // const response = await axios.get('http://hudinio.pythonanywhere.com/api/get_vehicles');
                    const data = response.data;
                    setAllData(data);
            
                    setMakes([...new Set(data.map(item => item.Make))].sort().filter(item => item));
                    setTrims([...new Set(data.map(item => item.Trim))].sort().filter(item => item));
                    setTypes([...new Set(data.map(item => item.Type))].sort().filter(item => item));
                    setTagPositions([...new Set(data.map(item => item['TagPosition']))].sort().filter(item => item));
                    setTailLightShapes([...new Set(data.map(item => item['TailLightShape']))].sort().filter(item => item));
                    setTailLightPositions([...new Set(data.map(item => item['TailLightPosition']))].sort().filter(item => item));
                    setBreakLightPositions([...new Set(data.map(item => item['BreakLight']))].sort().filter(item => item));
                    setTagMouldingShapes([...new Set(data.map(item => item['TagMouldingShape']))].sort().filter(item => item));
                    setWhiteLocations([...new Set(data.map(item => item['WhiteLocation']))].sort().filter(item => item));
                    setToRoofs([...new Set(data.map(item => item['ToRoof']))].sort().filter(item => item));
                    setSeparateRefelctors([...new Set(data.map(item => item['SeparateReflectors']))].sort().filter(item => item));
                    setReflectorOrientation([...new Set(data.map(item => item['ReflectorOrientation']))].sort().filter(item => item));
                    setBumper([...new Set(data.map(item => item['Bumper']))].sort().filter(item => item));
                    setExhaustCount([...new Set(data.map(item => item['ExhaustCount']))].sort().filter(item => item));
                    setExhaustShape([...new Set(data.map(item => item['ExhaustShape']))].sort().filter(item => item));
                    setExhaustPosition([...new Set(data.map(item => item['ExhaustPosition']))].sort().filter(item => item));
                    setMakeBadgeLocation([...new Set(data.map(item => item['MakeBadgeLocation']))].sort().filter(item => item));
                    setModelBadgeLocation([...new Set(data.map(item => item['ModelBadgeLocation']))].sort().filter(item => item));
                    setTrimBadgeLocation([...new Set(data.map(item => item['TrimBadgeLocation']))].sort().filter(item => item));
                    setFogLights([...new Set(data.map(item => item['FogLights']))].sort().filter(item => item));
                    setGrill([...new Set(data.map(item => item['Grill']))].sort().filter(item => item));
                    setGasTank([...new Set(data.map(item => item['GasTank']))].sort().filter(item => item));
                    setMainFeature([...new Set(data.map(item => item['Mainfeature']))].sort().filter(item => item));
                    setStraight([...new Set(data.map(item => item['Straight']))].sort().filter(item => item));
                    setBumperToBumper([...new Set(data.map(item => item['bumbertobumper']))].sort().filter(item => item));


                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }, []);
        

    const handleMakeChange = (e) => {
        const selectedMake = e.target.value;
        setSelectedValues(prev => ({ ...prev, Make: selectedMake, Model: "", type: "" }));
        const uniqueModels = [...new Set(allData.filter(item => item.Make === selectedMake).map(item => item.Model))];
        setModels(uniqueModels);
    };
    
    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setSelectedValues(prev => ({ ...prev, Model: selectedModel, Trim: "" })); // Reset Trim when Model changes
    
        // Fetch the unique Trims based on the selected Model
        const relevantTrims = [...new Set(allData.filter(item => item.Model === selectedModel).map(item => item.Trim))];
        setTrims(relevantTrims);
    };
    

    const handleFieldChange = (field, value) => {
        let updatedValues = { ...selectedValues, [field]: value };
    
        switch (field) {
            case 'Make':
                updatedValues.Model = ""; // Reset Model when Make changes
                const relevantModels = allData.filter(item => item.Make === value).map(item => item.Model);
                setModels(relevantModels);
                break;              
    
            default:
                break;
        }
    
        setSelectedValues(updatedValues);
    };

    const handleSearchClick = () => {
        onSearch(selectedValues);
    };

    const resetFields = () => {
        setSelectedValues({
            Make: "",
            Model: "",
            Trim: "",
            Type: "",
            TagPosition: "",
            TailLightShape: "",
            TailLightPosition: "",
            TagMouldingShape: "",
            WhiteLocation: "",
            ToRoof: "",
            BreakLight: "",
            SeparateReflectors: "",
            ReflectorOrientation: "",
            Bumper: "",
            ExhaustCount: "",
            ExhaustShape: "",
            ExhaustPosition: "",
            MakeBadgeLocation: "",
            ModelBadgeLocation: "",
            TrimBadgeLocation: "",
            FogLights: "",
            Grill: "",
            GasTank: "",
            Mainfeature: "",
            Straight: "",
            bumbertobumper: "",
        });
        setModels([]);
        setTrims([]);
        onReset();
    };
    
    
    

    return (
        <><div className="search-container">

            <div className="group basic-info">
                <h3>Basic Information</h3>
                <select value={selectedValues.Make} onChange={handleMakeChange}>
                    <option value="">Select Make</option>
                    {makes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>

                <select value={selectedValues.Model} onChange={handleModelChange}>
                    <option value="">Select Model</option>
                    {models.map(model => <option key={model} value={model}>{model}</option>)}
                </select>

                <select value={selectedValues.Trim} onChange={e => handleFieldChange('Trim', e.target.value)}>
                    <option value="">Select Trim</option>
                    {selectedValues.Model && trims.map(trim => <option key={trim} value={trim}>{trim}</option>)}
                </select>


                <select value={selectedValues.Type} onChange={e => handleFieldChange('Type', e.target.value)}>
                    <option value="">Select Vehicle Type</option>
                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

            </div>
            <div className="vehicle-details-container">   
                <div className="group rear-details">
                    <h3>Vehicle Rear Details</h3>

                    <div className="detail-section left-section">
                        <h5>License Plate Details</h5>
                        <select value={selectedValues.TagPosition} onChange={e => handleFieldChange('TagPosition', e.target.value)}>
                            <option value="">Select Tag Position</option>
                            {tagPositions.map(position => <option key={position} value={position}>{position}</option>)}
                        </select>

                        <select value={selectedValues.TagMouldingShape} onChange={e => handleFieldChange('TagMouldingShape', e.target.value)}>
                            <option value="">Select Tag Moulding Shape</option>
                            {tagMouldingShapes.map(shape => <option key={shape} value={shape}>{shape}</option>)}
                        </select>
                    </div>

                    <div className="detail-section left-section">
                        <h5>Exhaust and Bumper Details</h5>
                        <select value={selectedValues.ExhaustCount} onChange={e => handleFieldChange('ExhaustCount', e.target.value)}>
                            <option value="">Select Exhaust Count</option>
                            {exhaustCount.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>

                        <select value={selectedValues.ExhaustShape} onChange={e => handleFieldChange('ExhaustShape', e.target.value)}>
                            <option value="">Select Exhaust Shape</option>
                            {exhaustShape.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>

                        <select value={selectedValues.ExhaustPosition} onChange={e => handleFieldChange('ExhaustPosition', e.target.value)}>
                            <option value="">Select Exhaust Position</option>
                            {exhaustPosition.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                        <select value={selectedValues.Bumper} onChange={e => handleFieldChange('Bumper', e.target.value)}>
                            <option value="">Select Bumper Style</option>
                            {bumper.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </div>

                    <div className="detail-section right-section">
                        <h5>Tail Light Details</h5>
                        <select value={selectedValues.TailLightShape} onChange={e => handleFieldChange('TailLightShape', e.target.value)}>
                            <option value="">Select Tail Light Shape</option>
                            {tailLightShapes.map(shape => <option key={shape} value={shape}>{shape}</option>)}
                        </select>

                        <select value={selectedValues.TailLightPosition} onChange={e => handleFieldChange('TailLightPosition', e.target.value)}>
                            <option value="">Select Tail Light Position</option>
                            {tailLightPositions.map(position => <option key={position} value={position}>{position}</option>)}
                        </select>

                        <select value={selectedValues.BreakLight} onChange={e => handleFieldChange('BreakLight', e.target.value)}>
                            <option value="">Select Break Light Position</option>
                            {breakLight.map(position => <option key={position} value={position}>{position}</option>)}
                        </select>
                    </div>

                    <div className="detail-section right-section">
                        <h5>Other Details</h5>
                        <select value={selectedValues.WhiteLocation} onChange={e => handleFieldChange('WhiteLocation', e.target.value)}>
                            <option value="">Select White Location</option>
                            {whiteLocations.map(location => <option key={location} value={location}>{location}</option>)}
                        </select>

                        <select value={selectedValues.ToRoof} onChange={e => handleFieldChange('ToRoof', e.target.value)}>
                            <option value="">Tail Lights To Roof?</option>
                            {toRoofs.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>

                        <select value={selectedValues.SeparateReflectors} onChange={e => handleFieldChange('SeparateReflectors', e.target.value)}>
                            <option value="">Are Reflectors Separate?</option>
                            {separateRefelctors.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>

                        <select value={selectedValues.ReflectorOrientation} onChange={e => handleFieldChange('ReflectorOrientation', e.target.value)}>
                            <option value="">Select Reflector Orientation</option>
                            {reflectorOrientation.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </div>
                
                </div>

                <div className="group front-details">
                    <h3>Vehicle Front Details</h3>
                    <select value={selectedValues.FogLights} onChange={e => handleFieldChange('FogLights', e.target.value)}>
                        <option value="">Select Fog Lights</option>
                        {fogLights.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.Grill} onChange={e => handleFieldChange('Grill', e.target.value)}>
                        <option value="">Select Grill</option>
                        {grill.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                </div>
            </div>

            <div className="branding-additional-container">
                <div className="group branding">
                    <h3>Branding and Identification</h3>
                    <select value={selectedValues.MakeBadgeLocation} onChange={e => handleFieldChange('MakeBadgeLocation', e.target.value)}>
                        <option value="">Select Make Badge Location</option>
                        {makeBadgeLocation.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.ModelBadgeLocation} onChange={e => handleFieldChange('ModelBadgeLocation', e.target.value)}>
                        <option value="">Select Model Badge Location</option>
                        {modelBadgeLocation.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.TrimBadgeLocation} onChange={e => handleFieldChange('TrimBadgeLocation', e.target.value)}>
                        <option value="">Select Trim Badge Location</option>
                        {trimBadgeLocation.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                </div>

                <div className="group additional-features">
                    <h3>Additional Features</h3>
                    <select value={selectedValues.GasTank} onChange={e => handleFieldChange('GasTank', e.target.value)}>
                        <option value="">Select Gas Tank</option>
                        {gasTank.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.Mainfeature} onChange={e => handleFieldChange('Mainfeature', e.target.value)}>
                        <option value="">Select Main Feature</option>
                        {mainFeature.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.Straight} onChange={e => handleFieldChange('Straight', e.target.value)}>
                        <option value="">Select Straight</option>
                        {straight.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>

                    <select value={selectedValues.bumbertobumper} onChange={e => handleFieldChange('bumbertobumper', e.target.value)}>
                        <option value="">Select Bumper to Bumper</option>
                        {bumperToBumper.map(value => <option key={value} value={value}>{value}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <div className="button-container">
            <button onClick={resetFields}>Reset</button>
            <button onClick={handleSearchClick}>Search</button>
        </div>
        <hr />
        </>

    );    
}

export default SearchBar;