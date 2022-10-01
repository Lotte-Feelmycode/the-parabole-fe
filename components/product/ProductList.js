import Product from '@components/product/Product';
import { useEffect, useState } from 'react';
import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';

export default function ProductList({
  sellerId,
  sellerName,
  category,
  productName,
  page,
  size,
}) {
  const router = useRouter();
  //데이터용 후크
  const [data, setData] = useState({});
  const [productList, setProductList] = useState([]);

  //검색용 후크
  const [choiceVal, setChoiceVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  //페이징용 후크
  const INIT_PAGENUM = 1;
  const [nowPage, setNowPage] = useState(INIT_PAGENUM);
  const [totalCnt, setTotalCnt] = useState(0);

  const searchProductListParams = {
    size: 20,
    page: 1,
  };

  useEffect(() => {
    GET(`/product/list`, searchProductListParams).then((res) => {
      console.log('get : ' + JSON.stringify(res));

      if (res.content) setProductList(res.content);
      setData(res);
      // return res;
    });

    // console.log(JSON.stringify(getProductList()));
  }, []);

  return (
    <ul className="srchProductList">
      {productList &&
        productList.map((product) => (
          <li key={product.productId}>
            <Product product={product} />
          </li>
        ))}
    </ul>
  );
}
