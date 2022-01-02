import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../utils/firebase.js";

function UserSettings(props) {
  const navigate = useNavigate();

  const [breeds, setBreeds] = useState();
  const [cities, setCities] = useState();
  const [expertise, setExpertise] = useState();

  const [cityPop, setCityPop] = useState("בחר מהרשימה");
  const [breedPop, setBreedPop] = useState("בחר מהרשימה");
  const [expertisePop, setExpertisePop] = useState("בחר מהרשימה");
  const [user, setUser] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petExpertise, setPetExpertise] = useState("");
  const [petLocation, setPetLocation] = useState("");

  const [matches, setMatches] = useState();

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const breedsURL = "https://powerful-sierra-82767.herokuapp.com/utils/breeds";
  const citiesURL = "https://powerful-sierra-82767.herokuapp.com/utils/cities";
  const expertiseURL =
    "https://powerful-sierra-82767.herokuapp.com/utils/expertise";
  const usersURL = "https://powerful-sierra-82767.herokuapp.com/users/";
  const userID = localStorage.userID;
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
    axios.get(usersURL + userID).then((response) => {
      setUser(response.data);
    });
    axios.get(matchesURL).then((response) => {
      setMatches(response.data);
    });
    // eslint-disable-next-line
  }, []);
  if (!expertise) return null;
  if (!breeds) return null;
  if (!cities) return null;
  if (!user) return null;
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

  function LogOut() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userID");
    navigate("/login");
  }

  function updateProfile(e) {
    e.preventDefault();

    const userObj = {
      name: name,
      email: email,
      pet_name: petName,
      dogRace: petBreed,
      expert: petExpertise,
      city: petLocation,
      photo: imageAsUrl,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    if (imageAsUrl) {
      axios
        .patch(usersURL + userID, userObj, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          console.log(imageAsUrl);
          navigate("/cards");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/users/${imageAsFile.name}`)
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
          .ref("users")
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
      .delete(usersURL + userID)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userID");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  
  let UserMatch=[];
  
  function countMatchesUser() {
    const matchObj = Object.values(matches);
    for (let i = 0; i < matchObj.length; i++) {
      if (matchObj[i].user._id === userID) {
        UserMatch.push('match');
      }
    }
  }
 
  countMatchesUser();
  const UserMatchCount = UserMatch.length;

  return (
    <div className="profileCompletion">
      <div className="card-top">
        <h1>הגדרות</h1>
        <img
          src="../assets/back.svg"
          alt="Back"
          onClick={() => navigate("/cards")}
        />
      </div>
      <form>
        <label htmlFor="profileEmail">עריכת כתובת דוא״ל</label>
        <input
          id="profileEmail"
          type="text"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="profileName">איך נקרא לך?</label>
        <input
          id="profileName"
          type="text"
          value={name}
          onInput={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="profilePetName">איך קוראים לכלב שלך?</label>
        <input
          id="profilePetName"
          type="text"
          value={petName}
          onInput={(e) => setPetName(e.target.value)}
        ></input>

        <label htmlFor="profilePetBreed">איזה גזע יש ברשותך?</label>
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

        <label htmlFor="profileExpertise">למה אתה מחפש מאלף?</label>

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

        <input type="file" onChange={handleImageAsFile} />
        <h2>מספר ההתאמות שלי: {UserMatchCount}</h2>
        <input
          type="submit"
          value="עדכן פרופיל"
          onClick={updateProfile}
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

export default UserSettings;
