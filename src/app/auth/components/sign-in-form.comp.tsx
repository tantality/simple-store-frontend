import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, TextField } from "@mui/material";
import { getCart } from "app/cart/store/cart.actions";
import { useAppDispatch } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signIn } from "../store/auth.actions";
import { checkPasswordAndEmailSchema } from "../validation-schemas/check-password-and-email.schema";
import SignInButton from "./sign-in-button.comp";

const SignInForm = () => {
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
    const response = await dispatch(signIn({ body: formState }));
    if (response.meta.requestStatus !== 'rejected') {
      dispatch(getCart());
      navigate('/products/');
    }
    else {
      enqueueSnackbar('Failed to sign in. Please try again later.', { variant: 'error' });
    }
  };

  return (
    <form className="sign-in-form" style={{ maxWidth: '450px', width: '100% ' }} onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack alignItems={'flex-start'} rowGap="32px">
        <Typography variant="h1" fontSize={'1.5rem'} fontWeight={600}>Sign In</Typography>
        <div className="sign-in-form__inputs" style={{ width: '100% ' }}>
          <Stack rowGap={'20px'}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField fullWidth={true} required id="email" label="Email address" variant="outlined" autoComplete="none" {...field} helperText={errors.email ? `${errors.email.message}` : ''} error={Boolean(errors.email)} />)}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField fullWidth={true} required id="password" label="Password" variant="outlined" type="password" {...field} helperText={errors.password ? `${errors.password.message}` : ''} error={Boolean(errors.password)} />)}
            />
          </Stack>
        </div>
        <SignInButton onClick={handleFormSubmit} />
      </Stack>
      <input type="text" autoComplete="on" value="" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-100000px' }} readOnly={true} />
    </form>
  )
}

export default SignInForm;