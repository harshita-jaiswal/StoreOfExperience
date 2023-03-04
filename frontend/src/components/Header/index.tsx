import { Link, Route, Routes } from 'react-router-dom';
import './index.scss';
import logo from '../../assets/logo.jpeg'

const Header = () => {
    return (
        <div className="Header">
            <img className="logo" src={logo} alt="LOGO" />
            <div className='Header__menu'>
                <Link className='Header__menu-item' to="/">Home</Link>
                <Link className='Header__menu-item' to="/add-experience">Add Event</Link>
                <div className='Header__menu-item'>Logout</div>
            </div>
        </div>
    )
}

export default Header