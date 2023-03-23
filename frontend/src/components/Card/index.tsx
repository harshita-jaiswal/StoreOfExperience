import PropTypes from 'prop-types';
import './index.scss';

interface CardProps {
    place: string,
    experience: string,
    imgUrl: string
 }

export default function Card({place, imgUrl, experience}: CardProps) {
    const divStyle = {
        // backgroundImage: 'url(' + imgUrl + ')',
        background: getColor()
      };
    return (
       <div className='Card'>
        <div className="Card__mainContentWrapper" style={divStyle}>
          <div className="Card__mainContent">{place}</div>
        </div>
         <div className='Card__content'>
            <div className='Card__content-place'>{place}</div>
            <div className='Card__content-desc'>
                {experience}
            </div>
         </div>
       </div>
    )
}


const getColor = () => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
}

Card.propTypes = {
    place: PropTypes.string,
    experience: PropTypes.string,
    imgUrl: PropTypes.string
  };