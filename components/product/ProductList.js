import Product from '@components/product/Product';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GET_DATA } from '@apis/defaultApi';
import styled from '@emotion/styled';
import Pagination from '@components/common/Pagination';
import * as color from '@utils/constants/themeColor';
import Link from 'next/link';

const INIT_PAGENUM = 0;
const INIT_SIZENUM = 20;

export default function ProductList({
  sellerId,
  sellerName,
  category,
  productName,
  page,
  size,
  sort,
}) {
  const [productList, setProductList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nowPage, setNowPage] = useState(page);

  const isMainPage = useRouter().pathname === '/' ? true : false;

  useEffect(() => {
    GET_DATA(`/product/list`, {
      sellerId,
      sellerName: sellerName,
      category: category,
      productName: productName,
      size: size,
      page: nowPage,
      sort: sort,
    }).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('상품이 없습니다.');
        } else if (res.content) {
          setTotalElementCnt(res.totalElements);
          setProductList(res.content);
          setTotalPages(res.totalPages);
          setNowPage(res.pageable.pageNumber);
        }
      } else {
        alert('상품을 찾을 수 없습니다. 다시 시도해주세요.');
      }
    });
  }, [sellerId, sellerName, category, productName, nowPage, size]);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-end gap-4 mb-6">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
            상품 목록
          </h2>
          {isMainPage && (
            <Link href="/product">
              <a className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3">
                보러가기
              </a>
            </Link>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
          {productList &&
            productList.map((product) => (
              <Product product={product} key={product.productId} />
            ))}
        </div>
      </div>

      <PaginationSection>
        <Pagination
          totalPage={totalPages}
          activePage={nowPage}
          setNowPageFunction={setNowPage}
          theme={color.BlueTheme}
        />
      </PaginationSection>
      <p className="pt-4 text-right">총 상품 갯수 : {totalElementCnt}</p>
    </div>
  );
}

ProductList.defaultProps = {
  sellerId: '',
  sellerName: '',
  category: '',
  productName: '',
  size: INIT_SIZENUM,
  page: INIT_PAGENUM,
};

const PaginationSection = styled.div`
  text-align: center;
`;
