import SellerLayout from '@components/seller/SellerLayout';
import Link from 'next/link';
import Heading from '@components/input/Heading';

export default function Home() {
  return (
    <SellerLayout>
      <div>
        <Heading title="🎁 이벤트" type="h1" />
        <ul>
          <li>
            <Link href="event/newevent">
              <a>👉 이벤트 등록</a>
            </Link>
          </li>
          <li>
            <Link href="event/list">
              <a>👉 이벤트 목록</a>
            </Link>
          </li>
        </ul>
      </div>
    </SellerLayout>
  );
}
