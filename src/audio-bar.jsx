import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, {Component} from 'react';
/*Style*/
import {withStyles} from '@material-ui/core/styles';
import styles from './audio-bar.styles';

class AudioBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: window.location.href,
        }
    }

    render() {
        const {domain} = this.state;
        const {classes} = this.props;
        console.log(this.state);
        return (<div className={classes.musicPlayerContainer}>
                <AudioPlayer className={classes.musicPlayer}
                             src={this.props.song}/>
            </div>


        );
    }
}


export default withStyles(styles, {withTheme: true})(AudioBar);
