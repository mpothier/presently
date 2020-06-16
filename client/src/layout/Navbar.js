import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './Navbar.scss'

class Navbar extends Component {

    selectedMode = () => {
        var pathRoot = /\/([^/]+)/g.exec(this.props.location.pathname)
        return pathRoot ? pathRoot[1] : null
    }
    
    render() {
        return (
            <div id="navbar">
                <div className="left-nav">
                    <Link to="/present">
                        <div className="logo">
                            <span>P</span>
                        </div>
                    </Link>
                    <div className="bar"></div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.selectedMode()}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <Link className={this.selectedMode() === "present" ? "dropdown-item active" : "dropdown-item"} to='/present' >
                                <span>present</span>
                            </Link>
                            <Link className={this.selectedMode() === "past" ? "dropdown-item active" : "dropdown-item"} to='/past' >
                                <span>past</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right-nav">
                    <div className="profile-button"></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar)
