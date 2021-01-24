import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Stories,
  StoryReader,
  AboutUs
} from './component';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/stories" />
        </Route>
        <Route exact path="/staging">
          <Redirect to="/staging/stories" />
        </Route>
        <Route path="/stories" component={Stories} />
        <Route path="/story/:slug" component={StoryReader} />
        <Route path="/staging/stories"><Stories useStaging={true} /></Route>
        <Route path="/staging/story/:slug"><StoryReader useStaging={true} /></Route>
        <Route path="/about-us" component={AboutUs} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
