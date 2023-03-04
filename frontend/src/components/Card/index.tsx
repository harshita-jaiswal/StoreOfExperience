import PropTypes from 'prop-types';
import './index.scss';

interface CardProps {
    place: string,
    description: string,
    imgUrl: string
 }

export default function Card({place, imgUrl, description}: CardProps) {
    const divStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
      };
    return (
       <div className='Card'>
         <div className="Card__img" style={divStyle} />
         <div className='Card__content'>
            <div className='Card__content-place'>{place}</div>
            <div className='Card__content-desc'>
                {description}
            </div>
         </div>
       </div>
    )
}

Card.propTypes = {
    place: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string
  };