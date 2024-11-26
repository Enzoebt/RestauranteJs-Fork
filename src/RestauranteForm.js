import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

function RestauranteForm({ atualizarLista }) {
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const salvarRestaurante = async (e) => {
        e.preventDefault();
        const restaurante = { nomeRestaurante, cnpj, endereco, telefone, email };

        try {
            const response = await fetch('http://localhost:8080/restaurante', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(restaurante)
            });

            if (response.ok) {
                setMensagem('Restaurante cadastrado com sucesso!');
                setNomeRestaurante('');
                setCnpj('');
                setEndereco('');
                setTelefone('');
                setEmail('');
                atualizarLista();
                setFieldErrors({});
            } else {
                const problema = await response.json();
                if (problema.titulo) {
                    setMensagem(problema.titulo);
                }
                if (Array.isArray(problema)) {
                    const errors = {};
                    problema.forEach((campo) => {
                        errors[campo.nome] = campo.mensagem;
                    });
                    setFieldErrors(errors);
                }
            }
        } catch (error) {
            setMensagem('Erro ao conectar ao servidor.');
        }
    };

    return (
        <>
            <form onSubmit={salvarRestaurante} className="p-fluid" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="nomeRestaurante" style={{ fontWeight: 'bold' }}>Nome do Restaurante</label>
                    <InputText id="nomeRestaurante" value={nomeRestaurante}
                        onChange={(e) => setNomeRestaurante(e.target.value)}
                        placeholder="Digite o nome do restaurante"
                        required className="p-inputtext-lg" />
                    {fieldErrors.nomeRestaurante && <Message severity="error" text={fieldErrors.nomeRestaurante} />}
                </div>

                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="cnpj" style={{ fontWeight: 'bold' }}>CNPJ</label>
                    <InputMask id="cnpj" value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        placeholder="Digite o CNPJ do restaurante"
                        required className="p-inputtext-lg"
                        mask="99.999.999/9999-99" />
                    {fieldErrors.cnpj && <Message severity="error" text={fieldErrors.cnpj} />}
                </div>

                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="endereco" style={{ fontWeight: 'bold' }}>Endereço</label>
                    <InputText id="endereco" value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Digite o endereço do restaurante"
                        required className="p-inputtext-lg" />
                    {fieldErrors.endereco && <Message severity="error" text={fieldErrors.endereco} />}
                </div>

                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="telefone" style={{ fontWeight: 'bold' }}>Telefone</label>
                    <InputMask id="telefone" value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite o telefone do restaurante"
                        required className="p-inputtext-lg"
                        mask="(99) 99999-9999" />
                    {fieldErrors.telefone && <Message severity="error" text={fieldErrors.telefone} />}
                </div>

                <div className="p-field" style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
                    <InputText id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail do restaurante"
                        required />
                    {fieldErrors.email && <Message severity="error" text={fieldErrors.email} />}
                </div>

                <Divider />

                <Button label="Cadastrar Restaurante" icon="pi pi-check" type="submit"
                    className="p-button-rounded p-button-lg" />

                {mensagem && (
                    <Message severity="success" text={mensagem} style={{ marginTop: '20px' }} />
                )}

                {fieldErrors.global && (
                    <Message severity="error" text={fieldErrors.global} style={{ marginTop: '20px' }} />
                )}
            </form>
        </>
    );
}

export default RestauranteForm;
