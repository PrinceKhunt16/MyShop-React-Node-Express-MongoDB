import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Components/Layouts/Footer';
import Header from './Components/Layouts/Header';
import ScrollToTop from './ScrollToTop';
import Homepage from './Components/Homepage';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <ScrollToTop />
        <Switch>
          <Route exact path={'/'} component={Homepage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
