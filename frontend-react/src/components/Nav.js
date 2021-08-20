import React from "react";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="app_index.html"> Futbolistas </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="app_index.html"> Players </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="coaches_page.html"> Coaches </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="trainings_page.html"> Trainings </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="teams_page.html"> Teams </a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Nav;