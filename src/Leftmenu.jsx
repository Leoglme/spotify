import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
    Link,
    Switch,
    Route,
} from "react-router-dom";

/*Icon*/
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import AlbumIcon from '@material-ui/icons/Album';
import RadioIcon from '@material-ui/icons/Radio';

/*Style*/
import {withStyles} from '@material-ui/core/styles';
import styles from './Leftmenu.styles';
import clsx from 'clsx';

/*Main Content*/
import ArtistsPage from './ArtistsPage.jsx';
import SearchPage from './SearchPage.jsx';
import AlbumPage from './AlbumPage.jsx';
import GenderPage from "./GenderPage.jsx";
import MusicPage from "./MusicPage";
import AlbumDetail from "./Album.details.jsx";

class PermanentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
        }
        this.renderHome = this.renderHome.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    renderHome() {
        return (<AlbumPage/>)
    }
    handleClick(){
        this.setState({content: "toto"})
    }

    render() {

        const {classes, setSong} = this.props;
        const domain = window.location.href;
        const tabMenu = [
            {
                exact: true,
                title: "Accueil",
                icon: (<HomeIcon/>),
                href: "/",
                content: (<AlbumPage setSong={setSong}/>),
            },
            {
                title: "Recherche",
                icon: (<SearchIcon/>),
                href: "/recherche",
                content: (<SearchPage/>),
            },
            {
                title: "Musique",
                icon: (<LibraryMusicIcon/>),
                href: "/musique",
                content: (<MusicPage setSong={setSong}/>),
            },
            {
                title: "Genre",
                icon: (<QueueMusicIcon/>),
                href: "/genre",
                content: (<GenderPage/>),
            },
            {
                exact: false,
                title: "Album",
                icon: (<AlbumIcon/>),
                href: "/album",
                content: (<AlbumPage setSong={setSong}/>),
            },
            {
                title: "Artistes",
                icon: (<RadioIcon/>),
                href: "/artiste",
                content: (<ArtistsPage/>),
            },
        ];
        return (<>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >

                <img src={window.location.origin + "/Assets/spotify.png"} alt="logo spotify"/>
                <List>
                    {tabMenu.map((item, index) => {
                        return (
                            <Link className={classes.tab} to={item.href} key={index}>
                                <ListItem button>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </Drawer>
            <main className={clsx(classes.content, {[classes.bgColor]: true})}>
                <Switch>
                    {tabMenu.map((item, index) => {
                        return (
                            <Route path={item.href} key={index} exact={item.exact}>
                                {item.content}
                            </Route>
                        );
                    })}
                </Switch>
            </main>
        </>);
    }

}


export default withStyles(styles, {withTheme: true})(PermanentDrawerLeft);