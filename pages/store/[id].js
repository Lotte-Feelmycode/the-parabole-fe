import { useRouter } from 'next/router';
import { useState } from 'react';

export default function store() {
  const router = useRouter();
  const [sellerId, setSellerId] = useState(router.query.id);

  const productListProps = {
    size: 3,
    page: 0,
  };

  return (
    <div>
      <ProductList {...productListProps} />
    </div>
  );
}
