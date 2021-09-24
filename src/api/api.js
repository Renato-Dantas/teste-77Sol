async function Api({telhado, valorConta, cep}){
    const response = await fetch(`https://api.77sol.com.br/busca-cep?estrutura=${telhado}&valor_conta=${valorConta}&cep=${cep}`)
    const data = await response.json();
    return data;
} 

export default Api;