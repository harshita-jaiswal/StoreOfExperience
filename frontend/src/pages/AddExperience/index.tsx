import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import PropTypes from 'prop-types';
import './index.scss';
import ImageUpload from "../../components/ImageUpload";
import {httpClient} from "../../services/HttpService";
import {useAuth} from "../../services/AuthService";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded
}

const AddExperience = () => {
    const {userInfo} = useAuth();
    const [image, setImage] = useState();
    const [expFormData, setExpFormData] = useState({
        Title: "",
        Date: "",
        Experience: "",
        image: null,
      });
    const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

    useEffect(()=> {
        console.log('img----', image);
        setExpFormData((prev) => {
            return { ...prev, image };
          });
    }, [image])
    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setExpFormData((prev) => {
          return { ...prev, [name]: value };
        });
      }
    
    const handleSubmit = () => {
        const formData = new FormData();
		// @ts-ignore
		formData.append('file', expFormData.image);
		// @ts-ignore
		formData.append('fileName', expFormData.image.name);
		formData.append('title', expFormData.Title);
		formData.append('date', expFormData.Date);
		formData.append('experience', expFormData.Experience);
		formData.append('userId', userInfo.id);

        // formData = {...formData, ...expFormData}
        console.log('submit data---', formData, expFormData)
        const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		httpClient.post("/add-experience", formData, config)
			.then((response) => {
				console.log("Got response from upload file:", response.status);
				if (response.status === 200) {
					// setSubmitted(SubmissionStatus.SubmitSucceeded);
				} else {
					// setSubmitted(SubmissionStatus.SubmitFailed);
				}

			});
    }
    return (
        <div className="AddExperience">
           <div className="AddExperience__left">
                <div className="AddExperience__left-container">
                    <ImageUpload image={image} setImage={setImage} />
                </div>
            </div>
            <div className="AddExperience__right">
                <input className="AddExperience__input"
                    type="text"
                    onChange={handleChange}
                    placeholder="Title"
                    name="Title"
                    value={expFormData.Title}
                    />
                <input className="AddExperience__input"
                    type="date"
                    onChange={handleChange}
                    placeholder="date"
                    name="Date"
                    value={expFormData.Date}
                />
                 <textarea className="AddExperience__input"
                    type="textarea"
                    onChange={handleChange}
                    placeholder="Experience"
                    name="Experience"
                    value={expFormData.Experience}
                    rows={12}
                    // maxLength = {150}
                />
                <button onClick={handleSubmit} className="AddExperience__submit">Submit</button>
            </div>
        </div>
    )
}


 export default AddExperience;