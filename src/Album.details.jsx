import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./AlbumPage.styles";
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";


/*Music List*/
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

class AlbumDetails extends React.Component {
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

    handleClick(song) {
        this.props.setSong(song);
        console.log(this.props.setSong);
    }

    componentDidMount() {
        const {match} = this.props;
        fetch("http://localhost:8090/spotify/API/?albumDetail=" + match.params.id)
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
        const {items} = this.state;
        console.log(items);
        return (<>
            <div>
                <div className={classes.dWrap}>
                    {items['albumInfo'] && items['albumInfo'].map((item, index) => {

                        /*TimeStamp convert dateTime LOL C RIGOLO*/
                        const unixTime = item.date;
                        const date = new Date(unixTime*1000).toLocaleDateString("en-US");


                        return (<div  key={index}>
                            <div className={clsx(classes.dWrap, classes.detailsContainer)}>
                                <Card className={clsx(classes.root , classes.headerDetails)} key={index}>
                                    <img src={item.cover} alt={item.name} className={classes.coverLg}/>
                                    <div className={classes.textContent}>
                                        <h2 className={classes.titleHolder}>ALBUM</h2>
                                        <h1 className={classes.titleAlbum}>{item.name}</h1>
                                        <p className={classes.titleFooter}>{item.artist + ' - ' + date}</p>
                                    </div>
                                </Card>
                            </div>
                        </div>)
                    })}
                </div>
            </div>


            {/*Musique List*/}
            <div className={classes.root}>
                <ListItem>
                    <ListItemIcon>
                        <QueueMusicIcon/>
                    </ListItemIcon>
                    <ListItemText primary="MUSIQUE"/>
                </ListItem>
            </div>

            <Divider/>
            {items['songs'] && items['songs'].map((item, index) => {
                    return(<div onClick={() => this.handleClick(item.href)} className={clsx(classes.itemSong, classes.root)} key={index}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <PlayArrowRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItem>
                        </List>

                    </div>)
            })}
        </>);
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(AlbumDetails));

