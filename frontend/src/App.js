import React, { useEffect, useState } from 'react'
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
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './Components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from './Components/Order/MyOrders';
import OrderDetails from './Components/Order/OrderDetails';

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {

    getStripeApiKey();

  }, []);

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
          <ProtectedRoute exact path={'/shipping'} component={Shipping} />
          <ProtectedRoute exact path={'/order/confirm'} component={ConfirmOrder} />
          <ProtectedRoute exact path={'/orders'} component={MyOrders} />
          <ProtectedRoute exact path={"/order/:id"} component={OrderDetails} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path={'/process/payment'} component={Payment} />
            </Elements>
          }
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
