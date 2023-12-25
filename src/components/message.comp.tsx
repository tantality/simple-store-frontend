import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";

interface BtnProps {
  text: string;
  href: string;
}

interface MessageProps {
  btnProps?: BtnProps;
  title: string;
  text?: string
}

const Message: FC<MessageProps> = ({ btnProps, title, text }) => {
  return (
    <section className="message">
      <Stack alignContent={'center'} flexWrap={'wrap'} sx={{ width: '100%' }}>
        <Stack rowGap={'24px'} sx={{ maxWidth: '600px' }} alignItems={'center'}>
          <Typography variant={'h3'} sx={{ fontSize: '1.3rem', fontWeight: 600 }} >{title}</Typography>
          {text && <Typography sx={{ color: '#767676', fontSize: '1rem', fontWeight: 500 }}>{text}</Typography>}
          {btnProps && <Button variant="contained" href={btnProps.href}>{btnProps.text}</Button>}
        </Stack>
      </Stack>
    </section >
  );
}

export default Message;