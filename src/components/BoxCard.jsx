import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";

const BoxCard = ({ texto, img, altImg, h}) => {
  return (
    <Box className="card" height={h}>
      <img className="card-img" src={img} alt={altImg} />
      <Typography variant="h6" fontFamily="Roboto Mono">
        {texto}
      </Typography>
    </Box>
  );
};

export default BoxCard;
