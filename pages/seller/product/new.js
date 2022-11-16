import SiteHead from '@components/common/SiteHead.js';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Input from '@components/input/Input';
import * as Button from '@components/input/Button';
import SellerLayout from '@components/seller/SellerLayout';
import { POST_DATA } from '@apis/defaultApi';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useGetToken } from '@hooks/useGetToken';
import { API_BASE_URL } from '@apis/api-config';

export default function SellerProductNew() {
  const router = useRouter();

  const [headers, setHeaders] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      }
    }
    setHeaders(useGetToken());
  }, []);

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
      productName: name,
      productCategory: category,
      productRemains: remain,
      productPrice: price,
      productThumbnailImg: '',
    };

    POST_DATA('/product', params, headers).then((res) => {
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
        API_BASE_URL + `/s3?productId=${productId}`,

        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }, // Content-Type을 반드시 이렇게 하여야 한다.
      )
      .then((res) => {
        // TODO: s3 동작후에 axios 성공오지 않지만 DB저장 GOOD S3 GOOD 상태
        // 단, 등록버튼 한번 누르면 정상동작 되기 때문에 안된 줄 알고 한번 더 누르면 사진 4장 들어감
        alert('상품이 등록되었습니다.');
        router.push({
          pathname: `/seller/product/list`,
        });
      });
  }, [productId]);

  return (
    <SellerLayout>
      <SiteHead title="상품 등록" />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            상품 등록
          </h2>

          <div className="max-w-lg border rounded-lg mx-auto">
            {/* <form className="max-w-lg border rounded-lg mx-auto"> */}
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  상품명
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  placeHolder="상품명을 입력하세요."
                  onChange={onChangeName}
                  required
                />
              </div>

              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  카테고리
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  placeHolder="상품 카테고리를 입력하세요."
                  onChange={onChangeCategory}
                  required
                />
              </div>
              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  재고
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeHolder="상품 재고를 입력하세요."
                  onChange={onChangeRemain}
                  required
                />
              </div>

              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  가격
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeHolder="상품 가격을 입력하세요."
                  onChange={onChangePrice}
                  required
                />
              </div>

              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  썸네일 이미지
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  onChange={onChangeThumbnailImg}
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  required
                />
              </div>
              <div>
                <label className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                  상세 이미지
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  onChange={onChangeDetailImg}
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  required
                />
              </div>
              <div className="py-1" />

              <Button.Pink
                buttonText="상품 등록"
                name="setProduct"
                onClickFunc={setProduct}
              ></Button.Pink>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
