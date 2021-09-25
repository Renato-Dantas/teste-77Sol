import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";

const OpcoesParcelas = ({i, texto}) => {
    return ( 
        <Box key={i++} className="itens">
        <Typography className="global-font">
          {texto}
        </Typography>
      </Box>
     );
}
 
export default OpcoesParcelas;