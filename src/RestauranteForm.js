import { useState } from "react";




function RestauranteForm(){
    const [nomeRestaurante, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const salvarRestaurante = async (e) =>{
        e.preventDefault();
        const restaurante = {nomeRestaurante,cnpj,telefone}
    }


    return(
        <>
        


        
        </>

    );
}

export default RestauranteForm;