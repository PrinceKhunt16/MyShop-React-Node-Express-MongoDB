import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Components/Layouts/Footer';
import Header from './Components/Layouts/Header';
import ScrollToTop from './ScrollToTop';
import Homepage from './Components/Homepage';
import ProductDetails from './Components/Product/ProductDetails';
import Products from "./Components/Product/Products";
import LoginSignup from './Components/User/LoginSignup';
import Profile from './Components/User/Profile';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/Cart';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <ScrollToTop />
        <Switch>
          <Route exact path={'/'} component={Homepage} />
          <Route exact path={'/product/:id'} component={ProductDetails} />
          <Route exact path={'/products'} component={Products} />
          <Route path={'/products/:keyword'} component={Products} />
          <Route exact path={'/login'} component={LoginSignup} />
          <ProtectedRoute exact path={'/account'} component={Profile} />
          <ProtectedRoute exact path={'/me/update'} component={UpdateProfile} />
          <ProtectedRoute exact path={'/password/update'} component={UpdatePassword} />
          <Route exact path={'/password/forgot'} component={ForgotPassword} />
          <Route exact path={'/password/reset/:token'} component={ResetPassword} />
          <Route exact path={'/cart'} component={Cart} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
