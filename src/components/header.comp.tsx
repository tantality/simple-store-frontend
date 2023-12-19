import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Layout from "./layout.comp";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'default'}>
        <Layout sx={{ py: "24px" }}>
          <Toolbar sx={{ columnGap: '20px', flexWrap: "wrap", rowGap: '20px' }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} fontSize={'1.5rem'} fontWeight={600}>
              Shop
            </Typography>
            <NavLink to={'/products/'} >
              <Typography>Marketplace</Typography>
            </NavLink>
            <NavLink to={'/orders/'}>
              <Typography>Order history</Typography>
            </NavLink>
            <NavLink to={'/cart/'}>
              <Typography>Cart</Typography>
            </NavLink>
            <Button color="inherit" variant="outlined">Login</Button>
          </Toolbar>
        </Layout>
      </AppBar>
    </Box >
  )
}

export default Header;