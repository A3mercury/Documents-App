import React, { Component } from 'react';

export default class ReactApp extends Component {
    constructor() {
        super();
        this.state = {
            documents: [],
            name: '',
            description: '',
            data: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.state.data = React.createRef();
    }

    componentDidMount() {
        this.getDocuments();
    }

    handleChange(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/api/document/store', {
            method: 'POST',
            body: data
        })
            .then(response => {
                this.getDocuments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteDocument(document) {
        const data = new FormData();
        data.append('document', document.id);
        console.log(data);
        fetch('/api/document/delete', {
            method: 'POST',
            body: data
        })
            .then(response => {
                this.getDocuments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getDocuments() {
        fetch('/api/documents')
            .then(response => response.json())
            .then(response => {
                this.setState({ documents: response.documents });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getImageType(document) {
        if (document.image_type == 'application/pdf') {
            return <a href={document.image}>View PDF</a>;
        } else {
            return <a href={document.image}><img src={document.image} width="100" /></a>;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Document Name</label>
                                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange('name')} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleChange('description')}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Select Document</label><br />
                                        <input name="file_data" type="file" ref={this.state.data} />
                                    </div>
                                    <div className="form-group text-right">
                                        <button type="submit" className="btn btn-primary">Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                        <table className="table table-default table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Preview</th>
                                    <th>Document Name</th>
                                    <th className="text-right" width="200">Upload Date</th>
                                    <th>Description</th>
                                    <th width="20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.documents.map(document => {
                                    return (
                                        <tr key={document.id}>
                                            <td>{document.id}</td>
                                            <td>{this.getImageType(document)}</td>
                                            <td>{document.name}</td>
                                            <td className="text-right">{document.created}</td>
                                            <td>{document.description}</td>
                                            <td className="text-right">
                                                <button className="btn btn-sm btn-danger" onClick={() => {this.deleteDocument(document)}}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
