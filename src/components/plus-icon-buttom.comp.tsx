import PlusIcon from "@mui/icons-material/AddOutlined";
import { IconButton } from "@mui/material";
import { FC, MouseEvent } from "react";

interface PlusIconButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => any;
  disabled: boolean;
}

const PlusIconButton: FC<PlusIconButtonProps> = (props) => {
  return <IconButton aria-label="plus" {...props}><PlusIcon /></IconButton>
};

export default PlusIconButton;

