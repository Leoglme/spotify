import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./SearchPage.styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListItem from "@material-ui/core/ListItem";
import Pagination from "@material-ui/lab/Pagination";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

class MusicPage extends React.Component {
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


        return (<div className={classes.SearchContainer}>
                <Paper component="form" className={classes.SearchBar}>
                    <InputBase
                        className={classes.input}
                        placeholder="Artistes, titres ou genre"
                        inputProps={{'aria-label': 'search'}}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </div>);
    }
}

export default withStyles(styles, {withTheme: true})(MusicPage);