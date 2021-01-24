import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Stories,
  AboutUs
} from './component';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="stories" />
        </Route>
        <Route path="/stories" component={Stories} />
        <Route path="/about-us" component={AboutUs} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
