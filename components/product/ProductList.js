import Product from '@components/product/Product';
import { useEffect, useState } from 'react';
import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Pagination from '@components/common/Pagination';

export default function ProductList({
  sellerId,
  sellerName,
  category,
  productName,
  page,
  size,
}) {
  //데이터용 후크
  const [productList, setProductList] = useState([]);

  //페이징용 후크
  const INIT_PAGENUM = 0;
  const INIT_SIZENUM = 20;
  const [totalElementCnt, setTotalElementCnt] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nowPage, setNowPage] = useState(page ? page : INIT_PAGENUM);
  const [nowSize, setNowSize] = useState(size ? size : INIT_SIZENUM);

  const [searchProductListParams, setSearchProductListParams] = useState({
    sellerId: sellerId,
    sellerName: sellerName,
    category: category,
    productName: productName,
    size: nowSize,
    page: nowPage,
  });

  useEffect(() => {
    setSearchProductListParams({
      sellerId: sellerId,
      sellerName: sellerName,
      category: category,
      productName: productName,
      size: nowSize,
      page: nowPage,
    });
  }, [nowSize, nowPage]);

  useEffect(() => {
    GET(`/product/list`, searchProductListParams).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('상품이 없습니다.');
        } else if (res.content) {
          setTotalElementCnt(res.numberOfElements);
          setProductList(res.content);
          setTotalPages(res.totalPages);
          setNowPage(res.pageable.pageNumber);
        }
      } else {
        alert('상품을 찾을 수 없습니다. 다시 시도해주세요.');
      }
    });
  }, [searchProductListParams]);

  return (
    <div>
      <ProductListSection>
        <ProductUnorderedList className="srch-product-list">
          {productList &&
            productList.map((product) => (
              <ProductListItem key={product.productId}>
                <Product product={product} />
              </ProductListItem>
            ))}
        </ProductUnorderedList>
        <p>총 상품 갯수 : {totalElementCnt}</p>
      </ProductListSection>
      <ProductListPaginationSection>
        <Pagination
          totalPage={totalPages}
          activePage={nowPage}
          setNowPageFunction={setNowPage}
        />
      </ProductListPaginationSection>
    </div>
  );
}

const ProductListSection = styled.div``;
const ProductUnorderedList = styled.ul``;
const ProductListItem = styled.li``;
const ProductListPaginationSection = styled.div`
  text-align: center;
`;
