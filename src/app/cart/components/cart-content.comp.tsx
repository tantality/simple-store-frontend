import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getCart } from "../store/cart.actions";
import { cartSelector } from "../store/cart.selectors";
import EmptyCart from "./empty-cart.comp";

const CartContent: FC = () => {
  const dispatch = useAppDispatch();
  const { cart, isPending } = useAppSelector(cartSelector);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (isPending.cart) {
    return <CenteredLoader />
  }

  if (!cart?.items?.length && !isPending.cart) {
    return <EmptyCart />
  }

  return (
    <>
      <div>Cart</div>
    </>
  )
}

export default CartContent;