import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Admin from './components/Admin/Admin';
import About from './components/About/About';
import NotMatch from './components/NotMatch/NotMatch';
import Login from './components/Login/Login';
import AddProduct from './components/Admin/AddProduct/AddProduct';
import ManageProduct from './components/Admin/ManageProduct/ManageProduct';
import EditProduct from './components/Admin/EditProduct/EditProduct';
import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Cart from './components/Cart/Cart';
import ProcessOrder from './components/ProcessOrder/ProcessOrder';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider  value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <PrivateRoute path="/cart">
           <Cart></Cart>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/ProcessOrder/:productId">
            <ProcessOrder></ProcessOrder>
          </PrivateRoute>
          <Route path="/addProduct">
            <AddProduct></AddProduct>
          </Route>
          <Route path="/manageProduct">
            <ManageProduct></ManageProduct>
          </Route>
          <Route path="/editProduct">
            <EditProduct></EditProduct>
          </Route>
          <Route path="*">
            <NotMatch></NotMatch>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider >

  );
}

export default App;
