import Product from '@components/product/Product';
import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import styled from '@emotion/styled';
import Pagination from '@components/common/Pagination';
import * as color from '@utils/constants/themeColor';
const INIT_PAGENUM = 0;
const INIT_SIZENUM = 20;

export default function ProductList({
  sellerId,
  sellerName,
  category,
  productName,
  page,
  size,
}) {
  const [productList, setProductList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nowPage, setNowPage] = useState(page);

  useEffect(() => {
    GET_DATA(`/product/list`, {
      sellerId,
      sellerName: sellerName,
      category: category,
      productName: productName,
      size: size,
      page: nowPage,
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
            최신 상품
          </h2>

          <a
            href="#"
            className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3"
          >
            보러가기
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
          {productList &&
            productList.map((product) => (
              // <ProductItem key={product.productId}>
              <Product product={product} />
              // </ProductItem>
            ))}
        </div>
        <p className="pt-4">총 상품 갯수 : {totalElementCnt}</p>
      </div>

      <PaginationSection>
        <Pagination
          totalPage={totalPages}
          activePage={nowPage}
          setNowPageFunction={setNowPage}
          theme={color.BlueTheme}
        />
      </PaginationSection>
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

const ProductListMain = styled.div``;

const ProductListSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`;

const ProductItem = styled.li`
  flex: auto;
  margin: 5px;
  min-width: 200px;
`;

const PaginationSection = styled.div`
  text-align: center;
`;
