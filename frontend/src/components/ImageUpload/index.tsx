import PropTypes from 'prop-types';
import { useState, useEffect, useRef, FormEvent, MouseEventHandler } from "react";
import "./index.scss";
import { MdModeEdit } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

interface ImgProps {
  image: Blob,
  setImage: Function,
}


const ImageUpload = ({ image, setImage }: ImgProps) => {
  const imageFileRef = useRef<any>();
  const [imagePreview, setimagePreview] = useState<any>();

  useEffect(() => {
    if (!image) {
      setimagePreview(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setimagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

    // function for selecting updated image file
  const onFileChange = event => {
    if (event.target.files && event.target.files.length === 1) {
      setImage( event.target.files[0]);
    }
  }
  // function for image file selection 
  const selectedImageHandler = (event: any) => {
    imageFileRef?.current.click();
    if (event.target.files && event.target.files.length === 1) {
      setImage(event.target.files[0]);
    }
  }

  return (
    <div className="ImageWrapper">
      <input
        ref={imageFileRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg" // Only can upload '.jpg, .png, .jpeg' 
        onChange={onFileChange}
      />
      
      <div className="ImageWrapper__upload">
          {imagePreview && (
            <div className="ImageWrapper__upload-preview">
              <img src={imagePreview} alt="preview" className='img' />
              <div className="editIcon">
                <MdModeEdit
                  className="iconEdit"
                  onClick={selectedImageHandler}
                ></MdModeEdit>
              </div>
            </div>
          )}
        {!imagePreview && (
            <div className="ImageWrapper__addIcon">
              <IoMdPhotos
                className="galleryIcon"
                onClick={selectedImageHandler}
              ></IoMdPhotos>
              <h4> Add Photo </h4>
            </div>
          )}
        <div>
        </div>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  image: PropTypes.any,
  setImage: PropTypes.func
};

export default ImageUpload;
