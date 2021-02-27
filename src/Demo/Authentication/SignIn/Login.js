import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import { setUserSession } from '../../../Utils/Common';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

function Login(props){
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3000/login', { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.access_token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
        console.log(error)
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

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
                                
                                <h3 className="mb-4">Test Analytix</h3>
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" {...username} className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" {...password} className="form-control" placeholder="password"/>
                                </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <button className="btn btn-primary shadow-2 mb-4" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);
       
        const handleChange = e => {
          setValue(e.target.value);
        }
        return {
          value,
          onChange: handleChange
        }
      }

export default Login;