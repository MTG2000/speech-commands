// import Nav from "./components/SharedComponents/Nav";
import { Switch, Route } from "react-router-dom";
import Home from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import "./cmds/keyboard";
import VoiceBtn from "./components/SharedComponents/VoiceBtn";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <VoiceBtn />
      <Switch>
        <Route path="/blog/:id">
          <BlogPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
