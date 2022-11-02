import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <CommerceLayout>
      <div class="py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div class="flex flex-col items-center">
            <a
              href="/"
              class="inline-flex items-center text-2xl md:text-3xl font-bold gap-2.5 mb-8"
              aria-label="logo"
            >
              <EmptyImage src="/parabole.svg" />
            </a>

            <p class="text-2xl md:text-3xl font-bold text-center mb-4">
              Page not found
            </p>

            <p class="max-w-screen-md md:text-lg text-center">
              페이지가 존재하지 않습니다.
            </p>

            <p class="max-w-screen-md md:text-lg text-center mb-12">
              입력하신 주소가 정확한지 다시 한번 확인해 주세요.
            </p>

            <Blue
              buttonText="Go home"
              onClickFunc={() => {
                router.push('/');
              }}
            />
          </div>
        </div>
      </div>
    </CommerceLayout>
  );
}

const EmptyImage = styled.img`
  width: 200px;
  height: 200px;
`;
