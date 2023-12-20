import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getCart } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";

const CartContent: FC = () => {
  const dispatch = useAppDispatch();
  const { cart, isPending } = useAppSelector(cartSelector);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (isPending.cart) {
    return <CenteredLoader />
  }

  return (
    <>
      <div>Cart</div>
    </>
  )
}

export default CartContent;