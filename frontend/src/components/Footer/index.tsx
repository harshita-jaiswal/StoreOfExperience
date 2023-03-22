import './index.scss';
import github from '../../assets/github-black.png'
import copyright from '../../assets/copyright-transparent.png'

const Footer = () => {
    return (
        <div className="Footer">
            <div className='Footer__text'>StoreOfExperience</div>
           <div className='Footer__iconList'>
            <img src={copyright} className='Footer__icon' />
            <a href='https://github.com/harshita-jaiswal/StoreOfExperience' >
                <img src={github} className='Footer__icon' />
            </a>
           </div>
        </div>
    )
}

export default Footer;