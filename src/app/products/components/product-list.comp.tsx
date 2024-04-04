import { Pagination, Stack } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { calculatePageCount } from "utils/calculate-page-count.utils";
import { getAllProducts } from "../store/products.actions";
import { productsSelector } from "../store/products.selectors";
import NoProducts from "./no-products.comp";
import ProductCards from "./product-cards.comp";
import ProductListError from "./product-list-error.comp";

const PAGE_SIZE = 12;

const ProductList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();
  const { isPending, products, count, errors } = useAppSelector(productsSelector);

  const handleCurrentPageChange = (event: ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const query = { pageNumber: currentPage, pageSize: PAGE_SIZE };
    dispatch(getAllProducts({ query }));
  }, [dispatch, currentPage])

  if (errors.products) {
    return <ProductListError />
  }

  if (count === 0) {
    return <NoProducts />
  }

  const pageCount = calculatePageCount(count, PAGE_SIZE);

  return (
    <section className="product-list">
      <Stack alignItems="center" spacing="50px">
        {isPending.products ? <CenteredLoader /> : <ProductCards products={products} />}
        {pageCount > 1 && <Pagination onChange={handleCurrentPageChange} page={currentPage} count={pageCount} size="large" />}
      </Stack>
    </section>
  );
}

export default ProductList;