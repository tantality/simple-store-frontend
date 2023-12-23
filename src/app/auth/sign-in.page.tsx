import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "components/layout.comp";
import { FC } from "react";
import { Link } from "react-router-dom";
import SignInForm from "./components/sign-in-form.comp";

const SignInPage: FC = () => {
  return (
    <Layout sx={{ height: '99vh' }}>
      <Stack alignItems={'center'} width={'100%'} justifyContent={'center'} height={'100%'} rowGap={'32px'}>
        <SignInForm />
        <Stack flexDirection={'row'} columnGap={'12px'} justifyContent={'center'}>
          <Typography>Don't have an account?</Typography>
          <Link to={'/auth/sign-up'} >
            <Typography color={'#1976d2'}>Sign Up</Typography>
          </Link>
        </Stack>
      </Stack>
    </Layout >
  );
};

export default SignInPage;