import axios from "axios";

const baseURL = "https://powerful-sierra-82767.herokuapp.com/";

test("gets users", () => {
  axios
    .get(baseURL + "users")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("gets trainers", async () => {
  axios
    .get(baseURL + "trainers")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("gets admins", async () => {
  axios
    .get(baseURL + "admins")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("gets cities", async () => {
  axios
    .get(baseURL + "utils/cities")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("gets breeds", async () => {
  axios
    .get(baseURL + "utils/breeds")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});

test("gets expertise", async () => {
  axios
    .get(baseURL + "utils/expertise")
    .then((response) => {
      return response.data;
      expect(response).toContain([]);
    })
    .catch((err) => console.log(err));
});