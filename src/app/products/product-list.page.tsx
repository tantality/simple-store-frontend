import { Container } from "@mui/system";
import { FC } from "react";
import ProductList from "./components/product-list.comp";

const ProductListPage: FC = () => {
  return (
    <Container sx={{ px: "32px", py: "48px" }}>
      <ProductList />
    </Container>
  );
}

export default ProductListPage;