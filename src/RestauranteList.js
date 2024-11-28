import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import RestauranteForm from "./RestauranteForm";
import RestauranteView from "./RestauranteView";

function RestauranteList() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("list"); // "list", "form", "view"
    const [selectedRestaurante, setSelectedRestaurante] = useState(null);

    const listarRestaurantes = async () => {
        try {
            const response = await fetch("http://localhost:8080/restaurante");
            if (!response.ok) {
                throw new Error("Erro ao carregar restaurantes");
            }
            const data = await response.json();
            setRestaurantes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarRestaurantes();
    }, []);

    const handleViewRestaurante = (restaurante) => {
        setSelectedRestaurante(restaurante); // Define o restaurante selecionado
        setActiveComponent("view"); // Altera para a tela de visualização
    };

    return (
        <div>
            <Panel header="Restaurantes">
                <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                    {activeComponent === "list" && (
                        <Button
                            label="Cadastrar Novo Restaurante"
                            icon="pi pi-plus"
                            onClick={() => setActiveComponent("form")}
                        />
                    )}

                    {activeComponent !== "list" && (
                        <Button
                            label="Voltar à Lista"
                            icon="pi pi-arrow-left"
                            onClick={() => {
                                setActiveComponent("list");
                                setSelectedRestaurante(null); // Limpa o restaurante selecionado
                            }}
                        />
                    )}
                </div>

                {loading && <ProgressSpinner />}
                {error && <p>Erro: {error}</p>}

                {activeComponent === "list" && (
                    <DataTable value={restaurantes} paginator rows={5} tableStyle={{ minWidth: "50rem" }}>
                        <Column field="nomeRestaurante" header="Nome do Restaurante" style={{ width: "25%" }} />
                        <Column field="cnpj" header="CNPJ" style={{ width: "25%" }} />
                        <Column field="endereco" header="Endereço" style={{ width: "25%" }} />
                        <Column
                            header="Ações"
                            body={(rowData) => (
                                <Button
                                    label="Ver Detalhes"
                                    icon="pi pi-eye"
                                    onClick={() => handleViewRestaurante(rowData)} // Define o restaurante selecionado
                                />
                            )}
                            style={{ width: "15%" }}
                        />
                    </DataTable>
                )}

                {activeComponent === "form" && <RestauranteForm />}
                {activeComponent === "view" && <RestauranteView restaurante={selectedRestaurante} />}
            </Panel>
        </div>
    );
}

//Works!!!

export default RestauranteList;
