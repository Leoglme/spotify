import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./AlbumPage.styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListItem from "@material-ui/core/ListItem";
import Pagination from "@material-ui/lab/Pagination";
import AlbumDetails from "./Album.details.jsx";


/*Router*/
import {
    Link,
    Switch,
    Route,
} from "react-router-dom";

class AlbumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentSong: "",
            perPage: 14,
            page: 1,
        };
    }

    handleClick() {

    }


    componentDidMount() {
        fetch("http://localhost:8090/spotify/API/?allAlbums")
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
        const {classes, setSong} = this.props;
        const {items, perPage} = this.state;
        const page = this.state.page - 1;
        console.log(items.length);

        return (<div>
            <Switch>
                <Route path={["/" , "/album"]} exact>
                    <div className={classes.dWrap}>
                        {items.slice(page * perPage, page * perPage + perPage).map((item, index) => {
                            return (
                                <Link className={classes.tab} to={"/album/" + item.name} key={index}>
                                    <Card onClick={this.handleClick} className={classes.root} key={index}>
                                        <ListItem button className={classes.colDirection}>
                                            <div className={classes.details}>
                                                <CardContent className={classes.content}>
                                                    <Typography className={classes.textHide} component="h5" variant="h5">
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
                                                image={item.cover_small}
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
                                count={Math.ceil(items.length / perPage)}
                                page={page + 1}
                                onChange={
                                    (e, page) => this.setState({page})
                                }
                                shape="rounded"
                            />
                        </div>
                    </div>
                </Route>
                <Route exact path={"/album/:id"}>
                    <AlbumDetails setSong={setSong}/>
                </Route>
            </Switch>
        </div>);
    }
}

export default withStyles(styles, {withTheme: true})(AlbumPage);
