import './App.css';
import Page from "./components/Page";

function App() {
    return (
        <>
            { /* Calls components/Page.js to create the visual components */ }
            <Page pageTitle={"Players"}
                  entity={"players"} />
        </>
    );
}

export default App;
