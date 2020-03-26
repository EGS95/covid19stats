const myStyle = theme => ({
    number:{
        color:theme.palette.secondary.main,
        margin:0,
        padding:0,
        display:'inline-block',
      
    },
    stats: {
        color:'white',
        fontStyle:'normal',
        fontSize:'0.9em'

    },
    title:{
        fontStyle:'italic',
        fontWeight:'bold'
    },
    worldStatsImg:{
        width:'80%',
    },

    worldIcon:{
        marginRight:'10px'
    },
    [theme.breakpoints.down('sm')]:{
        typo:{
            fontSize:'30px'
        }
    },

})

export default myStyle;