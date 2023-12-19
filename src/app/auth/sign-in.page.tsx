import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "components/layout.comp";
import { FC } from "react";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
  return (
    <Layout sx={{ height: '99vh' }}>
      <Stack alignItems={'center'} width={'100%'} justifyContent={'center'} height={'100%'} rowGap={'32px'}>
        <form className="sign-in-form" style={{ maxWidth: '450px', width: '100% ' }}>
          <Stack alignItems={'flex-start'} rowGap="32px">
            <Typography variant="h1" fontSize={'1.5rem'} fontWeight={600}>Sign In</Typography>
            <div className="sign-in-form__inputs" style={{ width: '100% ' }}>
              <Stack rowGap={'20px'}>
                <TextField fullWidth={true} required id="email" label="Email address" variant="outlined"></TextField>
                <TextField fullWidth={true} required id="password" label="Password" variant="outlined" type="password"></TextField>
              </Stack>
            </div>
            <Button fullWidth={true} variant="contained">Create an account</Button>
          </Stack>
        </form>
        <Stack flexDirection={'row'} columnGap={'12px'} justifyContent={'center'}>
          <Typography>Don't have an account?</Typography>
          <Link to={'/auth/sign-up'} >
            <Typography color={'#1976d2'}>Sign Up</Typography>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default SignIn;