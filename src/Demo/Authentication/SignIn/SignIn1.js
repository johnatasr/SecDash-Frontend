import React from 'react';
import {NavLink} from 'react-router-dom';

import api from '../../../services/api'
// import axios from 'axios'

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";


class SignUp1 extends React.Component {

    constructor () {
        super();
        this.state = {
            username: "",
            password: "",
            error: false,
            msgError: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleLogin(e) {
        e.preventDefault();

        if ( this.state.username === '' || this.state.username === undefined || 
            this.state.password === '' || this.state.password === undefined ) {
 
            this.setState({
                error: true, 
                msgError: 'Campos não devem estar vazios' 
            })
            
            return 0
        }

        let payload = {
            username: this.state.username,
            password: this.state.password
        }


        try {
            const response = await api.post("users/token/obtain/", payload);

            if (response.status === 401) {
                this.setState({ 
                    error: true, 
                    msgError: 'Login não efetuado, verifique seu usuário ou senha' 
                });
            
            } else {
                api.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('username', response.data.username);
                
                this.setState({ 
                    error: false, 
                    msgError: '' 
                });
                
                this.props.history.push({
                    pathname: '/dashboard',
                    state: { username: response.data.username }
                });
            }
                      
        } catch (err) {
            this.setState({ 
                error: true, 
                msgError: 'Login não efetuado, verifique seu usuário ou senha' 
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
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" value={this.state.username} 
                                            onChange={this.handleChange.bind(this, 'username')} placeholder="Usuário"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" value={this.state.password} 
                                            onChange={this.handleChange.bind(this, 'password')} placeholder="senha"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Salvar credenciais</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleLogin}>Login</button>

                                { this.state.error ? 
                                    <div style={{marginBottom: 10, color: 'red'}}>
                                        <span>{this.state.msgError}</span>
                                    </div>
                                    : <div></div>

                                }  

                                <p className="mb-2 text-muted">Esqueceu sua senha ? <NavLink to="/auth/reset-password-1">Resetar</NavLink></p>
                                <p className="mb-0 text-muted">Não possui conta ? <NavLink to="/auth/signup">Cadastrar</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;