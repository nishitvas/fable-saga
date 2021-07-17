import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import {
  Header,
  Home,
  Stories,
  StoryReader,
  FunFacts,
  AboutUs,
  Games,
  FifteenPuzzleGame
} from './component';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/"><Redirect to="/kids-stories/en"/></Route>
        <Route exact path="/kids-stories"><Redirect to="/kids-stories/en"/></Route>
        <Route exact path="/kids-stories/:language" component={Stories} />
        <Route exact path="/kids-stories/story/:slug" component={StoryReader} />
        <Route exact path="/fun-facts" component={FunFacts} />
        <Route exact path="/about-us" component={AboutUs} />

        <Route exact path="/staging"><Redirect to="/staging/kids-stories/en"/></Route>
        <Route exact path="/staging/kids-stories"><Redirect to="/staging/kids-stories/en"/></Route>
        <Route exact path="/staging/kids-stories"><Home useStaging={true} /></Route>
        <Route exact path="/staging/kids-stories/:language"><Stories useStaging={true} /></Route>
        <Route exact path="/staging/kids-stories/story/:slug"><StoryReader useStaging={true} /></Route>
        <Route exact path="/staging/fun-facts"><FunFacts useStaging={true} /></Route>
        <Route exact path="/staging/about-us"><AboutUs useStaging={true} /></Route>

        {/* Games Routes */}
        <Route exact path="/games" component={Games} />
        <Route exact path="/game/fifteen-puzzle-game" component={FifteenPuzzleGame} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
