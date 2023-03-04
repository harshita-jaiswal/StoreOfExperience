import { Link, Route, Routes } from 'react-router-dom';
import './index.scss';
import plusIcon from '../../assets/plusIcon.png'


const CardPlaceholder = () => {
    return (
        <Link className='cardPlaceholder' to="/add-experience">
                <img src={plusIcon} className="cardPlaceholder__plusIcon" />
        </Link>
    )
}

export default CardPlaceholder