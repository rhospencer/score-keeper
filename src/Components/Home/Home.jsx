import React, {useEffect} from 'react';
import Nav from '../Nav/Nav';
import {updateUser} from '../../ducks/reducer';
import {useSelector, useDispatch} from 'react-redux';
import Swal from 'sweetalert2';

export default function Home(props) {
    const reduxState = useSelector(state => state);
    useEffect(() => {
        if (!reduxState.loggedIn) {
            props.history.push('/')
        }
    })
    return(
        <div className="home-holder">
            <Nav />
            <div className="home">
                Home
            </div>
        </div>
    )
}