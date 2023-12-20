import { Button } from "@mui/material";
import { FC } from "react";

interface AddToCartButtonProps {
  isProductInCart: boolean;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ isProductInCart }) => {
  const btnText = isProductInCart ? 'In cart' : 'Add to card';
  return <Button fullWidth={true} variant="contained" disabled={isProductInCart}>{btnText}</Button>
}

export default AddToCartButton;
