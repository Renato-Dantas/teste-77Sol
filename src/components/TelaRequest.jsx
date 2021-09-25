import dollar from "../assets/dollar.svg";
import team from "../assets/team.svg";
import sun from "../assets/sun.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import BoxCard from "./BoxCard";
import OpcoesParcelas from "./OpcoesParcelas";
import { Spring } from "react-spring";

const globalColor = "#1335C6";
var i = 0;

const TelaRequest = ({ parcelas, data }) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 1000 }}>
      {(props) => (
        <div style={props}>
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
                <OpcoesParcelas
                  key={i++}
                  texto={`${
                    parcela.parcelas
                  }x de R$ ${parcela.valor_minimo.toFixed(2)} a R$
                ${parcela.valor_maximo.toFixed(2)}`}
                />
              ))}
            </Box>

            {/* Box CARDS */}
            <Box className="card-box">
              {/* BOX EMPRESAS PARCEIRAS NO LOCAL */}
              <BoxCard
                texto={`Temos ${data?.integradores_regiao} empresas parceiras na sua
              região!`}
                img={team}
                altImg={"team ico"}
              />

              {/* Box ECONOMIA */}
              <BoxCard
                img={dollar}
                altImg={"dollar ico"}
                texto={`Considerando o tempo de garantia do equipamento, você terá uma
              economia de R$ ${data?.economia + ",00"}!`}
                h="400px"
              />

              {/* BOX POTENCIAL ECOLOGICO */}
              <BoxCard
                img={sun}
                altImg="sun ico"
                texto={`O Potêncial de irradiância da sua região é de
              ${
                data?.irradiancia / 1000
              }kWh/m². O Maior potêncial no Brasil é de 6kwh/m²!`}
              />
            </Box>
            {/* BOTÃO ENVIAR DADOS */}
            <a
              href="https://www.77sol.com.br/financiamentos"
              target="_blank"
              className="link"
            >
              <Button variant="contained" className="btn-consult">
                Faça uma consulta!
              </Button>
            </a>
          </Box>
        </div>
      )}
    </Spring>
  );
};

export default TelaRequest;
