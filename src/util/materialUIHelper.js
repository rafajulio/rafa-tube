import {makeStyles, createMuiTheme, withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const styles = makeStyles({
  textField: {
    '& label.Mui-focused': {
      color: 'rgb(252, 13, 27)',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(252, 13, 27, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 13, 27)',
      },
    },
  },
});

export const StyledCircularProgress = withStyles({
  root: {
    color: 'rgb(252, 13, 27)',
  },
})(CircularProgress);
