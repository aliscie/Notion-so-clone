import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: '10px',
    },
    submit: {
      margin: theme.spacing(1, 0, 1),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontSize: 14,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: '500ms',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,

      backgroundColor: fade(theme.palette.primary.light, 0.1),
      '&:hover': {
        transitionProperty: 'background-color',
        transitionTimingFunction: 'ease-in-out',
        transitionDuration: '300ms',
        backgroundColor: fade(theme.palette.primary.main, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
)
export default useStyles
