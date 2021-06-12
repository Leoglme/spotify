import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./Template.styles";

class Template extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (<>

        </>);
    }
}

export default withStyles(styles, {withTheme: true})(Template);