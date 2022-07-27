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
          <Route path={'/login'} component={LoginSignup} />
          <Route path={'/account'} component={Profile} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
