import { Switch, Route } from "react-router-dom";// React Router imports
import './App.css';
import Nav from "./components/Nav";
import Page from "./components/Page";

function App() {
    // Calls components/Page.js passing parameters in order to the /route (with React Router) to create the visual components
    return (
        <>
        <Nav /> { /* Navbar with Bootstrap style for the menus */ }
        <Switch>
            <Route exact path="/" component={ (props) => (
                <Page {...props} pageTitle={"Players"} entity={"players"} />
            )} /> { /* 'exact' param should be indicated in the index page */ }
            <Route path="/coaches" component={ (props) => (
                <Page {...props} pageTitle={"Coaches"} entity={"coaches"} />
            )} />
            <Route path="/trainings" component={ (props) => (
                <Page {...props} pageTitle={"Trainings"} entity={"trainings"} />
            )} />
            <Route path="/teams" component={ (props) => (
                <Page {...props} pageTitle={"Teams"} entity={"teams"} />
            )} />
            {/* {...props} is a destructuring that overwrites the component props to be send each time
                 - Previous component is dismounted
                 - The new component is mounted (re-rendering 'Page' component) */}
        </Switch>
        </>
    );
}

export default App;
