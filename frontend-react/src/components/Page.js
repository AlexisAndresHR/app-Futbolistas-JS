import React, { Component } from "react";
import Nav from "./Nav";
import ActionsMenu from "./ActionsMenu";
import Table from "./Table/Table";
import Modal from "./Modal/Modal";
import { listData, createDataRegister } from "../services/mainService";

// React class component:
class Page extends Component {
    // constructor method to manage the components state (instead of use hooks)
    constructor(props) {
        super(props);
        this.state = {
            showModalWindow: false,
            registers: [],
            entityObject: {},
        };
    }

    // Function to change the state (show/hide) of the modal window
    changeModalState = () => {
        this.setState({ showModalWindow: !this.state.showModalWindow });
    };
    // props variables to be sent to the modal window
    modalTitle = "New Player";
    inputsFormData = [
        { placeholder: "First Name", name: "firstName" },
        { placeholder: "Last Name", name: "lastName" },
        { placeholder: "Team", name: "team" },
    ];
    formSelect = "Select a position";
    formSelectId = "position";
    formSelectOptions = [
        { value: "Goalkeeper", tag: "Goalkeeper" },
        { value: "Defense", tag: "Defense" },
        { value: "Midfielder", tag: "Midfielder" },
        { value: "Forward", tag: "Forward" },
    ];

    // Async function to use the service file/code and obtain the API registers
    listEntities = async () => {
        const {entity} = this.props;// destructuring
        const registers = await listData(entity);
        this.setState( {registers} );
    };

    // Function to handle the change events of the inputs and selects of the modal form & after, have the data to be saved
    handleFormInput = (event) => {
        const { target: {value, name} } = event;
        let { entityObject } = this.state;// Create a copy of the state property
        entityObject = { ...entityObject, [name]: value };// Puts a new object item with key-value
        this.setState( {entityObject} );// Updates the state property
    }

    // To call the createDataRegister function and save the new register in the data API
    createRegister = async () => {
        const { entity } = this.props;// destructuring
        const { entityObject } = this.state;// Obtains the data object from the state (class component)
        await createDataRegister({ entity: entity, dataObject: entityObject, method:"POST" } );

        this.changeModalState();// Closes the modal window
        this.listEntities();
    };

    // React lifecycle method to execute the code when the component is already placed (mounted) in the DOM
    componentDidMount() {
        this.listEntities();
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
                               formSelect={this.formSelect} formSelectId={this.formSelectId} formSelectOptions={this.formSelectOptions}
                               changeModalState={ this.changeModalState }/* Change state capability passed to close the modal window */
                               handleFormInput={this.handleFormInput}
                               createRegister={this.createRegister} />
                    }
                </div>
            </>
        );
    };
}

export default Page;