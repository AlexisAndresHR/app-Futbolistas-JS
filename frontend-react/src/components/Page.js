import React from "react";
import Nav from "./Nav";
import ActionsMenu from "./ActionsMenu";
import Table from "./Table";
import Modal from "./Modal";

function Page() {
    return (
        <>
            <Nav /> { /* Navbar with Bootstrap style for the menus */ }

            <div className="container"> { /* Main container (div) for the page content */ }
                <ActionsMenu />
                <Table />
            </div>

       </>
    );
}

export default Page;