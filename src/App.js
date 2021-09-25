import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Api from "./api/api";
import useStyles from "./styles/styles";
import dollar from './assets/dollar.svg'
import team from './assets/team.svg'
import sun from './assets/sun.svg'
import logo from './assets/logo.svg'
import wave from './assets/wave.svg'
import "./styles/style.css";

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
    });
  }

  return (
    <div className='container-geral' >
      <img  src={wave} alt='wave'/>
      <img id='logo' src={logo} alt='logo'/>
      <Typography
        variant="h2"
        component="h1"
        className="title-logo"
        sx={{ mb: "30px", mt: "5px", fontFamily: "Zilla Slab" }}
      >
        SIMULADOR SOLAR
      </Typography>
      <Box component="form" className="box-form" noValidate autoComplete="off">
        {/* INPUT PARA USUARIO COLOCAR O CEP */}

        <TextField
          id="outlined-basic"
          label="CEP"
          variant="outlined"
          onChange={handleChangeInput}
          type="text"
          className="inp-box"
        />

        {/* SELETOR DE ESTRUTURA */}
        <TextField
          id="outlined-select-currency"
          select
          label="Estrutura"
          value={telhado}
          defaultValue=""
          onChange={handleChangeOption}
          className="inp-box"
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
            sx={{ color: "#1335C6" }}
          />
        </Box>
        {/* BOTÃO ENVIAR DADOS */}
        <Button
          variant="contained"
          onClick={loadData}
          sx={{backgroundColor: globalColor}}          
        >
          Calcular
        </Button>
      </Box>

      {/* BOX de RESPOSTAS A REQUEST */}
      <Box className='box-request'>
      <img  src={wave} alt='wave'/>

        {/* OPÇÕES DE PARCELAS */}
        <Box>
          <Typography
            variant="h3"
            fontFamily="Roboto Mono"
            sx={{
              color: globalColor,
              mb: "20px",
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, .3)",
            }}
          >
            INVESTIMENTO
          </Typography>
          <Typography
            variant="h6"
            fontFamily="Roboto Mono"
            sx={{color:globalColor, mb:'15px'}}
          >
            Diversos planos para realizar seu projeto:
          </Typography>
          {parcelas?.map((parcela) => (
            <Box key={i++} className="itens">
              <Typography className="global-font">
                {parcela.parcelas}x de R${parcela.valor_minimo.toFixed(2)} a R$
                {parcela.valor_maximo.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Box CARDS */}
        <Box className="card-box">
          {/* BOX EMPRESAS PARCEIRAS NO LOCAL */}
          <Box className="card">
            <img className='card-img' src={team} alt='team ico'/>
            <Typography variant="h6" fontFamily="Roboto Mono">
              Temos {data?.integradores_regiao} empresas parceiras na sua
              região!
            </Typography>
          </Box>

          {/* Box ECONOMIA */}
          <Box className="card" height="400px">
          <img className='card-img'  src={dollar} alt='dollar ico'/>
            <Typography fontFamily="Roboto Mono" variant="h6">
              Considerando o tempo de garantia do equipamento, você terá uma
              economia de R$ {data?.economia + ",00"}!
            </Typography>
          </Box>

          {/* BOX POTENCIAL ECOLOGICO */}
          <Box className="card">
          <img className='card-img'  src={sun} alt='sun ico'/>
            <Typography variant="h6" fontFamily="Roboto Mono">
              O Potêncial de irradiância da sua região é de{" "}
              {data?.irradiancia / 1000}
              kWh/m². O Maior potêncial no Brasil é de 6kwh/m²!
            </Typography>
          </Box>
        </Box>
        {/* BOTÃO ENVIAR DADOS */}
        <Button variant="contained" className="btn-consult">
          Faça uma consulta!
        </Button>
      </Box>
    </div>
  );
}

export default App;
