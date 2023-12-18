import { FC } from "react";
import { ProductDto } from "../types/product.dto";
import ProductCards from "./product-cards.comp";

const ProductList: FC = () => {
  const products: ProductDto[] = [
    {
      id: '2',
      name: 'Chevrolet ORLANDO',
      img: "https://avcdn.av.by/wisiwigimage/0001/8199/9306.jpeg",
      price: 2424,
      createdAt: 222,
      updatedAt: 323,
      quantity: 3,
    },
    {
      id: '3',
      name: 'Chrysler Grand Voyager',
      img: 'https://www.ixbt.com/img/x780/n1/news/2022/9/1/shutterstock_2038483553_large.png',
      price: 289,
      createdAt: 222,
      updatedAt: 323,
      quantity: 3,
    },
    {
      id: '4',
      name: 'Dodge Grand Caravan ',
      img: 'https://s.mediasalt.ru/cache/content/data/images/339/339855/original.jpg',
      price: 893,
      createdAt: 222,
      updatedAt: 323,
      quantity: 3,
    },
    {
      id: '5',
      name: 'FORD Focus 2',
      img: 'https://5koleso.ru/wp-content/uploads/2022/01/img_5769-1024x683.jpg',
      price: 123,
      createdAt: 222,
      updatedAt: 323,
      quantity: 3,
    }
  ];


  return (
    <>
      <ProductCards products={products} />
    </>
  );
}

export default ProductList;