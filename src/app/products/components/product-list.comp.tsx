import { Grid } from "@mui/material";
import { FC } from "react";
import ProductCard, { Product } from "./product-card.comp";

const ProductList: FC = () => {
  const products: Product[] = [
    {
      id: '2',
      name: 'Chevrolet ORLANDO',
      img: "https://avcdn.av.by/wisiwigimage/0001/8199/9306.jpeg",
      price: 2424,
    },
    {
      id: '3',
      name: 'Chrysler Grand Voyager',
      img: 'https://www.ixbt.com/img/x780/n1/news/2022/9/1/shutterstock_2038483553_large.png',
      price: 289,
    },
    {
      id: '4',
      name: 'Dodge Grand Caravan ',
      img: 'https://s.mediasalt.ru/cache/content/data/images/339/339855/original.jpg',
      price: 893,
    },
    {
      id: '5',
      name: 'FORD Focus 2',
      img: 'https://5koleso.ru/wp-content/uploads/2022/01/img_5769-1024x683.jpg',
      price: 123,
    }
  ];

  return (
    <>
      <div className="character-cards" style={{ 'width': '100%' }}>
        <Grid container display="grid" gap="20px" gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}>
          {products.map(product => {
            const productId = product.id;
            return (
              <Grid item key={productId}>
                <ProductCard product={product} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </>
  );
}

export default ProductList;