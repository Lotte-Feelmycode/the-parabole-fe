import { useRouter } from 'next/router';
import { numberToMonetary } from '@utils/functions';

export default function NewProduct({ product }) {
  const router = useRouter();
  const onClick = (id) => {
    console.log('id', id);
    router.push({
      pathname: `/product/${id}`,
    });
  };

  return (
    <>
      <div className="product" onClick={() => onClick(product.productId || 0)}>
        <a
          href="#"
          className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3"
        >
          <img
            src={product.productThumbnailImg}
            loading="lazy"
            alt={product.descript}
            className="product-img w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
          />
        </a>

        <div className="product-body">
          <a
            href="#"
            className="srchProductUnitTitle text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1"
          >
            {product.productName}
          </a>

          <div className="flex items-end gap-2">
            <span className="s-product-price text-gray-800 lg:text-lg font-bold">
              {numberToMonetary(product.productPrice)}원
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
