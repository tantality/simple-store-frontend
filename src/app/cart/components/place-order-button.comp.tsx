import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface PlaceOrderButtonProps {
  isDisabled: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const PlaceOrderButton: FC<PlaceOrderButtonProps> = ({ isDisabled, ...props }) => {
  return (
    <Button variant="contained" disabled={isDisabled} {...props}>Place an order</Button>
  )
};

export default PlaceOrderButton;