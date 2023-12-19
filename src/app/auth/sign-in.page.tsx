import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "components/layout.comp";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, FieldValues, SubmitHandler, useForm, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkPasswordAndEmailSchema } from "./validation-schemas/check-password-and-email.schema";
import { useAppDispatch } from "hooks/redux.hooks";
import { signIn } from "./store/auth.actions";

const SignInPage: FC = () => {
  const { control, getValues, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(checkPasswordAndEmailSchema),
    defaultValues: { email: '', password: '' }
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<FieldValues> = async () => {
    const formState = getValues();
    await dispatch(signIn({ body: formState })).then((data) => {
      if (data.meta.requestStatus !== 'rejected') {
        navigate('/products/')
      }
    })
  };

  return (
    <Layout sx={{ height: '99vh' }}>
      <Stack alignItems={'center'} width={'100%'} justifyContent={'center'} height={'100%'} rowGap={'32px'}>
        <form className="sign-in-form" style={{ maxWidth: '450px', width: '100% ' }} onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack alignItems={'flex-start'} rowGap="32px">
            <Typography variant="h1" fontSize={'1.5rem'} fontWeight={600}>Sign In</Typography>
            <div className="sign-in-form__inputs" style={{ width: '100% ' }}>
              <Stack rowGap={'20px'}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField fullWidth={true} required id="email" label="Email address" variant="outlined" autoComplete="none" {...field} helperText={errors.email ? `${errors.email.message}` : ''} error={errors.email ? true : false} />)}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField fullWidth={true} required id="password" label="Password" variant="outlined" type="password" {...field} helperText={errors.password ? `${errors.password.message}` : ''} error={errors.password ? true : false} />)}
                />
              </Stack>
            </div>
            <Button fullWidth={true} variant="contained" type="submit" onSubmit={handleFormSubmit}>Create an account</Button>
          </Stack>
          <input type="text" autoComplete="on" value="" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-100000px' }} readOnly={true} />
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

export default SignInPage;