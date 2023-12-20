import { Button } from "@mui/material";
import { signOut } from "app/auth/store/auth.actions";
import { useAppDispatch } from "hooks/redux.hooks";
import { MouseEvent } from "react";

const SignOutButton = () => {
  const dispatch = useAppDispatch()

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(signOut());
  }

  return <Button color="inherit" variant="outlined" onClick={handleButtonClick}>Sign out</Button>
}

export default SignOutButton;