const styles = (theme) => ({
    musicPlayer : {
        boxShadow: "none",
        width: "50%",
        margin: "10px 0",
    },
    musicPlayerContainer: {
        zIndex: "3000",
        backgroundColor: "#fff",
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px 0px',
        display: 'flex',
        justifyContent: 'center',
        position: "fixed",
        width: "100%",
        bottom: 0
    },
});

export default styles;