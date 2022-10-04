import styled from '@emotion/styled';

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
  font-size: 24px;
  font-weight: bold;
`;
const H2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;
const H3 = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;
const H4 = styled.h4`
  font-size: 14px;
  font-weight: bold;
`;
export default Heading;
