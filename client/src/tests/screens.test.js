import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReactDom from 'react-dom';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import TrainerProfileUpdate from "../screens/TrainerProfileUpdate";
import WaitForApproval from "../screens/WaitForApproval";
import AdminTopBar from "../components/Admin/AdminTopBar";
import UserSettings from "../components/Users/UserSettings";


/*test("should render home", () => {
  const tree = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument;
}); 

test("should render login", () => { //not pass
  render(<Login />);
  const tree = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const loginElement = screen.getByTestId("login");
  expect(tree).toBeInTheDocument();
});  

test("should render register", () => { //pass
  const tree = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const registerElement = screen.getByTestId("register");
  expect(tree).toBeInTheDocument;
}); 

it('renders without crashing', () => {
 const tree = render(<BrowserRouter>< WaitForApproval/></BrowserRouter>);
    const  WaitForApprovalElement = screen.getByTestId("waitForApproval");
    expect(tree).toBeInTheDocument;
    const div=document.createElement('div');
    ReactDom.render(<WaitForApproval/>,div);
    ReactDom.unmountComponentAtNode(div); 


 test("should render TrainerProfileUpdate", () => {
     const tree = render(<BrowserRouter><TrainerProfileUpdate/></BrowserRouter>);
     const trainerProfileUpdateElement = screen.getByTestId("trainerProfile");
     expect(tree).toBeInTheDocument;

 });

 /*test("should render AdminDashboard",()=> {
   const tree=render(<BrowserRouter>< AdminDashboard/></BrowserRouter>);
   const adminElement=screen.getAllByTestId("adminDashbaord");
   expect(tree).toBeInTheDocument;
 }); */
 

/* it('renders without crashing ',()=>{
  const myComponent = shallow(<Home/>);
  expect(myComponent.contains(<p>Home</p>)).toEqual(true);
 });*/
 test("should render settings", () => { //pass
  const tree = render(
    <BrowserRouter>
      <UserSettings />
    </BrowserRouter>
  );
  const Element = screen.getByTestId("settings");
  expect(tree).toBeInTheDocument;
}); 

 
afterEach(cleanup);
