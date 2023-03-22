import PropTypes from 'prop-types';
import './index.scss';
import {httpClient} from "../../services/HttpService";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';

const Experience = () => {
    let { experienceId } = useParams();
    const [experienceInfo, setExperienceInfo] = useState<any>();
    useEffect( () => {
		const fetchExperiences = async() => {
			const experienceDetail = await httpClient.get(`/experience/${experienceId}`).then(resp => resp.data);
            setExperienceInfo(experienceDetail);
		}
        fetchExperiences()
			.catch(console.error);
	},[]);
    return (
        <div className="Experience">
            {
                experienceInfo ? <>
                    <div className="Experience__title">{experienceInfo.title}</div>
                    <div className="Experience__date">{experienceInfo.date}</div>
                    <div className="Experience__desc">{experienceInfo.experience}</div>
                </> : <div>No Data to show!!!!!!!</div>
            }
        </div>
    )
}

 export default Experience;