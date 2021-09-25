import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Api from "./api/api";
import dollar from "./assets/dollar.svg";
import team from "./assets/team.svg";
import sun from "./assets/sun.svg";
import logo from "./assets/logo.svg";
import wave from "./assets/wave.svg";
import "./styles/style.css";
import TelaInical from "./components/TelaInicial";

function App() {
  var i = 0;

  const globalColor = "#1335C6";

  const [data, setData] = useState();

  const [parcelas, setParcelas] = useState();

  const [telhado, setTelhado] = useState("");

  const [cep, setCep] = useState();

  const [valorConta, setValorConta] = useState(100);

  const [isInpError, setIsInpError] = useState(false);

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

  async function loadData() {
    Api({ telhado, valorConta, cep }).then((data) => {
      setData(data);
      var screenCalc = document.getElementsByClassName("box-request");
      var screenForm = document.getElementsByClassName("box-form");

      if (data?.parcelamento) {
        screenCalc[0].style.display = "flex";
        screenForm[0].style.display = "none";
      } else {
        setIsInpError(true);
        alert("Preencha todos os campos para ver o cálculo!");
      }
    });
  }

  function onHandleRestart() {
    document.location.reload(true);
  }

  return (
    <div className="container-geral">
      <img src={wave} alt="wave" />
      <img id="logo" src={logo} alt="logo" />
      <Typography
        variant="h2"
        component="h1"
        className="title-logo"
        sx={{ mb: "30px", mt: "5px", fontFamily: "Zilla Slab" }}
      >
        SIMULADOR SOLAR
      </Typography>
      <TelaInical
        loadData={loadData}
        handleChangeInput={handleChangeInput}
        isInpError={isInpError}
        telhado={telhado}
        handleChangeOption={handleChangeOption}
        handleChangeSlide={handleChangeSlide}
      />

      {/* BOX de RESPOSTAS A REQUEST */}
      <Box className="box-request">
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
            sx={{ color: globalColor, mb: "15px" }}
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
            <img className="card-img" src={team} alt="team ico" />
            <Typography variant="h6" fontFamily="Roboto Mono">
              Temos {data?.integradores_regiao} empresas parceiras na sua
              região!
            </Typography>
          </Box>

          {/* Box ECONOMIA */}
          <Box className="card" height="400px">
            <img className="card-img" src={dollar} alt="dollar ico" />
            <Typography fontFamily="Roboto Mono" variant="h6">
              Considerando o tempo de garantia do equipamento, você terá uma
              economia de R$ {data?.economia + ",00"}!
            </Typography>
          </Box>

          {/* BOX POTENCIAL ECOLOGICO */}
          <Box className="card">
            <img className="card-img" src={sun} alt="sun ico" />
            <Typography variant="h6" fontFamily="Roboto Mono">
              O Potêncial de irradiância da sua região é de{" "}
              {data?.irradiancia / 1000}
              kWh/m². O Maior potêncial no Brasil é de 6kwh/m²!
            </Typography>
          </Box>
        </Box>
        {/* BOTÃO ENVIAR DADOS */}
        <Button
          variant="contained"
          className="btn-consult"
          onClick={onHandleRestart}
        >
          Faça uma consulta!
        </Button>
      </Box>
    </div>
  );
}

export default App;
