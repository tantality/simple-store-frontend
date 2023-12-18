import { Pagination } from "@mui/material";
import CenteredLoader from "components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { getAllProducts } from "../store/products.actions";
import { productsSelector } from "../store/products.selectors";
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

  if (isPending) {
    <CenteredLoader />
  }

  return (
    <>
      <ProductCards products={products} />
      {pageCount && <Pagination onChange={handleCurrentPageChange} page={currentPage} count={pageCount} size="large" />}
    </>
  );
}

export default ProductList;