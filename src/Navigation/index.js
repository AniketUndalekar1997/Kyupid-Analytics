import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './index.css';
import OutlinedCard from '../cards/index'
import { getPieChart } from '../charts';

const drawerWidth = 210;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 1,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderCards = (data) => {
        const { totalUsers, totalMatches, totalProUsers, avgAge, proPercent, femalePercent, malePercent } = data;

        return (
            < Box component="main" sx={{ flexGrow: 0, p: 3, marginLeft: 7 }}  >
                <div className='container' style={{ marginTop: 60 }}>
                    <OutlinedCard className="card" totalUsers={totalUsers} fPer={femalePercent} mPer={malePercent} />
                    <OutlinedCard className="card" totalMatches={totalMatches} />

                </div>
                <div className='container' style={{ marginTop: 10 }}>
                    <OutlinedCard className="card" totalProUsers={totalProUsers} proPercent={proPercent} />
                    <OutlinedCard className="card" avgAge={Math.floor(avgAge / totalUsers)} />
                </div>
            </Box >
        )
    }

    const renderUserPieChart = (data) => {
        const { totalUsers, totalProUsers } = data;
        const dataSet = [
            ["User", "Pro Users"],
            ["Normal Users", totalUsers - totalProUsers],
            ["Pro Users", totalProUsers],
        ];

        return (
            getPieChart(dataSet, "User Distribution", '#2DB237', '#D65134')
        )
    }

    const renderGenderPieChart = (data) => {
        const { maleCount, femaleCount } = data;
        const dataSet = [
            ['Males Users', 'Female Users'],
            ["Males Users", maleCount],
            ["Female Users", femaleCount],
        ];

        return (
            getPieChart(dataSet, "Gender Distribution", '#4264CF', '#DC3FB6')
        )
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className="navBar" style={{ backgroundColor: "#24292e" }} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Kyupid Analytics
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}  >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Dashboard', 'Maps'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <DashboardIcon /> : <AddLocationAlt />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Info Box  */}
            {props.dataObj ? renderCards(props.dataObj) : null}

            {/* PieCharts */}
            <div className='chartDiv'>
                {props.dataObj ? renderUserPieChart(props.dataObj) : null}
            </div>
            <div className='chartDiv'>
                {props.dataObj ? renderGenderPieChart(props.dataObj) : null}
            </div>
        </Box >

    );
}
