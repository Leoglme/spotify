const drawerWidth = 240;

const styles = (theme) => ({
    bgColor: {
        color: "rgba(0, 0, 0, 0.87)",
    },
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: drawerWidth,
        flexWrap: "wrap",
        display: "flex"
    },

    tab: {
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.87)",
    }
});

export default styles;