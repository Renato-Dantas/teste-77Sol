import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";

const globalColor = "#1335C6";
const options = [
  {
    value: "fibrocimento-madeira",
    label: "Fibrocimento-madeira",
  },
  {
    value: "fibrocimento-metalico",
    label: "Fibrocimento-metalico",
  },
  {
    value: "ceramico",
    label: "Cerâmico",
  },
  {
    value: "metalico",
    label: "Metálico",
  },
  {
    value: "laje",
    label: "Laje",
  },
  {
    value: "solo",
    label: "Solo",
  },
];


const TelaInicial = ({
  loadData,
  handleChangeInput,
  isInpError,
  telhado,
  handleChangeOption,
  handleChangeSlide,
  setCep,
  valorConta
}) => {
  
  //Tratamento da mascará de CEP
  const cepInput = document.querySelector(".inp-cep");
  var zipCode = "";
  cepInput?.addEventListener("keyup", () => {
    zipCode = cepInput.value;
    if (zipCode)
      if (zipCode.length === 8) {
        cepInput.value = `${zipCode.substr(0, 5)} - ${zipCode.substr(5, 9)}`;
        setCep(cepInput.value);
      }
  });
  return (
    <Box component="form" className="box-form" noValidate autoComplete="off">

      {/* INPUT PARA USUARIO COLOCAR O CEP */}
      <TextField
        id="outlined-basic"
        label="CEP"
        variant="outlined"
        onChange={handleChangeInput}
        type="text"
        className="inp-cep"
        error={isInpError}
        sx={{border:'1px solid #1335c6'}}
      />

      {/* SELETOR DE ESTRUTURA */}
      <TextField
        id="outlined-select-currency"
        select
        label="Tipo Telhado"
        value={telhado}
        defaultValue=""
        onChange={handleChangeOption}
        className="inp-box"
        error={isInpError}
        sx={{border:'1px solid #1335c6'}}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ color: globalColor }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Typography className='label-conta' fontFamily='Roboto Mono' sx={{fontWeight:'bold'}}>Valor mensal da sua conta de energia: R$ {valorConta +',00'}</Typography>

      {/* SLIDER PARA ESCOLHER O VALOR DA CONTA */}
      <Box width={300} sx={{ m: "10px  auto" }}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="on"
          min={100}
          max={10000}
          onChange={handleChangeSlide}
          sx={{ color: "#1335C6" }}
        />
      </Box>
      {/* BOTÃO ENVIAR DADOS */}
      <Button
        variant="contained"
        onClick={loadData}
        sx={{ backgroundColor: globalColor }}
      >
        Calcular
      </Button>
    </Box>
  );
};

export default TelaInicial;
