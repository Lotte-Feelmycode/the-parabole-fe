import styled from '@emotion/styled';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import ChatContainer from '@components/chat/ChatContainer';
import { Blue } from '@components/input/Button';

export default function Home() {
  return (
    <CommerceLayout>
      <SiteHead title="Home" />
      <div className="container px-5 py-12 mx-auto">
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <form className="max-w-lg border rounded-lg mx-auto">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <ChatContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </CommerceLayout>
  );
}
