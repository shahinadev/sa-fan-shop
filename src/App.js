import React from "react";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Shop from "./components/Shop/Shop";
import Review from "./components/pages/Review/Review";
import Dashboard from "./components/Dashboard/Dashboard";
import Buy from "./components/pages/Buy/Buy";
import Pay from "./components/pages/Pay/Pay";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/buy/:id">
          <Buy />
        </PrivateRoute>
        <Route path="/pay">
          <Pay />
        </Route>
        <Route path="/undefined">
          <Home />
        </Route>
        <PrivateRoute path="/review">
          <Review />
        </PrivateRoute>
        <Route path="/shop">
          <Shop />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
