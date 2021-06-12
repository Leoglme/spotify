import './App.css';
import React, {Component} from 'react';
import AudioBar from "./audio-bar.jsx";
import LeftMenu from "./Leftmenu.jsx";
import {withStyles} from '@material-ui/core/styles';
import styles from './App.styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: null,
        }
        this.setSong = this.setSong.bind(this);
    }

    setSong(newSong){
        this.setState({
            song: newSong
        })
    }

    render() {
        const {classes} = this.props;
        return (<div className={classes.content}>
            <AudioBar song={this.state.song}/>
            <LeftMenu setSong={this.setSong}/>
        </div>);
    }
}


export default withStyles(styles, {withTheme: true})(App);
