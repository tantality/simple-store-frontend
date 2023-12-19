import { Container } from "@mui/system";
import Header from "components/header.comp";
import { FC } from "react";
import ProductList from "./components/product-list.comp";

const ProductListPage: FC = () => {
  return (
    <>
      <Header />
      <Container sx={{ px: "48px", py: "32px" }} maxWidth={'xl'}>
        <ProductList />
      </Container>
    </>
  );
}

export default ProductListPage;