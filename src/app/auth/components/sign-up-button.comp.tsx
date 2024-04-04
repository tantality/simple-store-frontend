import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface SignUpButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SignUpButton: FC<SignUpButtonProps> = ({ onClick }) => {
  return (
    <Button fullWidth={true} variant="contained" type="submit" onSubmit={onClick}>Create an account</Button>
  )
}

export default SignUpButton;