import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../ducks/reducer'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    const reduxState = useSelector(state => state);
    const dispatch = useDispatch();

    const logout = async () => {
        const res = await axios.delete('/auth/logout')
        let user = {user: null, loggedIn: false}
        dispatch(updateUser(user))
        Swal.fire({
            text: res.data.message.text,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        })
        console.log(props)
        // props.props.history.push('/')
    }

    return(
        <div className="nav">
            <i class="fas fa-sign-out-alt" onClick={logout}></i>
            <Link to={'/home'}>
                <i class="fas fa-home"></i>
            </Link>
        </div>
    )
}