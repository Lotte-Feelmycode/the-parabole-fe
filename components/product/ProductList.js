import Product from '@components/product/Product';

export default function ProductList({ size, page }) {
  const data = [
    {
      key: 1,
      productId: 1,
      productName: 'Hello',
    },
    {
      key: 2,
      productId: 2,
      productName: 'Hi',
    },
  ];
  return (
    <ul className="srchProductList">
      {data &&
        data.map((product) => (
          <li key={product.key}>
            <Product product={product} />
          </li>
        ))}
    </ul>
  );
}
