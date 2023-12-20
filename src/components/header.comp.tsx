import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { authSelector } from "app/auth/store/auth.selectors";
import { useAppSelector } from "hooks/redux.hooks";
import { NavLink } from "react-router-dom";
import Layout from "./layout.comp";
import SignInButton from "./sign-in-button.comp";
import SignOutButton from "./sign-out-button.comp";

const Header = () => {
  const { isAuth } = useAppSelector(authSelector);

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
            {isAuth ? <SignOutButton /> : <SignInButton />}
          </Toolbar>
        </Layout>
      </AppBar>
    </Box >
  )
}

export default Header;