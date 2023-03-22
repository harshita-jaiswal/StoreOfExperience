import { Link, Route, Routes } from 'react-router-dom';
import './index.scss';
import logo from '../../assets/logo-2.jpeg'
import {useAuth} from "../../services/AuthService";

const Header = () => {
    const {handleLogout, initLoginOrLogout} = useAuth();
    const logout = async () => {
        initLoginOrLogout("/logout")
        handleLogout()
    }
    return (
        <div className="Header">
            <img className="logo" src={logo} alt="LOGO" />
            <div className='Header__menu'>
                <Link className='Header__menu-item' to="/home">Home</Link>
                <Link className='Header__menu-item' to="/add-experience">Add Event</Link>
                <div onClick={logout} className='Header__menu-item'>Logout</div>
            </div>
        </div>
    )
}

export default Header