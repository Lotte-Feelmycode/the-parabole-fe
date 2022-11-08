import styled from '@emotion/styled';

export default function CartContentHeader({ storeName }) {
  const StoreNameSection = styled.div`
    text-align: center;
    padding-bottom: 10px;
  `;

  return <StoreNameSection>{storeName}</StoreNameSection>;
}
