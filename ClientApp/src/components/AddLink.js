import React, { Component } from 'react';


export class Link {
    constructor() {
        this.id = 0;
        this.titulo = "";
        this.endereco = "";
        this.descricao = "";
    }
}

export class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", link: new Link(), loading: true };
        this.initialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Links/' + id);
            const data = await response.json();
            this.setState({ title: "Editar o Link", link: data, loading: false });
        }
        else {

            this.state = { title: "Cadastrar um Link", link: new Link(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                {contents}
            </div>
        );
    }


    async handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.link.id) {
            const response = await fetch('api/Links/' + this.state.link.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-link');

            this.buscaInformacoes()
        }
        else {
            const response = await fetch('api/Links/', { method: 'POST', body: data });
            this.props.history.push('/fetch-link');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-link');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.link.id} />
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        Título: <input className="form-control" type="text" name="titulo" defaultValue={this.state.link.titulo} required />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        Link: <input className="form-control" type="url" name="endereco" defaultValue={this.state.link.endereco} placeholder="ex: https://github.com/" required />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        Descrição: <input className="form-control" type="text" name="descricao" defaultValue={this.state.link.descricao} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-outline-success" value={this.state.link.id}>Salvar</button> &nbsp;
                    <button className="btn btn-outline-secondary" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>

        );
    }

}


