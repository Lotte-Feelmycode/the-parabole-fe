import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import { Blue } from '@components/input/Button';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <CommerceLayout>
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div class="flex flex-col items-center">
            <a
              href="/"
              class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 mb-8"
              aria-label="logo"
            >
              <EmptyImage src="/parabole.svg" />
            </a>

            <h1 class="text-gray-800 text-2xl md:text-3xl font-bold text-center mb-2">
              Page not found
            </h1>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mb-12">
              The page you’re looking for doesn’t exist.
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
