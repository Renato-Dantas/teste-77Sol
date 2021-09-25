import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  titles:{
    color: '#1335C6', mb: "20px", textAlign: "center", fontWeight:'bold',
  },

  card: {
    background: "linear-gradient(45deg, #1335C6 30%, #0A79C9 90%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    width: "400px",
    height: "300px",
    padding: "20px",
    borderRadius: "20px",
    textAlign:'center',
    marginBottom: '20px',
    marginLeft: '10px',
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  },

  cardBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "20px",
  },

  items: {
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "30px",
    padding: "10px",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #1335C6 30%, #0A79C9 90%)",
    color: "#FFF",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      color: "#000",
    },
  },

  boxRequest: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "30px",
    height: '100vh'
  },

  btnConsulta: {
    background: "linear-gradient(90deg, #1335C6 30%, #0A79C9 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    height: 48,
    padding: "0 30px",
  },
});

export default useStyles;
