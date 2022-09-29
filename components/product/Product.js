import { useRouter } from 'next/router';

export default function Product({ product }) {
  console.log('product props : ' + JSON.stringify(product));
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(
      {
        pathname: `/productDetail/${id}`,
        query: {
          title,
        },
      },
      `/productDetail/${id}`,
    );
  };
  return (
    <div>
      <a onClick={() => onClick(product.productId || 1, product.productName)}>
        <div>
          <img
            src="https://contents.lotteon.com/itemimage/_v114501/LO/10/00/39/35/55/_1/00/03/93/55/6/LO1000393555_1000393556_1.jpg/dims/optimize/dims/resizemc/360x360"
            alt="천연 순면 마스크팩 시트 4종 100매 티트리 쉐어버터 로얄제리젤리 알로에"
          />
        </div>
      </a>
      <div className="product-body">
        <div className="srchProductInfoColumn">
          <div className="srchProductUnitTitle">{product.productName}</div>
        </div>
        <div className="srchProductInfoColumn">
          <div className="s-product-price">
            <strong className="s-product-price-final">
              <span className="s-product-price-number">000,000</span>원
            </strong>
          </div>
        </div>
        <div className="srchProductInfoColumn"></div>
      </div>
    </div>
  );
}
