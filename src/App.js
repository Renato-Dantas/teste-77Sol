import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Api from "./api/api";
import useStyles from "./styles/styles";

function App() {
  const styles = useStyles();

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

  var i = 0;

  const globalColor = "#1335C6";

  const [telhado, setTelhado] = useState("");

  const [cep, setCep] = useState();

  const [valorConta, setValorConta] = useState(100);

  const [data, setData] = useState();

  const [parcelas, setParcelas] = useState();

  const handleChangeOption = (event) => {
    setTelhado(event.target.value);
  };

  const handleChangeInput = (event) => {
    let value = event.target.value;
    setCep(value);
  };

  const handleChangeSlide = (event) => {
    let value = event.target.value;
    setValorConta(value);
  };

  useEffect(() => {
    setParcelas(data?.parcelamento);
  }, [data]);

  async function loadData() {
    Api({ telhado, valorConta, cep }).then((data) => {
      setData(data);
      console.log("Aqui tem o data: ", data);
      console.log("Parcelamentos", data.parcelamento);
    });
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        fontFamily='Roboto Mono'
        sx={{ textAlign: "center", mb: "50px", mt: "50px", color: globalColor, fontWeight:'bold', textShadow:'2px 2px 5px rgba(0, 0, 0, .3)', fontFamily:'Roboto Mono'}}
      >
        SIMULADOR SOLAR
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          border: "1px solid",
          borderColor: "#1976D2",
          borderRadius: "10px",
          padding: "20px",
          gap: "25px",
          margin: "auto",
          boxShadow: "2px 2px 5px 5px #ddd",
        }}
        noValidate
        autoComplete="off"
      >
        {/* INPUT PARA USUARIO COLOCAR O CEP */}

        <TextField
          id="outlined-basic"
          label="CEP"
          variant="outlined"
          onChange={handleChangeInput}
          type="text"
        />

        {/* SELETOR DE ESTRUTURA */}
        <TextField
          id="outlined-select-currency"
          select
          label="Estrutura"
          value={telhado}
          defaultValue=""
          onChange={handleChangeOption}
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

        {/* SLIDER PARA ESCOLHER O VALOR DA CONTA */}
        <Box width={300} sx={{ m: "30px  auto" }}>
          <Slider
            aria-label="Default"
            valueLabelDisplay="on"
            min={100}
            max={10000}
            onChange={handleChangeSlide}
          />
        </Box>
        {/* BOTÃO ENVIAR DADOS */}
        <Button variant="outlined" onClick={loadData}>
          Calcular
        </Button>
      </Box>

      {/* BOX de RESPOSTAS A REQUEST */}

      <Box className={styles.boxRequest}>
        {/* SELETOR DE PARCELAS */}
        <Box>
          <Typography
            variant="h3" fontFamily='Roboto Mono'
            sx={{ color: globalColor, mb: "20px", textAlign: "center", fontWeight:'bold', textShadow:'2px 2px 5px rgba(0, 0, 0, .3)' }}
          >
            INVESTIMENTO
          </Typography>
          <Typography
            variant="h6" fontFamily='Roboto Mono'
            sx={{ color: globalColor, mb: "30px", textAlign: "center" }}
          >
            Diversos planos para realizar seu projeto:
          </Typography>
          {parcelas?.map((parcela) => (
            <Box key={i++} className={styles.items}>
              <Typography fontFamily='Roboto Mono'>
                {parcela.parcelas}x de R${parcela.valor_minimo} a R$
                {parcela.valor_maximo}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Box CARDS */}
        <Box className={styles.cardBox}>
          {/* BOX EMPRESAS PARCEIRAS NO LOCAL */}
          <Box className={styles.card}>
            <Typography variant="h6" fontFamily='Roboto Mono'>
              Temos {data?.integradores_regiao} empresas parceiras na sua
              região!
            </Typography>
          </Box>

          {/* Box ECONOMIA */}
          <Box className={styles.card} sx={{ height: "400px"}}>
            <Typography fontFamily = 'Roboto Mono' variant="h6">
              Considerando o tempo de garantia do equipamento, você terá uma
              economia de {data?.economia} reais!
            </Typography>
          </Box>

          {/* BOX POTENCIAL ECOLOGICO */}
          <Box className={styles.card}>
            <Typography variant="h6" fontFamily = 'Roboto Mono'>
              O Potêncial de irradiância da sua região é de {data?.irradiancia}
              Wh/m². O Maior potêncial no Brasil é de 6kwh/m²!
            </Typography>
          </Box>
        </Box>
       {/* BOTÃO ENVIAR DADOS */}
       <Button variant="contained" className={styles.btnConsulta}>
          Faça uma consulta!
        </Button>
      </Box>
    </div>
  );
}

export default App;
