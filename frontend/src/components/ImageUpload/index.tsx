import PropTypes from 'prop-types';
import { useState, useEffect, useRef, FormEvent, MouseEventHandler } from "react";
import "./index.scss";
import { MdModeEdit } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

interface ImgProps {
  image: string,
  setImage: Function,
}


const ImageUpload = ({ image, setImage }: ImgProps) => {
  const imageFileRef = useRef<any>();
  const [imagePreview, setimagePreview] = useState<string | ArrayBuffer | null>();

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
  const selectedImageHandler = (event: FormEvent) => {
    let selectedImage;
    if (event.target.files && event.target.files.length === 1) {
      selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  }
  // function for image file selection 
  const imageSelectHandler = (event: any) => {
    imageFileRef?.current.click();
    let selectedImage;
    if (event.target.files && event.target.files.length === 1) {
      selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  }

  return (
    // Image container
    <div className="ImageWrapper">
      <input
        ref={imageFileRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg" // Only can upload '.jpg, .png, .jpeg' 
        onChange={selectedImageHandler}
      />
      
      <div className="ImageWrapper__upload">
          {imagePreview && (
            <div className="ImageWrapper__upload-preview">
              <img src={imagePreview} alt="preview" className='img' />
              <div className="editIcon">
                <MdModeEdit
                  className="iconEdit"
                  onClick={imageSelectHandler}
                ></MdModeEdit>
              </div>
            </div>
          )}
        {!imagePreview && (
            <div className="ImageWrapper__addIcon">
              <IoMdPhotos
                className="galleryIcon"
                onClick={imageSelectHandler}
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
  image: PropTypes.string,
  setImage: PropTypes.func
};

export default ImageUpload;
