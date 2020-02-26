import React, {useState} from 'react';

export default function Dashboard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="dashboard">
            <div className="login-holder">
                <div className="login-title">
                    <h1>App Title</h1>
                </div>
                <div className="login-input-holder">
                    <input onChange={e => setUsername(e.target.value)} placeholder='Username' value={username} type="text"/>
                    <input onChange={e => setPassword(e.target.value)} placeholder='Password' value={password} type="text"/>
                </div>
                <div className="login-button-holder">
                    <button>Register</button>
                    <button>Sign In</button>
                </div>
            </div>
        </div>
    )
}