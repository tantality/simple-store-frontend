import { Dispatch, FC, MouseEvent } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from "@mui/material";

interface ExpandRowButtonProps {
  isRowOpened: boolean;
  setIsRowOpened: Dispatch<React.SetStateAction<boolean>>
}

const ExpandRowButton: FC<ExpandRowButtonProps> = ({ isRowOpened, setIsRowOpened }) => {
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsRowOpened(!isRowOpened)
  }

  return (
    <IconButton aria-label="expand row" size="small" onClick={handleButtonClick}>
      {isRowOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  )
}

export default ExpandRowButton;