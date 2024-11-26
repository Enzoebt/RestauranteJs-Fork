import React, { useEffect, useState } from "react";
import {Panel} from "primereact/panel";
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import RestauranteForm from "./RestauranteForm";



    function RestauranteList(){

        const [restaurantes, setRestaurante] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [isAdding, setIsAdding] = useState(false);

        const listarRestaurante = async () => {
            try {
            const restaurantesResponse = await fetch('http://localhost:8080/restaurante');
                if (!restaurantesResponse.ok) {
                    throw new Error('Falha na Requisição');
                }
                const dataRestaurante = await restaurantesResponse.json();
                setRestaurante(dataRestaurante);   
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            listarRestaurante();
        },[]);
        
            const salvarAtualizar = async() =>{
                await listarRestaurante();
                setIsAdding(false);
            }
        
            return (
                <div>
                    <Panel header={ isAdding ? "Restaurantes Cadastrados" : "Restaurante Cadastrados"}> 
                        <div style={{marginBottom: '20px', textAlign:'left'}}>
                            <Button label={ isAdding ? "Ver lista de Restaurante" : "Cadastrar Novo Restaurante"}    
                                icon={ isAdding? "pi pi-arrow-left" : "pi pi-plus"}
                                onClick={() => setIsAdding(!isAdding)} />
                        </div>  
                    {loading && <ProgressSpinner />}  
                    {isAdding ? (<RestauranteForm />) : 
                    (
                        <>
                            {!loading && !error && (<DataTable value={restaurantes} paginator rows={5} 
                                rowsPerPageOptions={[5, 10, 25, 50]} 
                                tableStyle={{ minWidth: '50rem' }}>
                                <Column field="nomeRestaurante" header="Nome do Restaurante" style={{ width: '25%' }}></Column>
                                <Column field="cnpj" header="CNPJ" style={{ width: '25%' }}></Column>
                                <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
                                <Column field="telefone" header="Telefone" style={{ width: '25%' }}></Column>
                                <Column field="email" header="E-mail" style={{ width: '25%' }}></Column>
                            </DataTable>)} 
                        </>
                    )}   
                    
                    </Panel>
                </div>
            );
    }   

    export default RestauranteList;