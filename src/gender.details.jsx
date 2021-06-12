import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./AlbumPage.styles";
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import AlbumDetails from "./Album.details.jsx";
import Pagination from "@material-ui/lab/Pagination";

/*Music List*/
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AlbumIcon from '@material-ui/icons/Album';
import {Link, Route, Switch} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CardMedia from "@material-ui/core/CardMedia";

class GenderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentSong: "",
            perPage: 7,
            page: 1,
        };
    }

    handleClick(song) {
        this.props.setSong(song);
    }

    componentDidMount() {
        const {match} = this.props;
        console.log("match", match);
        fetch("http://localhost:8090/spotify/API/?genreDetail=" + match.params.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const domain = window.location.origin;
        const {classes} = this.props;
        const {items, perPage} = this.state;
        const page = this.state.page - 1;
        const count = items['albums'];
        const currentGenre = items['genreInfo'] && items['genreInfo'][0].name;


        return (<>
            <div>
                <div className={classes.dWrap}>
                    {items['genreInfo'] && items['genreInfo'].map((item, index) => {
                        return (<div key={index}>
                            <div className={clsx(classes.dWrap, classes.detailsContainer)}>
                                <Card className={clsx(classes.root, classes.headerDetails, classes.headerXs)}
                                      key={index}>
                                    <img src={domain + "/Assets/" + item.id + ".png"} className={classes.coverLg}
                                         alt={item.name}/>
                                    <div className={classes.textContent}>
                                        <h2 className={classes.titleHolder}>CATÉGORIE</h2>
                                        <h1 className={classes.titleAlbum}>{item.name}</h1>
                                        <p className={classes.titleFooter}>{item.countAlbum + " albums"}</p>
                                    </div>
                                </Card>
                            </div>
                        </div>)
                    })}
                </div>
            </div>


            {/*ALbum List*/}
            <div className={classes.root}>
                <ListItem>
                    <ListItemIcon>
                        <AlbumIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ALBUM"/>
                </ListItem>
            </div>

            <Divider/>
            <div>
                <Switch>
                    <Route path={"/genre/" + currentGenre} exact>
                        <div className={classes.dWrap}>
                            {items['albums'] && items['albums'].slice(page * perPage, page * perPage + perPage).map((item, index) => {
                                return (
                                    <Link className={classes.tab} to={"/album/" + item.name} key={index}>
                                        <Card className={classes.root} key={index}>
                                            <ListItem button className={classes.colDirection}>
                                                <div className={classes.details}>
                                                    <CardContent className={classes.content}>
                                                        <Typography className={classes.textHide} component="h5"
                                                                    variant="h5">
                                                            {item.name}
                                                        </Typography>
                                                        <Typography className={classes.textHide} variant="subtitle1"
                                                                    color="textSecondary">
                                                            {item.artist}
                                                        </Typography>
                                                    </CardContent>
                                                    <div className={classes.controls}>
                                                        <IconButton aria-label="play/pause">
                                                            <PlayArrowIcon className={classes.playIcon}/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <CardMedia
                                                    className={classes.cover}
                                                    image={item.cover}
                                                    title="Live from space album cover"
                                                />
                                            </ListItem>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className={classes.dCenter}>
                            <div className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(count && count.length / perPage)}
                                    page={page + 1}
                                    onChange={
                                        (e, page) => this.setState({page})
                                    }
                                    shape="rounded"
                                />
                            </div>
                        </div>
                    </Route>
                    <Route exact path={"/genre/" + currentGenre + "/:id"}>
                        <AlbumDetails/>
                    </Route>
                </Switch>
            </div>

        </>);
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(GenderDetails));

