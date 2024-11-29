import React from "react";

function RestauranteView({ restaurante }) {
    if (!restaurante) {
        return <p>Nenhum restaurante selecionado.</p>;
    }

    return (
        <div>
            <h2>Detalhes do Restaurante</h2>
            <p><strong>Nome:</strong> {restaurante.nomeRestaurante}</p>
            <p><strong>CNPJ:</strong> {restaurante.cnpj}</p>
            <p><strong>Endereço:</strong> {restaurante.endereco}</p>
            <p><strong>Telefone:</strong> {restaurante.telefone}</p>
            <p><strong>E-mail:</strong> {restaurante.email}</p>
            <p><strong>Proprietário:</strong> {restaurante.proprietarioRestaurante}</p>
        </div>
    );
}

export default RestauranteView;
