import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { authSelector } from "app/auth/store/auth.selectors";
import { cartSelector } from "app/cart/store/cart.selectors";
import { useAppSelector } from "hooks/redux.hooks";
import { FC, useState } from "react";
import AddToCartButton from "./add-to-cart-button.comp";

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { cart } = useAppSelector(cartSelector);
  const { isAuth } = useAppSelector(authSelector);

  const productInCart = cart?.items?.find(item => item.productId === product.id);

  const [isProductInCart, setIsProductInCart] = useState<boolean>(Boolean(productInCart));

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia image={product.img} title={product.name} sx={{ height: "220px" }} />
      <Stack rowGap={'20px'} sx={{ bgColor: "white", p: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Stack rowGap={'14px'}>
            <Typography variant={'h3'} sx={{ fontSize: '1.3rem', fontWeight: 600 }}>{product.name}</Typography>
            <Stack justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#A3A3A3' }}>Price:</Typography>
              <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>${product.price}</Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 0 }}>
          {isAuth ? <AddToCartButton isProductInCart={isProductInCart} /> : null}
        </CardActions>
      </Stack >
    </Card >
  );
}

export default ProductCard;