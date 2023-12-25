import { Button } from "@mui/material";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('/auth/sign-in/');
  }

  return <Button color="inherit" variant="outlined" onClick={handleButtonClick}>Sign in</Button>
}

export default SignInButton;