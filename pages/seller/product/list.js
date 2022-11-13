import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import { useGetToken } from '@hooks/useGetToken';
import { LINKS } from '@utils/constants/links';
import SellerLayout from '@components/seller/SellerLayout';
import Heading from '@components/input/Heading';
import { SmallPink } from '@components/input/Button';
import { isEmpty, numberToMonetary } from '@utils/functions';
import SortButton from '@components/input/SortButton';

export default function SellerProductList() {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [priceSortDesc, setPriceSortDesc] = useState(true);
  const [nameSortDesc, setNameSortDesc] = useState(false);
  const [stockSortDesc, setStockSortDesc] = useState(true);

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
      }
    }
    setHeaders(useGetToken());

    GET_DATA(`/product/list`, null, headers).then((res) => {
      if (res) {
        setProductList(res.content);
      }
    });
  }, []);

  function sortListByPrice(e) {
    e.preventDefault();

    let copyArray = [...productList];

    if (priceSortDesc) {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productPrice > b.productPrice ? -1 : a.productPrice < b.productPrice ? 1 : 0;
      }); 
      setPriceSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productPrice < b.productPrice ? -1 : a.productPrice > b.productPrice ? 1 : 0;
      });  
      setPriceSortDesc(true);
    }

    setProductList(copyArray);
  };

  function sortListByName(e) {
    e.preventDefault();

    let copyArray = [...productList];

    if (nameSortDesc) {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productName > b.productName ? -1 : a.productName < b.productName ? 1 : 0;
      }); 
      setNameSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productName < b.productName ? -1 : a.productName > b.productName ? 1 : 0;
      });  
      setNameSortDesc(true);
    }

    setProductList(copyArray);
  };

  function sortListByStock(e) {
    e.preventDefault();

    let copyArray = [...productList];

    if (stockSortDesc) {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productRemains > b.productRemains ? -1 : a.productRemains < b.productRemains ? 1 : 0;
      }); 
      setStockSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productRemains < b.productRemains ? -1 : a.productRemains > b.productRemains ? 1 : 0;
      });  
      setStockSortDesc(true);
    }

    setProductList(copyArray);
  };


  return (
    <>
      <SellerLayout>
        <Heading title="상품 목록" type="h1" />
        <Divider />
        <table className="w-full text-m text-center">
          <thead className="text-base text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-14">
              <th scope="col" className="py-3 px-12 w-52 bg-gray-50">
                <div className="flex items-center justify-center">
                  상품명
                  <SortButton onClickFunc={(e) => sortListByName(e)}></SortButton>
                </div>
              </th>
              <th scope="col" className="p-4 w-18">
                상품 이미지
              </th>
              <th scope="col" className="py-3 px-10 w-24">
                카테고리
              </th>
              <th scope="col" className="py-3 px-10 w-40">
                <div class="flex justify-center items-center">
                  가격
                  <SortButton onClickFunc={(e) => sortListByPrice(e)}></SortButton>
                </div>
              </th>
              <th scope="col" className="py-3 px-6 w-40">
                <div className="flex items-center justify-center">
                  재고
                  <SortButton onClickFunc={(e) => sortListByStock(e)}></SortButton>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              Array.isArray(productList) &&
              productList.length > 0 ? (
              productList.map((product, index) => (
                <tr
                  key={product.productId}
                  className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                  <td className="bg-gray-50 py-2 px-4 w-52 text-left">
                    {product.productName}
                  </td>
                  <td className="py-2 px-4 mx-2 w-16">
                    <img
                      src={product.productThumbnailImg}
                      alt="상품"
                    ></img>
                  </td>
                  <td className=" py-2 px-4  w-24">
                    {product.productCategory}
                  </td>
                  <td className=" py-2 px-4  w-40">
                    {numberToMonetary(product.productPrice)} 원
                  </td>
                  <td className=" py-2 px-4  w-40">
                    {product.productRemains}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-10">
                  등록된 상품이 없습니다. 상품을 등록해주세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Div>
          <SmallPink
            buttonText="등록하기"
            name="btnPost"
            onClickFunc={() => {
              router.push('/seller/product/index');
            }}
          />
        </Div>
      </SellerLayout>
    </>
  );
}

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Tags = styled.span`
  background-color: black;
  color: white;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
`;
