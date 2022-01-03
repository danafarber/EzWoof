import axios from "axios";
import React, { useState } from "react";
import { matchRoutes, useNavigate } from "react-router-dom";
import { storage } from "../../utils/firebase.js";

function TrainerSettings(props) {
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
  const [tip, setTip] = useState("");
  const [pricing, setPricing] = useState("");

  const [matches, setMatches] = useState();

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const breedsURL = "https://powerful-sierra-82767.herokuapp.com/utils/breeds";
  const citiesURL = "https://powerful-sierra-82767.herokuapp.com/utils/cities";
  const expertiseURL =
    "https://powerful-sierra-82767.herokuapp.com/utils/expertise";
  const trainersURL = "https://powerful-sierra-82767.herokuapp.com/trainers/";
  const trainerID = localStorage.trainerID;
  const matchesURL = "https://powerful-sierra-82767.herokuapp.com/matches/";

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
    axios.get(matchesURL).then((response) => {
      setMatches(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!expertise) return null;
  if (!breeds) return null;
  if (!cities) return null;
  if (!matches) return null;

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
      tip: tip,
      pricing: pricing,
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
          navigate("/chat");
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

  function DeleteAccount(e) {
    e.preventDefault();

    axios
      .delete(trainersURL + trainerID)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("trainerLoggedIn");
        localStorage.removeItem("trainerID");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function LogOut() {
    localStorage.removeItem("trainerLoggedIn");
    localStorage.removeItem("trainerID");
    navigate("/login");
  }
  
  let TrainerMatch=[];
  
  function countMatches() {
    const matchObj = Object.values(matches);
    for (let i = 0; i < matchObj.length; i++) {
      if (
        matchObj[i].trainer._id === trainerID
      ) {
        TrainerMatch.push('match');
      }
    }
  }

  countMatches()
  const trainerMatchCount = TrainerMatch.length;



  return (
    <div data-testid="trainerProfile" className="profileCompletion">
      <div className="card-top">
        <h1>הגדרות</h1>
        <img
          src="../assets/back.svg"
          alt="Back"
          onClick={() => navigate("/chat")}
        />
      </div>
      <form>
        <label htmlFor="profileName">איך נקרא לך?</label>
        <input
          id="profileName"
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="profilePetBreed">באילו גזעים אתה מתמחה?</label>
        <select
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
          id="experienceTime"
          type="range"
          min="1"
          max="20"
          onInput={(e) => setExp(e.target.value)}
        />
        <span className="sliderVal">{exp} שנות ניסיון</span>

        <label htmlFor="profileExpertise">התמחויות</label>

        <select
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
          id="profileLocation"
          onChange={populateCities}
          value={petLocation}
          onInput={(e) => setPetLocation(e.target.value)}
        >
          {cities.map((cityPop) => (
            <option value={cityPop._id}>{cityPop.name}</option>
          ))}
        </select>

        <label htmlFor="profileTip">
          מה הטיפ שתרצה שבעלי-הכלבים האחרים יראו?
        </label>
        <input
          id="profileTip"
          type="text"
          value={tip}
          onInput={(e) => setTip(e.target.value)}
        ></input>

        <label htmlFor="profilePricing">כמה עולה שעת אילוף שלך?</label>
        <input
          id="profilePricing"
          type="text"
          value={pricing}
          onInput={(e) => setPricing(e.target.value)}
        ></input>

        <input type="file" onChange={handleImageAsFile} />
        <h2>מספר ההתאמות שלי: {trainerMatchCount}</h2>
        <input
          type="submit"
          value="אשר פרופיל"
          onClick={updateProfile}
          name={name}
        ></input>

        <input id="logout" type="submit" value="התנתק" onClick={LogOut}></input>

        <input
          id="delete-account"
          type="submit"
          value="מחיקת חשבון"
          onClick={DeleteAccount}
        ></input>
         <a id="mailto" href ="mailto:ezwoof10@gmail.com">צור קשר</a>
      </form>
    </div>
  );
}

export default TrainerSettings;
