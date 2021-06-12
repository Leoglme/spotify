import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./GenderPage.styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListItem from "@material-ui/core/ListItem";

/*Router*/
import {
    Link,
    Switch,
    Route,
} from "react-router-dom";
import GenderDetails from "./gender.details.jsx";


class MusicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8090/spotify/API/?allGenres")
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
        const {items} = this.state;
        const {classes, setSong} = this.props;
        console.log(items);

        return (<>
            <div className={classes.dWrap}>
                <Switch>
                    <Route path={"/genre"} exact>
                        {items.map((item, index) => {
                            return (
                                <Link className={classes.tab} to={"/genre/" + item.name} key={index}>
                                    <Card className={classes.root} key={index}>
                                        <ListItem button className={classes.colDirection}>
                                            <div className={classes.details}>
                                                <CardContent className={classes.content}>
                                                    <Typography component="h5" variant="h5">
                                                        {item.name}
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
                                                image={"Assets/" + item.id + ".png"}
                                                title="Live from space album cover"
                                            />
                                        </ListItem>
                                    </Card>
                                </Link>
                            )
                        })}
                    </Route>
                    <Route exact path={"/genre/:id"}>
                        <GenderDetails setSong={setSong}/>
                    </Route>
                </Switch>
            </div>
        </>);


    }
}

export default withStyles(styles, {withTheme: true})(MusicPage);