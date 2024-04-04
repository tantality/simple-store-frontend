import MinusIcon from "@mui/icons-material/RemoveOutlined";
import { IconButton } from "@mui/material";
import { FC, MouseEvent } from "react";

interface MinusIconButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => any;
  disabled: boolean;
}

const MinusIconButton: FC<MinusIconButtonProps> = (props) => {
  return <IconButton aria-label="minus" {...props}><MinusIcon /></IconButton>
};

export default MinusIconButton;

