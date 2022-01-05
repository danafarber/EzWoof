import axios from "axios";

const baseURL = "https://powerful-sierra-82767.herokuapp.com/";

test("gets one trainer", () => {
  axios
    .get(baseURL + "trainers/61d2dc92208bb00261c0a914")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("create trainer", () => {
  axios
    .post(baseURL + "trainers", {
        "name": "דנה בוהדנה",
		"email": "danafarber39@gmail.com",
		"password": "102030"
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("update trainer", () => {
  axios
    .patch(baseURL + "trainers/61d2dc92208bb00261c0a914", {
      "name": "עדכון בדיקה"
    })
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
    })
    .catch((err) => console.log(err));
});

test("delete trainers", () => {
  axios
    .delete(baseURL + "trainers/61d2dc92208bb00261c0a914")
    .then((response) => {
      return response.data;
      expect(response).toContain([response]);
      Î;
    })
    .catch((err) => console.log(err));
});