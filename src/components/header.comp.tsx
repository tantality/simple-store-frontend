import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'default'}>
        <Container sx={{ px: "48px", py: "24px" }} maxWidth={'xl'}>
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
        </Container>
      </AppBar>
    </Box >
  )
}

export default Header;