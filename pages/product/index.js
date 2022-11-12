import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import { useRouter } from 'next/router';
import ProductList from '@components/product/ProductList';
import CustomSwiper from '@components/common/CustomSwiper';
import SearchBar from '@components/input/SearchBar';

export default function Products({}) {
  const router = useRouter();
  const inputSearchValue = router.query.searchValue;
  const productListProps = {
    size: 12,
    page: 0,
    productName: inputSearchValue,
    sort: 'createdAt,desc',
  };

  return (
    <>
      <CommerceLayout>
        <SiteHead title="Home" />
        <SearchBarSection className="search-bar-section">
          <SearchBar
            placeholder={inputSearchValue || '검색어를 입력해주세요'}
          />
        </SearchBarSection>
        <CustomSwiper />
        <Row>
          <ProductList {...productListProps} />
        </Row>
      </CommerceLayout>
    </>
  );
}

const SearchBarSection = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  @media (max-width: 1024px) {
    padding: 24px 5px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: -10px;
  margin-left: -10px;
  align-items: stretch;
  margin-bottom: 40px;
`;
