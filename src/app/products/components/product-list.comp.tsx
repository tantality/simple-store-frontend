import { Pagination, Stack } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { getAllProducts } from "../store/products.actions";
import { productsSelector } from "../store/products.selectors";
import NoProducts from "./no-products.comp";
import ProductCards from "./product-cards.comp";

const ProductList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { isPending, products } = useAppSelector(productsSelector);

  const handleCurrentPageChange = (event: ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllProducts({
      query: {
        pageNumber: currentPage
      }
    }))
  }, [dispatch, currentPage])

  if (!products.length) {
    return <NoProducts />
  }

  return (
    <section className="product-list">
      <Stack alignItems="center" spacing="50px">
        {isPending.products ? <CenteredLoader /> : <ProductCards products={products} />}
        {pageCount && <Pagination onChange={handleCurrentPageChange} page={currentPage} count={pageCount} size="large" />}
      </Stack>
    </section>
  );
}

export default ProductList;