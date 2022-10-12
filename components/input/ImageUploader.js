import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { IMAGE_UPLOAD_THUMBNAIL } from '@utils/constants/images';
import * as btn from '@components/input/Button';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const onClickFileBtn = (e) => {
    imgRef.current.click();
  };

  return (
    <div>
      <Img src={imageUrl ? imageUrl : IMAGE_UPLOAD_THUMBNAIL}></Img>
      <input
        type="file"
        ref={imgRef}
        accept="image/*"
        onChange={onChangeImage}
        style={{ display: 'none' }}
      />

      <btn.SmallLineWhite
        name="btnImgUpload"
        onClickFunc={onClickFileBtn}
        buttonText="이미지 등록"
      />
    </div>
  );
};

const Img = styled.img`
  max-width: 300px;
  height: auto;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default ImageUploader;
