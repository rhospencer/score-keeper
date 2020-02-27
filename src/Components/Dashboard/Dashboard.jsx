import React, {useState} from 'react';
import axios from 'axios';
import {updateUser} from '../../ducks/reducer'
import {useSelector, useDispatch} from 'react-redux';
import Swal from 'sweetalert2';

export default function Dashboard(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [f_name, setF_name] = useState('');
    const [l_name, setL_name] = useState('');
    const [register, setRegister] = useState(false);
    // const reduxState = useSelector(state => state);
    const dispatch = useDispatch();

    const login = async () => {
        const res = await axios.post('/auth/login', {username, password})
        if (res.data.user) {
            let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username}, loggedIn: res.data.loggedIn }
            dispatch(updateUser(user))
            setTimeout(() => {
                props.history.push('/home')
            }, 1500)
        }
        Swal.fire({
            text: res.data.message.text,
            icon: res.data.message.icon,
            timer: 1500,
            showConfirmButton: false
        })
        cancelInputs();
    }

    const submitRegistration = async () => {
        if (password === password2) {
            const res = await axios.post('/auth/register', {username, password, f_name, l_name})
            if (!res.data.user) {
                cancelInputs();
                return Swal.fire({
                    text: res.data.message.text,
                    type: res.data.message.type,
                    timer: 1500,
                    showConfirmButton: false
                })
            }
            let user = {user: {user_id: res.data.user.user_id, username: res.data.user.username}, loggedIn: res.data.loggedIn }
            dispatch(updateUser(user))
            Swal.fire({
                text: res.data.message.text,
                icon: res.data.message.icon,
                timer: 1500,
                showConfirmButton: false
            })
            setTimeout(() => {
                props.history.push('/home')
            }, 1500)
            cancelInputs();
        } else {
            setPassword('');
            setPassword2('');
            return Swal.fire({
                text: `Passwords don't match!`,
                type: 'error',
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    const cancelInputs = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
        setF_name('');
        setL_name('');
    }

    const handleRegisterChange = () => {
        setRegister(!register);
        cancelInputs();
    }   
        return(
            <div className="dashboard">
                <div className="login-holder">
                    <div className="login-title">
                        <h1>App Title</h1>
                    </div>
                    {!register ? 
                    <div className="auth-holder">
                        <div className="login-input-holder">
                            <input onChange={e => setUsername(e.target.value)} placeholder='Username' value={username} type="text"/>
                            <input onChange={e => setPassword(e.target.value)} placeholder='Password' value={password} type="password"/>
                        </div>
                        <div className="login-button-holder">
                            <button onClick={handleRegisterChange}>Register</button>
                                <button onClick={login}>Sign In</button>
                        </div>
                    </div>
                    :
                    <div className="auth-holder">
                        <div className="register-input-holder">
                            <input onChange={e => setUsername(e.target.value)} placeholder='Username' value={username} type="text"/>
                            <input onChange={e => setPassword(e.target.value)} placeholder='Password' value={password} type="password"/>
                            <input onChange={e => setPassword2(e.target.value)} placeholder='Re-Enter Password' value={password2} type="password"/>
                            <input onChange={e => setF_name(e.target.value)} placeholder='First Name' value={f_name} type="text"/>
                            <input onChange={e => setL_name(e.target.value)} placeholder='Last Name' value={l_name} type="text"/>
                        </div>
                        <div className="login-button-holder">
                            <button onClick={handleRegisterChange}>Cancel</button>
                            <button onClick={submitRegistration}>Submit</button>
                        </div>
                    </div>
                }
                </div>
            </div>
        )

}