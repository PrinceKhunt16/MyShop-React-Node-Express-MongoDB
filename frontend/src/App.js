import React, { useEffect, useState } from 'react'
import "./App.css"
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
import Deshboard from './Components/Deshboard/Deshboard';
import ProductList from './Components/Deshboard/ProductList';
import NewProduct from './Components/Deshboard/NewProduct';
import UpdateProduct from './Components/Deshboard/UpdateProduct';
import OrderList from './Components/Deshboard/OrderList';
import ProcessOrder from './Components/Deshboard/ProcessOrder';
import UsersList from './Components/Deshboard/UsersList';
import UpdateUser from './Components/Deshboard/UpdateUser';

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
    <div className='app'>
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
          <ProtectedRoute isAdmin={true} exact path={"/admin/deshboard"} component={Deshboard} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/products"} component={ProductList} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/product"} component={NewProduct} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/product/:id"} component={UpdateProduct} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/orders"} component={OrderList} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/order/:id"} component={ProcessOrder} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/users"} component={UsersList} />
          <ProtectedRoute isAdmin={true} exact path={"/admin/user/:id"} component={UpdateUser} />
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
