import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchLink extends Component {
    static displayName = "Links";

    constructor() {
        super();
        this.state = { links: [], loading: true }
    }

    componentDidMount() {
        this.populalinkData();
    }

    static handleEdit(id) {
        window.location.href = "/link/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o link : " + id)) {
            return;
        }
        else {
            fetch('api/links/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-link";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderLinksTabela(links) {
        return (
                <table id="table1" className='table table-striped' aria-labelledby="tabelLabel">

                    <thead>
                        <th>Título</th>
                        <th>Link</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {links.map(lnk =>
                            <tr key={lnk.id}>
                                <td>{lnk.titulo}</td>
                                <td><a href={lnk.descricao}>{lnk.endereco}</a></td>
                                <td>{lnk.descricao}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm" onClick={(id) => this.handleEdit(lnk.id)}>Editar</button> &nbsp;
                                    <button className="btn btn-outline-danger btn-sm" onClick={(id) => this.handleDelete(lnk.id)}>Deletar</button> &nbsp;
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : FetchLink.renderLinksTabela(this.state.links);

        return (
            <div>
                <h1 id="tabelLabel" >Bem-vindo ao Gerenciador de Links.</h1>
                <p>Adicione links de páginas do seu interesse. Após cadastrar um link você poderá também editar e deletar se precisar.</p>
                <p>
                    <Link to="/add-link">Cadastrar um link</Link>
                </p>
                {contents}
            </div>
        );
    }


    async populalinkData() {
        const response = await fetch('api/Links');
        const data = await response.json();
        this.setState({ links: data, loading: false });
    }

}