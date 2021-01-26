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
          <Redirect to="/kids-stories" />
        </Route>
        <Route exact path="/kids-stories" component={Home} />
        <Route path="/kids-stories/list" component={Stories} />
        <Route path="/kids-stories/story/:slug" component={StoryReader} />
        <Route path="/about-us" component={AboutUs} />

        <Route exact path="/staging">
          <Redirect to="/staging/kids-stories" />
        </Route>
        <Route path="/staging/kids-stories"><Home useStaging={true} /></Route>
        <Route path="/staging/kids-stories/list"><Stories useStaging={true} /></Route>
        <Route path="/staging/kids-stories/story/:slug"><StoryReader useStaging={true} /></Route>
        <Route path="/staging/about-us">
          <AboutUs useStaging={true} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
