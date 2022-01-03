import axios from "axios";
import React, { useState } from "react";
import { storage } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

function TrainerProfileUpdate() {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState();
  const [cities, setCities] = useState();
  const [expertise, setExpertise] = useState();

  const [cityPop, setCityPop] = useState("בחר מהרשימה");
  const [breedPop, setBreedPop] = useState("בחר מהרשימה");
  const [expertisePop, setExpertisePop] = useState("בחר מהרשימה");

  const [name, setName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petExpertise, setPetExpertise] = useState("");
  const [petLocation, setPetLocation] = useState("");
  const [exp, setExp] = useState(1);

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const breedsURL = "https://powerful-sierra-82767.herokuapp.com/utils/breeds";
  const citiesURL = "https://powerful-sierra-82767.herokuapp.com/utils/cities";
  const expertiseURL =
    "https://powerful-sierra-82767.herokuapp.com/utils/expertise";
  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  const trainerID = localStorage.trainerID;

  React.useEffect(() => {
    axios.get(expertiseURL).then((response) => {
      setExpertise(response.data);
    });
    axios.get(citiesURL).then((response) => {
      setCities(response.data);
    });
    axios.get(breedsURL).then((response) => {
      setBreeds(response.data);
    });
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

  function updateProfile(e) {
    e.preventDefault();

    const trainerObj = {
      name: name,
      dogRace: petBreed,
      expert: petExpertise,
      city: petLocation,
      photos: [imageAsUrl],
      experience: exp,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    if (imageAsUrl) {
      axios
        .patch(trainersURL + trainerID, trainerObj, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          console.log(imageAsUrl);
          navigate("/register/wait-for-approval");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/trainers/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("trainers")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl(fireBaseUrl);
          });
      }
    );
  }

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  return (
    <div data-testid="trainerProfile" className="profileCompletion">
      <h1>היי,</h1>
      <h2>ספר לנו קצת על עצמך:</h2>
      <form>
        <label htmlFor="profileName">איך נקרא לך?</label>
        <input
        required
          id="profileName"
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="profilePetBreed">באילו גזעים אתה מתמחה?</label>
        <select
        required
          id="profilePetBreed"
          onChange={populateBreeds}
          value={petBreed}
          onInput={(e) => setPetBreed(e.target.value)}
        >
          {breeds.map((breedPop) => (
            <option value={breedPop._id}>{breedPop.name}</option>
          ))}
        </select>

        <label htmlFor="experienceTime">שנות ניסיון</label>
        <input
        required
          id="experienceTime"
          type="range"
          min="1"
          max="20"
          onInput={(e) => setExp(e.target.value)}
        />
        <span className="sliderVal">{exp} שנות ניסיון</span>

        <label htmlFor="profileExpertise">התמחויות</label>

        <select
        required
          id="profileExpertise"
          onChange={populateExpertise}
          value={petExpertise}
          onInput={(e) => setPetExpertise(e.target.value)}
        >
          {expertise.map((expertisePop) => (
            <option value={expertisePop._id}>{expertisePop.name}</option>
          ))}
        </select>

        <label htmlFor="profileLocation">איפה אתה גר?</label>
        <select
        required
          id="profileLocation"
          onChange={populateCities}
          value={petLocation}
          onInput={(e) => setPetLocation(e.target.value)}
        >
          {cities.map((cityPop) => (
            <option value={cityPop._id}>{cityPop.name}</option>
          ))}
        </select>

        <input type="file" onChange={handleImageAsFile} />

        <input
          type="submit"
          value="אשר פרופיל"
          onClick={updateProfile}
          name={name}
        ></input>
      </form>
    </div>
  );
}

export default TrainerProfileUpdate;
