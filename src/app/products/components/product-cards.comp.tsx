import { Grid } from "@mui/material";
import { FC } from "react";
import { ProductDto } from "../types/product.dto";
import ProductCard from "./product-card.comp";

interface ProductCardsProps {
  products: ProductDto[]
}

const ProductCards: FC<ProductCardsProps> = ({ products }) => {
  return (
    <div className="product-cards" style={{ 'width': '100%' }}>
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
  );
}

export default ProductCards;