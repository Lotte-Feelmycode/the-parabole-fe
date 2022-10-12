import Product from '@components/product/Product';
import { useEffect, useState } from 'react';
import { GET } from '@apis/defaultApi';
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
    GET(`/product/list`, {
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
    <div>
      <ProductListMain>
        <ProductListSection>
          {productList &&
            productList.map((product) => (
              <ProductItem key={product.productId}>
                <Product product={product} />
              </ProductItem>
            ))}
        </ProductListSection>
        <p>총 상품 갯수 : {totalElementCnt}</p>
      </ProductListMain>
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
