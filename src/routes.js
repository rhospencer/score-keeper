import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import HostGame from './Components/HostGame/HostGame';
import JoinGame from './Components/JoinGame/JoinGame';

export default (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/home" component={Home} />
        <Route path="/host" component={HostGame} />
        <Route path="/join" component={JoinGame} />
    </Switch>
)