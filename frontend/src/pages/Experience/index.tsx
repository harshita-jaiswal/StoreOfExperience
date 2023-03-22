import PropTypes from 'prop-types';
import './index.scss';
import {httpClient} from "../../services/HttpService";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
// import { Blob } from "buffer";

const Experience = () => {
    let { experienceId } = useParams();
    const [experienceInfo, setExperienceInfo] = useState<any>();
    const [imagePreview, setimagePreview] = useState<any>();
    const [erorr, setError] = useState('');
    useEffect( () => {
		const fetchExperiences = async() => {
			const experienceDetail = await httpClient.get(`/experience/${experienceId}`).then(resp => resp.data);
            setExperienceInfo(experienceDetail);
		}
        fetchExperiences()
			.catch((error) => {
                setError('Request Fail! Please Try again later')
                console.error
            });
	},[]);
    useEffect(() => {
        if (!experienceInfo?.imageData) {
          setimagePreview(null);
          return;
        }
        const fileReader = new FileReader();
            fileReader.onload = () => {
              setimagePreview(fileReader.result);
            };
            const blob = new Blob([experienceInfo?.imageData.data], {
                type: 'image/png'
            });
            fileReader.readAsDataURL(blob);
      }, [experienceInfo]);
    return (
        <div className="Experience">
            {
                experienceInfo ? <>
                    {/* {imagePreview ? <img src={imagePreview} alt="preview" className='Experience__img' /> :""} */}
                    <div className="Experience__title">{experienceInfo.title}</div>
                    <div className="Experience__date">{experienceInfo.date}</div>
                    <div className="Experience__desc">{experienceInfo.experience}</div>
                </> : <div>{erorr}</div>
            }
        </div>
    )
}

 export default Experience;