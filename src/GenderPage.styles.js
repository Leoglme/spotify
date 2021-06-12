const styles = (theme) => ({
    root: {
        display: 'flex',
        maxWidth: 290,
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
        width: 290,
        height: 193,
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
        marginBottom: '45px',
        height: '85vh',
    },
    textHide: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        textAlign: 'center'

    },
    tab: {
        textDecoration: 'none'
    }
});

export default styles;