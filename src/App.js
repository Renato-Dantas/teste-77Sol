import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "./api/api";
import logo from "./assets/logo.svg";
import wave from "./assets/wave.svg";
import "./styles/style.css";
import TelaInical from "./components/TelaInicial";
import TelaRequest from "./components/TelaRequest";

function App() {

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

  async function loadData() {
    Api({ telhado, valorConta, cep }).then((data) => {
      setData(data);

      var screenCalc = document.getElementsByClassName("box-request");
      var screenForm = document.getElementsByClassName("box-form");

      if (data?.parcelamento) {
        screenCalc[0].style.opacity = "1";
        screenForm[0].style.display = "none";
      }else {
        setIsInpError(true);
        alert("Preencha corretamente todos os campos!");
      }
    });
  }

  return (
    <div className="container-geral">
      <div className='container-logo'>
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
      </div>
      <TelaInical
        loadData={loadData}
        handleChangeInput={handleChangeInput}
        isInpError={isInpError}
        telhado={telhado}
        handleChangeOption={handleChangeOption}
        handleChangeSlide={handleChangeSlide}
        setCep={setCep}
        valorConta={valorConta}
      />
      <TelaRequest parcelas={parcelas} data={data} setData={setData} setCep={setCep} setTelhado={setTelhado}/>
    </div>
  );
}

export default App;
