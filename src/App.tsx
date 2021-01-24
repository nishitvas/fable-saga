import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Home,
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
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/stories" component={Stories} />
        <Route path="/story/:slug" component={StoryReader} />
        <Route path="/about-us" component={AboutUs} />

        <Route exact path="/staging">
          <Redirect to="/staging/home" />
        </Route>
        <Route path="/staging/home"><Home useStaging={true} /></Route>
        <Route path="/staging/stories"><Stories useStaging={true} /></Route>
        <Route path="/staging/story/:slug"><StoryReader useStaging={true} /></Route>
        <Route path="/staging/about-us">
          <AboutUs useStaging={true} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
