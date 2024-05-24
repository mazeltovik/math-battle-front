//Styles
import './difficultyRating.scss';

//Types
import { difficultyRatingTypes } from './difficultyRatingTypes';

//Images

//MUI
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
//Components

//React

//Hooks

//Helpers

//Handlers

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
    label: 'Very Satisfied',
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
    label: 'Neutral',
  },
  3: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
    label: 'Very Dissatisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function DifficultyRating({
  defaultDifficulty,
  setDifficulty,
}: difficultyRatingTypes) {
  return (
    <StyledRating
      name="highlight-selected-only"
      value={defaultDifficulty}
      max={3}
      sx={{
        gap: '1rem',
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          setDifficulty(newValue);
        }
      }}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}
