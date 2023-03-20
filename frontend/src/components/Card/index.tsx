import PropTypes from 'prop-types';
import './index.scss';

interface CardProps {
    place: string,
    experience: string,
    imgUrl: string
 }

export default function Card({place, imgUrl, experience}: CardProps) {
    const divStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
      };
    return (
       <div className='Card'>
         <div className="Card__img" style={divStyle} />
         <div className='Card__content'>
            <div className='Card__content-place'>{place}</div>
            <div className='Card__content-desc'>
                {experience}
            </div>
         </div>
       </div>
    )
}

Card.propTypes = {
    place: PropTypes.string,
    experience: PropTypes.string,
    imgUrl: PropTypes.string
  };