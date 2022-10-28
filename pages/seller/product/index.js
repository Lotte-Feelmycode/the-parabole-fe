import SiteHead from '@components/common/SiteHead.js';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Input from '@components/input/Input';
import * as Button from '@components/input/Button';
import SellerLayout from '@components/seller/SellerLayout';
import { POST_DATA } from '@apis/defaultApi';
import axios from 'axios';

export default function ProductDetail() {
  // TODO: userId를 가져올 때 저장되어있는 걸(cookie, localstorage)로 가져오게 변경
  const userId = 1;

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [remain, setRemain] = useState();
  const [price, setPrice] = useState();
  const [fileList, setFileList] = useState([]); // 업로드한 파일들을 저장하는 배열
  const [productId, setProductId] = useState();

  const css = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box',
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const onChangeRemain = (event) => {
    setRemain(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeThumbnailImg = (e) => {
    const uploadFiles = e.target.files[0]; // 파일선택창에서 선택한 파일들
    const files = [];
    for (var i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    files.push(uploadFiles);
    setFileList(files);
  };

  const onChangeDetailImg = (e) => {
    const uploadFiles = e.target.files; // 파일선택창에서 선택한 파일들
    const files = [];
    for (var i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    for (var i = 0; i < uploadFiles.length; i++) {
      files.push(uploadFiles[i]);
    }
    setFileList(files);
  };

  function setProduct() {
    const params = {
      userId: userId,
      name: name,
      category: category,
      remain: remain,
      price: price,
    };

    POST_DATA('/product', params).then((res) => {
      setProductId(res);
    });
  }

  useEffect(() => {
    const formData = new FormData();
    for (var i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i]);
    }

    axios
      .post(
        `http://localhost:8080/api/v1/s3?productId=${productId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }, // Content-Type을 반드시 이렇게 하여야 한다.
      )
      .then((res) => {
        console.log(res);
      });
  }, [productId]);

  return (
    <>
      <SellerLayout>
        <SiteHead title="상품 등록" />
        <Div>
          상품명
          <br /> <Input css={css} onChange={onChangeName}></Input>
          <br />
          카테고리
          <br />
          <Input css={css} onChange={onChangeCategory}></Input>
          <br />
          재고
          <br />
          <Input css={css} onChange={onChangeRemain}></Input>
          <br />
          가격
          <br />
          <Input css={css} onChange={onChangePrice}></Input>
          <br />
          썸네일 이미지
          <br />
          <input
            css={css}
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onChangeThumbnailImg}
          />
          <br />
          상세 이미지
          <br />
          <input
            css={css}
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            multiple
            onChange={onChangeDetailImg}
          />
          <br />
          <Button.Pink
            buttonText="상품 등록"
            name="setProduct"
            onClickFunc={setProduct}
          ></Button.Pink>
        </Div>
      </SellerLayout>
    </>
  );
}

const Div = styled.div`
  width: 300px;
  margin: auto;
`;
