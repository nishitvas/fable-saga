import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Home,
  Stories,
  StoryReader,
  AboutUs,
  Games,
  FifteenPuzzleGame
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
        <Route exact path="/kids-stories/list/:language" component={Stories} />
        <Route exact path="/kids-stories/story/:slug" component={StoryReader} />
        <Route exact path="/about-us" component={AboutUs} />

        <Route exact path="/staging">
          <Redirect to="/staging/kids-stories" />
        </Route>
        <Route exact path="/staging/kids-stories"><Home useStaging={true} /></Route>
        <Route exact path="/staging/kids-stories/list/:language"><Stories useStaging={true} /></Route>
        <Route exact path="/staging/kids-stories/story/:slug"><StoryReader useStaging={true} /></Route>
        <Route exact path="/staging/about-us">
          <AboutUs useStaging={true} />
        </Route>

        {/* Games Routes */}
        <Route exact path="/games" component={Games} />
        <Route exact path="/game/fifteen-puzzle-game" component={FifteenPuzzleGame} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
