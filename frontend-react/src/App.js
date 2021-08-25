import { BrowserRouter as Router, Switch, Route } from "react-router-dom";// React Router imports
import './App.css';
import Nav from "./components/Nav";
import Page from "./components/Page";

function App() {
    // Calls components/Page.js passing parameters in order to the /route (with React Router) to create the visual components
    return (
        <>
        <Nav /> { /* Navbar with Bootstrap style for the menus */ }
        <Switch>
            <Route exact path="/" component={ () =>
                <Page pageTitle={"Players"} entity={"players"} /> } /> { /* 'exact' param should be indicated in the index page */ }
            <Route path="/coaches" component={ () =>
                <Page pageTitle={"Coaches"} entity={"coaches"} /> } />
            <Route path="/trainings" component={ () =>
                <Page pageTitle={"Trainings"} entity={"trainings"} /> } />
            <Route path="/teams" component={ () =>
                <Page pageTitle={"Teams"} entity={"teams"} /> } />
        </Switch>
        </>
    );
}

export default App;
