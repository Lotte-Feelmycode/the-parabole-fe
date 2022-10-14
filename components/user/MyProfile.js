import Heading from '@components/input/Heading';

export default function MyProfile({ user }) {
  return (
    <>
      <Heading title="사용자 이름" type="h1"></Heading>
      <p>user.username</p>
      <Heading title="닉네임" type="h1"></Heading>
      <p>user.nickname</p>
      <Heading title="이메일" type="h1"></Heading>
      <p>user.email</p>
      <Heading title="계정 역할" type="h1"></Heading>
      <p>user.role</p>
      <Heading title="연락처" type="h1"></Heading>
      <p>user.phone</p>
    </>
    // <>
    //   <div className="product">
    //     <ProductSection onClick={() => onClick(product.productId || 0)}>
    //       <ProductImageSection>
    //         <ProductImage
    //           className="product-img"
    //           src={product.productThumbnailImg}
    //           alt="천연 순면 마스크팩 시트 4종 100매 티트리 쉐어버터 로얄제리젤리 알로에"
    //         />
    //       </ProductImageSection>
    //       <div className="product-body">
    //         <div className="srchProductInfoColumn">
    //           <div className="srchProductUnitTitle">{product.productName}</div>
    //         </div>
    //         <div className="srchProductInfoColumn">
    //           <div className="s-product-price">
    //             <strong className="s-product-price-final">
    //               <span className="s-product-price-number">
    //                 {numberToMonetary(product.productPrice)}
    //               </span>
    //               원
    //             </strong>
    //           </div>
    //         </div>
    //         <div className="srchProductInfoColumn"></div>
    //       </div>
    //     </ProductSection>
    //   </div>
    // </>
  );
}
