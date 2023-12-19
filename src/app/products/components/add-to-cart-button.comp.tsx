import { Button } from "@mui/material";
import { FC } from "react";

interface AddToCartButtonProps {
  isProductInCart: boolean;
  // product
}

//product
// 

const AddToCartButton: FC<AddToCartButtonProps> = ({ isProductInCart }) => {
  // const
  const btnText = isProductInCart ? 'In cart' : 'Add to card';
  const activeBtnStyles = { fullWidth: true, variant: 'contained' };
  const disabledBtnStyles = {};

  const btnStyles = isProductInCart ? disabledBtnStyles : activeBtnStyles;


  return (
    <>
      <Button disabled fullWidth={true} variant="contained" onClick={() => console.log('fef')}>{btnText}</Button>
    </>
  )
  // createOrder / addOrderItem
}

export default AddToCartButton;

// addOrderItem  | post('orderId/items')

// param
// orderId


// body
// productId
// quantity


// createOrder

// body
// item : productId, quantity
