import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface SignInButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SignInButton: FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <Button fullWidth={true} variant="contained" type="submit" onSubmit={onClick}>Sign in</Button>
  )
}

export default SignInButton;