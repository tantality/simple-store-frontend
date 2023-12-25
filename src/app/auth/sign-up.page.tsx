import { Stack, Typography } from "@mui/material";
import Layout from "components/layout.comp";
import { FC } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./components/sign-up-form.comp";

const SignUpPage: FC = () => {
  return (
    <Layout sx={{ height: '99vh' }}>
      <Stack alignItems={'center'} width={'100%'} justifyContent={'center'} height={'100%'} rowGap={'32px'}>
        <SignUpForm />
        <Stack flexDirection={'row'} columnGap={'12px'} justifyContent={'center'}>
          <Typography>Have an account?</Typography>
          <Link to={'/auth/sign-in'} >
            <Typography color={'#1976d2'}>Sign In</Typography>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default SignUpPage;