import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography, TextField } from "@mui/material";
import { useAppDispatch } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { useForm, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/auth.actions";
import { checkPasswordAndEmailSchema } from "../validation-schemas/check-password-and-email.schema";
import SignUpButton from "./sign-up-button.comp";

const SignUpForm = () => {
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
    <form className="sign-up-form" style={{ maxWidth: '450px', width: '100% ' }} onSubmit={handleSubmit(handleFormSubmit)}>
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
        <SignUpButton onClick={handleFormSubmit} />
      </Stack>
      <input type="text" autoComplete="on" value="" style={{ display: 'none', opacity: 0, position: 'absolute', left: '-100000px' }} readOnly={true} />
    </form >
  );
}

export default SignUpForm;