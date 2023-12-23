import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface SignUpButtonProps {
  onButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SignUpButton: FC<SignUpButtonProps> = ({ onButtonClick }) => {
  return (
    <Button fullWidth={true} variant="contained" type="submit" onSubmit={onButtonClick}>Create an account</Button>
  )
}

export default SignUpButton;