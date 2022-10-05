import styled from '@emotion/styled';

// TODO: margin사이즈 props로 받는 부분 수정
const Heading = ({ title, type, marginSize = 5 }) => {
  const titleVal = title;

  switch (type) {
    case 'h1':
      return <H1>{titleVal}</H1>;
    case 'h2':
      return <H2>{titleVal}</H2>;
    case 'h3':
      return <H3>{titleVal}</H3>;
    default:
      return <H4>{titleVal}</H4>;
  }
};

const H1 = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: to
  margin-bottom: 5px;
`;
const H2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const H3 = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const H4 = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export default Heading;
