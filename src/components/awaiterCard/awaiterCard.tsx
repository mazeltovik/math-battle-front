//Styles
import './awaiterCard.scss';

//Types
import { awaiterCardTypes } from './awaiterCardTypes';

//Images

//MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//Components

//React

//Hooks

//Helpers
import getHex from '../../helpers/getHex';
import getAvatarTitle from '../../helpers/getAvatarTitle';
//Handlers

export default function AwaiterCard({ userId, name }: awaiterCardTypes) {
  const bgHex = getHex();
  const avatarTitle = getAvatarTitle(name);
  return (
    <Card sx={{ width: '100%' }} id={userId}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: `#${bgHex}` }} aria-label="avatar">
            {avatarTitle}
          </Avatar>
        }
        title={name}
      />
      <CardActions sx={{ flexDirection: 'row-reverse' }}>
        <Button
          variant="contained"
          type="submit"
          // disabled={true}
          sx={{
            ':hover': {
              bgcolor: 'cyan.dark',
            },
            bgcolor: 'cyan.light',
            // width: { xs: '100%', sm: '40%' },
          }}
        >
          Approve
        </Button>
      </CardActions>
    </Card>
  );
}
