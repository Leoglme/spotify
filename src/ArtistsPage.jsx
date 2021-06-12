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

class ArtistsPage extends React.Component{
    constructor(props){
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
        fetch("http://localhost:8090/spotify/API/?allArtists")
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
        const {classes} = this.props;
        const {items, perPage} = this.state;
        const page = this.state.page - 1;


        return (<div>
            <div className={classes.dWrap}>
                {items.slice(page * perPage, page * perPage + perPage).map((item, index) => {
                    return(
                        <Card onClick={() => this.handleClick} className={classes.root} key={index}>
                            <ListItem button className={classes.colDirection}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography className={classes.textHide} component="h5" variant="h5">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    <div className={classes.controls}>
                                        <IconButton aria-label="play/pause">
                                            <PlayArrowIcon className={classes.playIcon} />
                                        </IconButton>
                                    </div>
                                </div>
                                <CardMedia
                                    className={classes.cover}
                                    image={item.photo}
                                    title="Live from space album cover"
                                />
                            </ListItem>
                        </Card>
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
        </div>);
    }
}

export default withStyles(styles, {withTheme: true})(ArtistsPage);