import styled from '@emotion/styled';

export default function CartFooter({ length }) {
  return (
    <TotalProductCount className="total-product-count">
      <span>총 {length} 개</span>
    </TotalProductCount>
  );
}

const TotalProductCount = styled.div`
  padding: 1rem;
  text-align: right;
  @media (max-width: 1024px) {
    display: none;
  }
`;
