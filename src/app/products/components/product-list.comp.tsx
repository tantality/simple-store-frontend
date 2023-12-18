import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC, useEffect } from "react";
import { getAllProducts } from "../store/products.actions";
import { productsSelector } from "../store/products.selectors";
import ProductCards from "./product-cards.comp";

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const { isPending, products } = useAppSelector(productsSelector);

  useEffect(() => {
    dispatch(getAllProducts({}))
  }, [dispatch])

  if (isPending) {
    <CenteredLoader />
  }

  return (
    <>
      <ProductCards products={products} />
    </>
  );
}

export default ProductList;