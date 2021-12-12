import { render, screen, cleanup } from '@testing-library/react'; 
import { BrowserRouter } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import TrainerProfileUpdate from '../screens/TrainerProfileUpdate';
import WaitForApproval from '../screens/WaitForApproval';


test('should render home', () => {
    const tree = render(<BrowserRouter><Home/></BrowserRouter>);
    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument;
})

test('should render login', () => {
    render(<Login/>);
    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
})

test('should render register', () => {
    const tree = render(<BrowserRouter><Register/></BrowserRouter>);
    const registerElement = screen.getByTestId('register');
    expect(tree).toBeInTheDocument;
})

/*test('should render  WaitForApproval', () => {
    const tree = render(<BrowserRouter>< WaitForApproval/></BrowserRouter>);
    const  WaitForApprovalElement = screen.getByTestId(' waitForApproval');
    expect(tree).toBeInTheDocument;
})*/

// test('should render TrainerProfileUpdate', () => {
//     const tree = render(<BrowserRouter><TrainerProfileUpdate/></BrowserRouter>);
//     const trainerProfileUpdateElement = screen.getByTestId('trainerProfile');
//     expect(tree).toBeInTheDocument;
// }) 



afterEach(cleanup);
