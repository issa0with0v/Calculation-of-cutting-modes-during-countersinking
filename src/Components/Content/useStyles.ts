import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '24px',
    padding: '24px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f0f2f5',
    overflow: 'auto',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: 380,
    minWidth: 340,
    gap: '16px',
  },
  middleColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: 380,
    minWidth: 340,
    gap: '16px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 340,
    gap: '16px',
  },
});

export default useStyles;