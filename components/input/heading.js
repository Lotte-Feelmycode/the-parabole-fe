import styled from "@emotion/styled";

const Heading = ({
  title,
  type,
  marginSize = 5,
}) => {
  console.log(type);

  switch (type) {
    case 'h1' : return <H1>{title}</H1>
    case 'h2' : return <H2>{title}</H2>
    case 'h3' : return <H3>{title}</H3>
    default : return <H4>{title}</H4>
  }
}

const H1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
`
const H2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
`
const H3 = styled.h3`
  font-size: 16px;
  font-weight: bold;
`
const H4 = styled.h4`
  font-size: 14px;
  font-weight: bold;
`
export default Heading