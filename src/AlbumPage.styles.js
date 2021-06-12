function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

const color = random_rgba();



const styles = (theme) => ({
    root: {
        display: 'flex',
        maxWidth: 200,
        maxHeight: 350,
        flexDirection: "column-reverse",
        flexGrow: 1,
        margin: "0 15px 15px",
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: "158px",
        width: "100%"
    },
    content: {
        flex: '1 0 auto',
        overflow: 'hidden',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cover: {
        width: 200,
        height: 165,
    },
    coverLg: {
        width: 240,
        height: 240,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    playIcon: {
        height: 38,
        width: 38,
        color: '#1ed760'
    },
    green: {
        background: '#1ed760'
    },

    colDirection: {
        display: 'flex',
        flexDirection: "column-reverse",
        paddingTop: 0,
        paddingBottom: 0,
    },
    pagination: {
        minWidth: "max-content",
        margin: "20px 230px 20px 0",
    },
    dCenter: {
        display: 'flex',
        justifyContent: "center",
    },
    dWrap: {
        display: 'flex',
        flexWrap: "wrap",
        marginBottom: '45px'
    },
    textHide: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        textAlign: 'center'

    },
    detailsContainer: {
        width: '80vw',
        justifyContent: "center",
        margin: 0,
    },
    headerDetails: {
        maxWidth: '75vw',
        height: 365,
        maxHeight: "unset",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: '35px 25px',
        background: 'linear-gradient(transparent,rgba(0,0,0,.5))',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
        backgroundColor: color
    },

    headerXs:{
        height: 225,
        padding: 0,
        alignItems: 'center'
    },
    textContent:{
        marginLeft: 25,
        color: '#fff',
        overflow: 'hidden'
    },
    titleHolder: {
        fontSize: 18,
        margin: 0,
    },
    titleAlbum: {
        fontSize: 75,
        margin: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    titleFooter: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        margin: 0,
    },
    listHeader: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 14,
        margin: 0,
    },
    itemSong: {
        maxWidth: '76vw',
    },
    tab : {
        textDecoration: 'none'
    }
});

export default styles;