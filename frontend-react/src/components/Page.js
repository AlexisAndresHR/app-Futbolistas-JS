import React, { Component } from "react";
import ActionsMenu from "./ActionsMenu";
import Table from "./Table/Table";
import Modal from "./Modal/Modal";
//import Input from "./Modal/Input"
//import Select from "./Modal/Select"
import { listData, createDataRegister, deleteRegister } from "../services/mainService";

/*const fieldsType = {
    firstName: Input,
    lastName: Input,
    position: Select,
    team: Input,
    country: Input,
    place: Input,
    date: Input,
    hour: Select,
    name: Input,
    stadium: Input,
    league: Input,
};*/
// static options to be filled in the Selects
const staticSelectsOptions = {
    position: [
        { it: "Goalkeeper", tag: "Goalkeeper" },
        { it: "Defense", tag: "Defense" },
        { it: "Midfielder", tag: "Midfielder" },
        { it: "Forward", tag: "Forward" },
    ],
    hour: [
        { it: "09:00 am", tag: "09:00 am" },
        { it: "10:00 am", tag: "10:00 am" },
        { it: "11:00 am", tag: "11:00 am" },
        { it: "12:00 am", tag: "12:00 am" },
        { it: "13:00 am", tag: "13:00 am" },
        { it: "16:00 am", tag: "16:00 am" },
        { it: "17:00 am", tag: "17:00 am" },
        { it: "18:00 am", tag: "18:00 am" },
    ],
};

// React class component:
class Page extends Component {
    // constructor method to manage the components state (instead of use hooks)
    constructor(props) {
        super(props);
        this.state = {
            showModalWindow: false,
            registers: [],
            columnNames: [],
            entityObject: {},
            objectId: null,
            requestMethod: "POST",
            options: staticSelectsOptions,
        };
    }

    // Function to change the state (show/hide) of the modal window
    changeModalState = (_event, method = "POST") => {
        this.setState({ showModalWindow: !this.state.showModalWindow, requestMethod: method });
    };

    // props variables to be sent to the modal window
    modalTitle = "New register";

    // Async function to use the service file/code and obtain the API registers
    listEntities = async () => {
        const {entity} = this.props;// destructuring
        let columnNames = [];
        const registers = await listData(entity);
        if (Array.isArray(registers) && registers.length > 0)
            columnNames = Object.keys(registers[0]) || [];// Obtains the column names to send it to the Table component
        this.setState( {registers, columnNames} );
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
        const { entityObject, requestMethod, objectId } = this.state;// Obtains the data object from the state (class component)
        await createDataRegister({ entity: entity, dataObject: entityObject, method: requestMethod, objectId } );

        this.changeModalState();// Closes the modal window
        this.listEntities();
    };

    // Function that is passed to the Edit button (TableRow) and lets configure parameters to edit an item on the data API
    editRegister = (_event, index) => {
        const object = { ...this.state.registers[index] };// Set data of the item to be edited
        this.setState({ entityObject: object, objectId: index }, ()=>{ // Updates the state component properties
            this.changeModalState(null, "PUT");// Opens the modal window and updates the request method
        });
    };

    // Function to delete a register from the data API (server)
    deleteEntity = async (_event, index) => {
        const { entity } = this.props;
        const response = await deleteRegister({ entity, objectId: index });// Call the function and pass the parameters
        console.log({ response });
        this.listEntities();// Updates the list of registers
    };

    // React lifecycle method to execute the code when the component is already placed (mounted) in the DOM
    componentDidMount() {
        this.listEntities();
    }


    render() {
        // Receives the page title from the props of the class component (this)
        const { pageTitle = "App Futbolistas JS" } = this.props;// destructuring
        //const { columnNames } = this.state;

        return (
            <>
                <div className="container"> { /* Main container (div) for the page content */ }
                    <ActionsMenu changeModalState={ this.changeModalState }
                                 pageTitle={pageTitle} />
                    <Table registers={this.state.registers}
                           columnNames={this.state.columnNames}
                           editRegister={this.editRegister}
                           deleteEntity={this.deleteEntity} />

                    { this.state.showModalWindow
                        &&
                        <Modal modalTitle={this.modalTitle}
                               inputsFormData={this.state.columnNames}
                               formSelectOptions={this.state.options}
                               changeModalState={ this.changeModalState }/* Change state capability passed to close the modal window */
                               handleFormInput={this.handleFormInput}
                               createRegister={this.createRegister}
                               entityObject={this.state.entityObject} />
                    }
                </div>
            </>
        );
    };
}

export default Page;