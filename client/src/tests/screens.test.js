import { render, screen, cleanup } from '@testing-library/react'; 
import { BrowserRouter } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register'
import Home from '../screens/Home'

/*test("should render home", () => {
  const tree = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument;
});

test("should render login", () => {
  const tree =render( 
  <BrowserRouter>
    <Login/>
  </BrowserRouter>
  );
  const loginElement = screen.getByTestId("login");
  expect(loginElement).toBeInTheDocument();
});

test("should render register", () => {
  const tree = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const registerElement = screen.getByTestId("register");
  expect(registerElement).toBeInTheDocument;
});*/