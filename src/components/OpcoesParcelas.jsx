import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";

const OpcoesParcelas = ({texto}) => {
    return ( 
        <Box className="itens">
        <Typography className="global-font">
          {texto}
        </Typography>
      </Box>
     );
}
 
export default OpcoesParcelas;