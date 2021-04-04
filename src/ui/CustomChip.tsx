import { makeStyles } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'

function CustomChip(props: any) {
  const { size = '1', ...restProps } = props
  const classes = useStyles({ size })

  return (
    <Chip
      className={classes.root}
      classes={{ avatar: classes.avatar, deleteIcon: classes.deleteIcon }}
      {...restProps}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: (props) => `${props.size * 0.8125}em`,
    height: (props) => `${props.size * 32}px`,
    borderRadius: '9999px',
  },
  avatar: {
    '&&': {
      height: (props) => `${props.size * 24}px`,
      width: (props) => `${props.size * 24}px`,
      fontSize: (props) => `${props.size * 0.75}em`,
    },
  },
  deleteIcon: {
    height: (props) => `${props.size * 22}px`,
    width: (props) => `${props.size * 22}px`,
    color: 'green',
  },
}))

export default CustomChip
