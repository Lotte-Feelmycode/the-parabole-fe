import * as ICON from '@utils/constants/icons';

export default function IconList() {
  const iconList = [
    { title: '스토어', icon: ICON.ICON_SHOP },
    { title: '오늘의 특가', icon: ICON.ICON_PERCENT },
    { title: '당일 배송', icon: ICON.ICON_TRUCK },
    { title: '검색', icon: ICON.ICON_SEARCH },
    { title: '신규 할인', icon: ICON.ICON_OPEN },
    { title: '쇼핑백', icon: ICON.ICON_HEART_BAG },
    { title: '주문 가능 상품', icon: ICON.ICON_ONLINE_SHOPPING },
    { title: '신상품', icon: ICON.ICON_ONLINE_SHOPPING_2 },
  ];

  return (
    <div className="flex flex-col items-centermt-8 md:mt-16">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-4 lg:gap-x-10 gap-y-8 lg:gap-y-12 items-center">
        {console.log(iconList)}
        {iconList.map((item) => (
          <div className="flex flex-col items-center" key={item.title}>
            <div className="md:w-24 md:h-24 bg-gray-100 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
              <img
                src={item.icon}
                loading="lazy"
                className="w-full h-full p-2 object-cover object-center"
              />
            </div>
            <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
