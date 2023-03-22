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
    const [toastVisibility, setToastVisibility] = useState<boolean>(false);

    const [expFormData, setExpFormData] = useState({
        title: "",
        date: "",
        experience: "",
        image: null,
      });
    const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

    useEffect(()=> {
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
        const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
        Promise.all([
            httpClient.post('/upload-image', formData, config),
            httpClient.post('/add-experience', {
                ...expFormData,
                image: expFormData.image.name,
                imageData: expFormData.image,
            })
        ]).then((response) => {
            console.log("Got response from upload file:", response);
            setToastVisibility(true)
            if (response.length === 2) {
                setSubmitted(SubmissionStatus.SubmitSucceeded);
            } else {
                setSubmitted(SubmissionStatus.SubmitFailed);
            }
            setTimeout(() => {
                setToastVisibility(false)
              }, 3000);
        });
    }
    return (
        <div className="AddExperience">
            <div id="toast" className={"AddExperience__toast"  + (toastVisibility ? ' show' : ' hide')}>
                {
                    submitted === SubmissionStatus.SubmitFailed ? "Adding Experience Failed!" : "Experience Added Successfully!" 
                }
            </div>
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
                    name="title"
                    value={expFormData.title}
                    />
                <input className="AddExperience__input"
                    type="date"
                    onChange={handleChange}
                    placeholder="date"
                    name="date"
                    value={expFormData.date}
                />
                 <textarea className="AddExperience__input"
                    type="textarea"
                    onChange={handleChange}
                    placeholder="Experience"
                    name="experience"
                    value={expFormData.experience}
                    rows={12}
                    // maxLength = {150}
                />
                <button onClick={handleSubmit} className="AddExperience__submit">Submit</button>
            </div>
        </div>
    )
}


 export default AddExperience;