import axios from "axios";
import React, { useState } from "react";

function UserProfileUpdate(props) {

    const [breeds, setBreeds] = useState();
    const [cities, setCities] = useState();
    const [expertise, setExpertise] = useState();

    const [cityPop, setCityPop] = useState('בחר מהרשימה');
    const [breedPop, setBreedPop] = useState('בחר מהרשימה');
    const [expertisePop, setExpertisePop] = useState('בחר מהרשימה');

    const [name, setName] = useState('');
    const [petName, setPetName] = useState('');
    const [petBreed,setPetBreed] = useState('');
    const [petExpertise, setPetExpertise] = useState('');
    const [petLocation, setPetLocation] = useState('');

    const breedsURL = "https://powerful-sierra-82767.herokuapp.com/utils/breeds";
    const citiesURL = "https://powerful-sierra-82767.herokuapp.com/utils/cities";
    const expertiseURL = "https://powerful-sierra-82767.herokuapp.com/utils/expertise"
    const usersURL = "https://powerful-sierra-82767.herokuapp.com/users/61a488dd56699ad92625ffd2";

    React.useEffect(() => {
        axios.get(expertiseURL).then((response) => {
            setExpertise(response.data);
        })
        axios.get(citiesURL).then((response) => {
            setCities(response.data);
        })
        axios.get(breedsURL).then((response) => {
            setBreeds(response.data);
        })
        // eslint-disable-next-line
    }, []);
    if (!expertise) return null;
    if (!breeds) return null;
    if (!cities) return null;

    function populateCities(e) {
        setCityPop(e.target.value);
    }

    function populateBreeds(e) {
        setBreedPop(e.target.value);
    }

    function populateExpertise(e) {
        setExpertisePop(e.target.value);
    }

    function updateProfile() {
        const userObj = {
            email:'null',
            password:'null',
            name: name,
            pet_name: petName,
            dogRaces: petBreed,
            expert: petExpertise,
            location:petLocation,
            photo: ''
        }
    
        const headers = {
            'Content-Type': 'application/json'
          }
    
        axios.post(usersURL, userObj, {
            headers: headers
        })
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });

        alert('Profile updated!')
    }
    

    return(
        <div className="profileCompletion">

            <h1>היי,</h1>
            <h2>ספר לנו קצת על עצמך:</h2>
            <form>
                <label htmlFor="profileName">איך נקרא לך?</label>
                <input id="profileName" type="text" value={name} onInput={e => setName(e.target.value)}></input>

                <label htmlFor="profilePetName">איך קוראים לכלב שלך?</label>
                <input id="profilePetName" type="text" value={petName} onInput={e => setPetName(e.target.value)}></input>

                <label htmlFor="profilePetBreed">איזה גזע יש ברשותך?</label>
                <select id="profilePetBreed" onChange={populateBreeds} value={petBreed} onInput={e => setPetBreed(e.target.value)}>
                {breeds.map((breedPop) => <option value={breeds._id}>{breedPop.name}</option>)}
                </select>
                
                <label htmlFor="profileExpertise">למה אתה מחפש מאלף?</label>
                    
                <select id="profileExpertise" onChange={populateExpertise} value={petExpertise} onInput={e => setPetExpertise(e.target.value)}>
                    {expertise.map((expertisePop) => <option value={expertisePop._id}>{expertisePop.name}</option>)}
                </select>
                

                <label htmlFor="profileLocation">איפה אתה גר?</label>
                <select id="profileLocation" onChange={populateCities} value={petLocation} onInput={e => setPetLocation(e.target.value)}>
                    {cities.map((cityPop) => <option value={cityPop._id}>{cityPop.name}</option>)}
                </select>
                    
                <input type="submit" value="אשר פרופיל" onClick={updateProfile}></input>
                </form>
                
        </div>
    )
}

export default UserProfileUpdate;