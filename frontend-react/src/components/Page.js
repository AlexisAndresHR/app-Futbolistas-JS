import React, { Component } from "react";
import Nav from "./Nav";
import ActionsMenu from "./ActionsMenu";
import Table from "./Table/Table";
import Modal from "./Modal/Modal";

// React class component:
class Page extends Component {
    // constructor method to manage the components state (instead of use hooks)
    constructor(props) {
        super(props);
        this.state = {
            showModalWindow: false,
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

    render() {
        return (
            <>
                <Nav /> { /* Navbar with Bootstrap style for the menus */ }

                <div className="container"> { /* Main container (div) for the page content */ }
                    <ActionsMenu changeModalState={ this.changeModalState } />
                    <Table />

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