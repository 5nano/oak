import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme,fade, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { RouteComponentProps } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserHeader } from '../../Interfaces/User';
import { Menu, MenuItem, InputBase } from '@material-ui/core';
import BushService from '../../services/bush';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import Collapse from '@material-ui/core/Collapse';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height:'100%',
    },
    toolbar:{
        justifyContent:'space-between'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor:'#6AC1A9'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor:'rgba(106, 193, 169,0.1)'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height:'100%',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
      height:'100%',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      marginRight: '20px',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
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
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);

interface ILayoutProps extends RouteComponentProps{
    renderContent: () => React.ReactNode;
    user: UserHeader;
}

const Layout:React.SFC<ILayoutProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const {renderContent,user} = props;

   const [userMenuAnchorEl,setUserMenuAnchorEl] = React.useState(null)
   const [componentsList,setComponentsList] = React.useState(false)
   const [componentsOverall,setComponentsOverall] = React.useState(false)
   const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closeUserMenu = () => {
      setUserMenuAnchorEl(null)
  }

  const logout = () => {
    BushService.post('/logout')
               .then((response)=>{
                    document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
                    window.location.href = '/';
            })
}

const openUserMenu= (event: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

const openComponentsList = () => {
  setComponentsList(!componentsList)
}

const openComponentsOverall = () => {
  setComponentsOverall(!componentsOverall)
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
            <div/>
            <div className="header-user">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Buscar…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <SettingsOutlinedIcon fontSize="small"/>
                <NotificationsNoneIcon fontSize='small'/>
                <div className="header-user-container" onClick={(e) => openUserMenu(e)}>
                  <AccountCircleIcon fontSize='large'/>
                  <div className="user-content">
                      <div className="companie">
                          {user.company}
                      </div>
                      <div className="username">
                          {user.userName}
                      </div>
                  </div>
                </div>
            </div>
            <Menu
                id='user-menu'
                anchorEl={userMenuAnchorEl}
                keepMounted
                open={Boolean(userMenuAnchorEl)}
                onClose={closeUserMenu}>
                <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
            </Menu>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
            <div className="header-icon" onClick={()=>props.history.push('/home')}>
                <img src='../../assets/images/nanivo-logo.png'/>
            </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

          <ListItem button className={classes.nested} onClick={()=>openComponentsOverall()}>
                <ListItemIcon><DashboardOutlinedIcon/></ListItemIcon>
                <ListItemText primary="Gestión" />
          </ListItem>

          <Collapse in={componentsOverall} timeout="auto" unmountOnExit>
              
            
            <List component="div" disablePadding>
              <ListItem button key={'1'} onClick={()=>props.history.push('/overall')} >
                <ListItemText primary={'Overall'} />
              </ListItem>
              
              <ListItem button key={'2'} onClick={()=>props.history.push('/gantt')} >
                <ListItemText primary={'Gantt'} />
              </ListItem>

              <ListItem button key={'3'} onClick={()=>props.history.push('/histogram')} >
                <ListItemText primary={'Histograma'} />
              </ListItem>

              <ListItem button key={'4'} onClick={()=>props.history.push('/sankey')} >
                <ListItemText primary={'Flujos de ensayos'} />
              </ListItem>

              <ListItem button key={'5'} onClick={()=>props.history.push('/sunburst')} >
                <ListItemText primary={'Sunburst '} />
              </ListItem>
            </List>
            <Divider />
          </Collapse>

          <ListItem button className={classes.nested} onClick={openComponentsList}>
                <ListItemIcon><FolderOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Componentes" />
          </ListItem>

          <Collapse in={componentsList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button key={'10'} onClick={()=>props.history.push('/agrochemicals')} >
                <ListItemText primary={'Agroquímicos'} />
              </ListItem>

              <ListItem button key={'11'} onClick={()=>props.history.push('/crops')} >
                <ListItemText primary={'Cultivos'} />
              </ListItem>

              <ListItem button key={'12'} onClick={()=>props.history.push('/mixs')} >
                <ListItemText primary={'Mezclas'} />
              </ListItem>

              <ListItem button key={'13'} onClick={()=>props.history.push('/assay')} >
                <ListItemText primary={'Ensayos'} />
              </ListItem>
            </List>
          </Collapse>

        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {renderContent()}
      </main>
    </div>
  );
}

export default Layout;