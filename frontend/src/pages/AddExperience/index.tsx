import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import PropTypes from 'prop-types';
import './index.scss';
import ImageUpload from "../../components/ImageUpload";


const AddExperience = () => {
    const [image, setImage] = useState('');
    const [formData, setFromData] = useState({
        Title: "",
        Date: "",
        Experience: "",
        image: null,
      });
    const handleChange = (e: SyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFromData((prev) => {
          return { ...prev, [name]: value };
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
                    value={formData.Title}
                    />
                <input className="AddExperience__input"
                    type="date"
                    onChange={handleChange}
                    placeholder="date"
                    name="Date"
                    value={formData.Date}
                />
                 <textarea className="AddExperience__input"
                    type="textarea"
                    onChange={handleChange}
                    placeholder="Experience"
                    name="Experience"
                    value={formData.Experience}
                    rows={12}
                    // maxLength = {150}
                />
            </div>
        </div>
    )
}


 export default AddExperience;