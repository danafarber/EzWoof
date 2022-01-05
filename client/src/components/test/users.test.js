import axios from "axios";

const baseURL = "https://powerful-sierra-82767.herokuapp.com/";

test("gets one user", () => {
  axios
    .get(baseURL + "users/61a2501ba0af7c3864bb1a67")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("create user", () => {
  axios
    .post(baseURL + "users", {
        "name": "דנה בוהדנה",
		"pet_name": "פיקסל",
		"email": "danafarber39@gmail.com",
		"password": "102030"
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("update user", () => {
  axios
    .patch(baseURL + "users/61a2501ba0af7c3864bb1a67", {
      "name": "עדכון בדיקה"
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("delete user", () => {
  axios
    .delete(baseURL + "users/61a2501ba0af7c3864bb1a67")
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
      Î;
    })
    .catch((err) => console.log(err));
});
