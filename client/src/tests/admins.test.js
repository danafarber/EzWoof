import axios from "axios";

const baseURL = "https://powerful-sierra-82767.herokuapp.com/";

test("gets one admin", () => {
  axios
    .get(baseURL + "admins/61a26a0cbaba0b25c3bd9e41")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("create admin", () => {
  axios
    .post(baseURL + "admins", {
      first_name: "דנה",
      last_name: "פרבר",
      email: "danafarber39@gmail.com",
      password: "102030",
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("update admin", () => {
  axios
    .patch(baseURL + "admins/61a26a0cbaba0b25c3bd9e41", {
      first_name: "דנה",
      last_name: "בוהדנה",
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("delete admin", () => {
  axios
    .delete(baseURL + "admins/61a26a0cbaba0b25c3bd9e41")
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
      Î;
    })
    .catch((err) => console.log(err));
});
