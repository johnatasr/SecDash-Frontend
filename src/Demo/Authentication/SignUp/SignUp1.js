import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import axios from 'axios'
import api from '../../../services/api'

class SignUp1 extends React.Component {
    constructor () {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            error: false,
            msgError: ""
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleRegister(e) {
        e.preventDefault();

        if ( this.state.username === '' || this.state.username === undefined || 
            this.state.password === '' || this.state.password === undefined ||
            this.state.email === '' || this.state.email === undefined) {
 
            this.setState({
                error: true, 
                msgError: 'Campos não devem estar vazios' 
            })      
            return 
        }

        let payload = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        try {
            const response = await api.post("users/user/create/", payload);

            if (response.status === 401) {
                this.setState({ 
                    error: true, 
                    msgError: 'Cadastro não efetuado, verifique os campos' 
                });
            
            } else {   
                this.setState({ 
                    error: false, 
                    msgError: '' 
                });
                
                this.props.history.push({
                    pathname: '/',
                });
            }
                      
        } catch (err) {
            this.setState({ 
                error: true, 
                msgError: 'Cadastro não efetuado, verifique os campos' 
            });
        }
    };

    handleChange(input, e){
        this.setState({[input]: e.target.value})
    } 


    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text"  onChange={this.handleChange.bind(this, 'username')}
                                        className="form-control" placeholder="Usuário" value={this.state.username} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" onChange={this.handleChange.bind(this, 'email')} value={this.state.email} 
                                        className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4"> 
                                    <input type="password" onChange={this.handleChange.bind(this, 'password')}
                                    className="form-control" value={this.state.password}  placeholder="senha"/>
                                </div>
                    
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleRegister}>Sign up</button>

                                { this.state.error ? 
                                    <div style={{marginBottom: 10, color: 'red'}}>
                                        <span>{this.state.msgError}</span>
                                    </div>
                                    : <div></div>

                                }  

                                <p className="mb-0 text-muted">Já possui uma conta ? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;