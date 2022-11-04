import styled from '@emotion/styled';
import { ThemeWhite } from '@utils/constants/themeColor';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';

export default function EmptyCart() {
  const router = useRouter();

  const EmptySection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-content: center;
  `;

  const EmptyImageContainer = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
  `;

  const EmptyImage = styled.img`
    max-height: 350px;
    border-radius: 10px;
    margin: 10px;
  `;

  const EmptyButton = styled.div`
    text-align: center;
  `;

  return (
    <EmptySection color={ThemeWhite} className="empty-section">
      <EmptyImageContainer>
        <EmptyImage src="/parabole.svg" />
      </EmptyImageContainer>
      <EmptyButton>
        <Blue
          buttonText={'상품담으러가기'}
          onClickFunc={() => {
            router.push('/');
          }}
        />
      </EmptyButton>
    </EmptySection>
  );
}
