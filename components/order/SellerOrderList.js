import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import Order from '@components/order/SellerOrder';
import { useGetToken } from '@hooks/useGetToken';
import SortButton from '@components/input/SortButton';
import { isEmpty, numberToMonetary } from '@utils/functions';

export default function SellerOrderList() {
  const [orderList, setOrderList] = useState([]);

  const [nameSortDesc, setNameSortDesc] = useState(false);
  const [orderCntSortDesc, setOrderCntSortDesc] = useState(true);
  const [totalSortDesc, setTotalSortDesc] = useState(true);
  const [stateSortDesc, setStateSortDesc] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
      }
    }

    if (useGetToken()) {
      GET_DATA(`/orderinfo/seller`, null, useGetToken()).then((res) => {
        if (res) {
          setOrderList(res);
        }
      });
    }
  }, []);

  // 상품명정렬
  function sortListByName(e) {
    e.preventDefault();

    let copyArray = [...orderList];

    if (nameSortDesc) {
      copyArray.sort(function(a, b) { // 내림차순
        return a.productName > b.productName ? -1 : a.productName < b.productName ? 1 : 0;
      }); 
      setNameSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productName < b.productName ? -1 : a.productName > b.productName ? 1 : 0;
      });  
      setNameSortDesc(true);
    }

    setOrderList(copyArray);
  };

  // 주문수량정렬
  function sortListByOrders(e) {
    e.preventDefault();

    let copyArray = [...orderList];

    if (orderCntSortDesc) {
      copyArray.sort(function(a, b) { // 내림차순
        return a.productCnt > b.productCnt ? -1 : a.productCnt < b.productCnt ? 1 : 0;
      }); 
      setOrderCntSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productCnt < b.productCnt ? -1 : a.productCnt > b.productCnt ? 1 : 0;
      });  
      setOrderCntSortDesc(true);
    }

    setOrderList(copyArray);
  };

  // 주문총금액 정렬
  function sortListByTotal(e) {
    e.preventDefault();

    let copyArray = [...orderList];

    if (totalSortDesc) {
      copyArray.sort(function(a, b) { // 내림차순
        return a.productCnt * a.productdiscountPrice > b.productCnt * b.productdiscountPrice ?
         -1 : a.productCnt * a.productdiscountPrice < b.productCnt * b.productdiscountPrice ? 1 : 0;
      }); 
      setTotalSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.productCnt * a.productdiscountPrice < b.productCnt * b.productdiscountPrice ?
         -1 : a.productCnt * a.productdiscountPrice > b.productCnt * b.productdiscountPrice ? 1 : 0;
      });  
      setTotalSortDesc(true);
    }

    setOrderList(copyArray);
  };

  // 주문상태 정렬
  function sortListByState(e) {
    e.preventDefault();

    let copyArray = [...orderList];

    if (stateSortDesc) {
      copyArray.sort(function(a, b) { // 내림차순
        return a.state > b.state ? -1 : a.state < b.state ? 1 : 0;
      }); 
      setStateSortDesc(false);
    } else {
      copyArray.sort(function(a, b) { // 오름차순
        return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
      });  
      setStateSortDesc(true);
    }

    setOrderList(copyArray);
  };
  
  function sumTotal() {
    if (Array.isArray(orderList)) {
      let sum = 0;
      orderList.forEach((order) => {
        if (!isEmpty(order.productdiscountPrice)) {
          sum += (order.productCnt * order.productdiscountPrice);
        } else {
          sum += (order.productCnt * order.productPrice);
        }
      });
      return sum;
    } else {
      return 0;
    }
  }
  return (
    <>
      <table className="w-full text-m text-center">
        <thead className="text-base text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-14">
            <th scope="col" className="py-3 px-12 w-52 bg-gray-50">
              <div className="flex items-center justify-center">
                주문상품
                <SortButton onClickFunc={(e) => sortListByName(e)}/>
              </div>
            </th>
            <th scope="col" className="p-4 w-18">
              상품 이미지
            </th>
            <th scope="col" className="py-3 px-2 w-20">
              할인가격
            </th>
            <th scope="col" className="py-3 px-2 w-20">
              주문가격
            </th>
            <th scope="col" className="py-3 px-2 w-24">
              <div className="flex justify-center items-center">
                주문수량
                <SortButton onClickFunc={(e) => sortListByOrders(e)}/>
              </div>
            </th>
            <th scope="col" className="py-3 px-2 w-24">
              <div className="flex justify-center items-center">
                결제금액
                <SortButton onClickFunc={(e) => sortListByTotal(e)}/>
              </div>
            </th>
            <th scope="col" className="py-3 px-6 w-24">
              상품재고
            </th>
            <th scope="col" className="py-3 px-4 w-24">
              고객정보
            </th>
            <th scope="col" className="py-3 px-4 w-24">
              <div className="flex justify-center items-center">
                주문상태
                <SortButton onClickFunc={(e) => sortListByState(e)}/>
              </div>
            </th>            
            <th scope="col" className="py-3 px-4 w-24">
              결제수단
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList && orderList.map((order) => <Order order={order} />)}
        </tbody>
        <tfoot className='bg-gray-100'>
          <tr className="h-14 rounded-l-lg font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="py-3 px-6 text-base">Total</th>
            <td/>
            <td/>
            <td colSpan={4}/>
            <td className="text-right text-red-600 py-3 px-6">총 주문수 : {orderList.length}</td>
            <td colSpan={2} className="text-right text-red-600 py-3 px-6">총 주문 금액 : {numberToMonetary(sumTotal())}원</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
