import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, TextField, Button } from "@mui/material";
import Layout from "components/layout.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { FC } from "react";
import { useForm, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "./store/auth.actions";
import { useSnackbar } from "notistack";
import { checkPasswordAndEmailSchema } from "./validation-schemas/check-password-and-email.schema";

const SignUpPage: FC = () => {
  const { control, getValues, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(checkPasswordAndEmailSchema),
    defaultValues: { email: '', password: '' }
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit: SubmitHandler<FieldValues> = async () => {
    const formState = getValues();

    const response = await dispatch(signUp({ body: formState }))
    if (response.meta.requestStatus !== 'rejected') {
      navigate('/products/')
    } else {
      enqueueSnackbar('Failed to sign up. Please try again later.', { variant: 'error' });
    }
  };

  return (
    <Layout sx={{ height: '99vh' }}>
      <Stack alignItems={'center'} width={'100%'} justifyContent={'center'} height={'100%'} rowGap={'32px'}>
        <form className="sign-in-form" style={{ maxWidth: '450px', width: '100% ' }} onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack alignItems={'flex-start'} rowGap="32px">
            <Typography variant="h1" fontSize={'1.5rem'} fontWeight={600}>Sign Up</Typography>
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