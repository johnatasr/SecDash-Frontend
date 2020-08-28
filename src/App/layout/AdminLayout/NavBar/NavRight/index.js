import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';

import Modal from '../../../../components/Modal'

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';


class NavRight extends Component {
    constructor(){
        super();
        this.state = {
            username: localStorage.getItem('username'),
            showLogout: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleLogout(){
        localStorage.clear(); 
        this.props.history.push('/');
    }
   
    handleCloseModal() {
        this.setState({ showLogout: false})
    }

    logout() {
        this.setState({ showLogout: true})
    }

    render() {

        return (
            <Aux>
                { 
                    this.state.showLogout ?
                        <Modal 
                            title="Deseja sair ? "
                            body="Não quer ficar mais um pouco ?"
                            handleShow={this.state.showLogout}
                            handleClose={this.handleCloseModal}
                            handleFunction={this.handleLogout}
                            arg={false} />
                        : <div></div>

                }

                <ul className="navbar-nav ml-auto">         
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar2} className="img-radius" alt="User Profile"/>
                                    <span>{this.state.username}</span>
                                    <a onClick={this.logout} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><a href="/admin/" className="dropdown-item"><i className="feather icon-settings"/>Admin</a></li>
                                    <li><a href="https://br.linkedin.com/public-profile/in/jonatas-rabelo-47a44b7b?challengeId=AQH00-1XpA_oigAAAXQyceWPNcRLw-qGev2lzmM1YCcuvstzHgRiVJWcjPOya_lUmw30C5K4yewcmCmcR6EjVDzmSSM6CpZXVQ&submissionId=754c0665-ba46-2f16-af91-e60310a7ea07" 
                                    target="_blank" rel="noopener noreferrer" className="dropdown-item"><i className="feather icon-user"/>Sobre</a></li>
                                    
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
    }
}

export default NavRight;
