import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { FC } from "react";

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
          <Button fullWidth={true} variant={'contained'}>Add to card</Button>
        </CardActions>
      </Stack >
    </Card >
  );
}

export default ProductCard;