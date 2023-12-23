import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface SignInButtonProps {
  onButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SignInButton: FC<SignInButtonProps> = ({ onButtonClick }) => {
  return (
    <Button fullWidth={true} variant="contained" type="submit" onSubmit={onButtonClick}>Sign in</Button>
  )
}

export default SignInButton;