import React, { Component } from "react";
import Nav from "./Nav";
import ActionsMenu from "./ActionsMenu";
import Table from "./Table/Table";
import Modal from "./Modal/Modal";
import { listData } from "../services/mainService";

// React class component:
class Page extends Component {
    // constructor method to manage the components state (instead of use hooks)
    constructor(props) {
        super(props);
        this.state = {
            showModalWindow: false,
            registers: [],
        };
    }

    // Function to change the state (show/hide) of the modal window
    changeModalState = () => {
        this.setState({ showModalWindow: !this.state.showModalWindow });
    };
    // props variables to be sent to the modal window
    modalTitle = "New Player";
    inputsFormData = [
        { placeholder: "First Name", name: "first-name" },
        { placeholder: "Last Name", name: "last-name" },
        { placeholder: "Team", name: "team" },
    ];
    formSelect = "Select a position";
    formSelectOptions = [
        { value: 0, tag: "Goalkeeper" },
        { value: 1, tag: "Defense" },
        { value: 2, tag: "Midfielder" },
        { value: 3, tag: "Forward" },
    ];

    // Async function to use the service file/code and obtain the API registers
    listEntity = async () => {
        const {entity} = this.props;// destructuring
        const registers = await listData(entity);
        this.setState( {registers} );
    };

    // React lifecycle method to execute the code when the component is already placed (mounted) in the DOM
    componentDidMount() {
        this.listEntity();
    }


    render() {
        // Receives the page title from the props of the class component (this)
        const { pageTitle = "App Futbolistas JS" } = this.props;// destructuring

        return (
            <>
                <Nav /> { /* Navbar with Bootstrap style for the menus */ }

                <div className="container"> { /* Main container (div) for the page content */ }
                    <ActionsMenu changeModalState={ this.changeModalState }
                                 pageTitle={pageTitle} />
                    <Table registers={this.state.registers} />

                    { this.state.showModalWindow
                        &&
                        <Modal modalTitle={this.modalTitle}
                               inputsFormData={this.inputsFormData}
                               formSelect={this.formSelect}
                               formSelectOptions={this.formSelectOptions}
                               changeModalState={ this.changeModalState }/* Change state capability passed to close the modal window */ />
                    }
                </div>
            </>
        );
    };
}

export default Page;