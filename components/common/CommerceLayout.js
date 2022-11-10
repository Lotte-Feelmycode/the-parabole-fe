import CommerceHeader from '@components/common/CommerceHeader';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';

export default function CommerceLayout({ children }) {
  return (
    <>
      <CommerceHeader />
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <CommerceInnerSection className="container px-5 py-24 mx-auto">
          <div>{children}</div>
        </CommerceInnerSection>
      </section>
      <Footer />
    </>
  );
}

const CommerceInnerSection = styled.div`
  @media (max-width: 767px) {
    padding: 12px 5px;
  }
`;
