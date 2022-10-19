import Product from '@components/order/Product';

export default function ProductList({ productList }) {
  return (
    <div>
      {productList &&
        productList.map((product) => (
          <Product product={product} key={product.productId} />
        ))}
    </div>
  );
}
