import React, { Component } from 'react';

export default class ReactApp extends Component {
    constructor() {
        super();
        this.state = {
            documents: [],
            documentTypes: [],
            searchText: '',
            typeSearch: '',
            name: '',
            description: '',
            data: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.handleNameSearch = this.handleNameSearch.bind(this);
        this.handleTypeSearch = this.handleTypeSearch.bind(this);
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

    handleNameSearch(event) {
        var state = {};
        state['searchText'] = '';
        return function (e) {
            var searchText = e.target.value;
            state['searchText'] = searchText;
            this.setState(state, function (s) {
                this.search();
            });
        }.bind(this);
    }

    handleTypeSearch(event) {
        console.log('changed: ' + event.target.value);
        var state = {};
        state['typeSearch'] = event.target.value;
        this.setState(state, function (s) {
            this.search();
        });
    }

    search() {
        console.log(this.state);
        var state = {};
        var docs = this.state.documents;

        docs.map(function (doc) {
            var visible = true;
            
            if (this.state.typeSearch !== '' && this.state.searchText !== '') {
                console.log('0');
                visible = doc.type === this.state.typeSearch && doc.name.search(this.state.searchText) >= 0;
            } else if (this.state.typeSearch !== '' && this.state.searchText === '') {
                console.log('1');
                visible = doc.type === this.state.typeSearch;
            } else if (this.state.searchText !== '' && this.state.typeSearch === '') {
                console.log('2');
                visible = doc.name.search(this.state.searchText) >= 0;
            } else {
                console.log('3');
                visible = true;
            }

            doc.isVisible = visible;
            return doc;
        }, this);

        this.setState(state);
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
                var state = {};
                state['documents'] = response.documents;
                state['documentTypes'] = response.documents.map(function (doc) {
                    return doc.type;
                }).filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                });
                this.setState(state);
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                this.search();
            });
    }

    getImageType(document) {
        if (document.type == 'pdf') {
            return <a href={document.image}>View PDF</a>;
        } else {
            return <a href={document.image}><img src={document.image} width="100" /></a>;
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                        <h1>Document Uploader App</h1><span className="text-muted text-small">by: Austin Andrews</span>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Search by Name</label>
                            <input type="text" 
                                   name="search_name" 
                                   className="form-control" 
                                   placeholder="Search..." 
                                   value={this.state.searchText}
                                   onChange={this.handleNameSearch('search')} />
                        </div>
                        <div className="form-group">
                            <label>Search by Type</label>
                            <select name="search_type" 
                                    className="form-control" 
                                    value={this.state.typeSearch} 
                                    onChange={this.handleTypeSearch}>
                                <option value="">-----</option>
                                {this.state.documentTypes.map(type => {
                                    return <option key={type} value={type}>{type}</option>;
                                })}
                            </select>
                        </div>

                        <table className="table table-default table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Preview</th>
                                    <th>Document Name</th>
                                    <th>Type</th>
                                    <th className="text-right" width="200">Upload Date</th>
                                    <th>Description</th>
                                    <th width="20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.documents.map(document => {
                                    return (
                                        <tr key={document.id} style={(!document.isVisible) ? {display: "none"} : {}}>
                                            <td>{this.getImageType(document)}</td>
                                            <td>{document.name}</td>
                                            <td className="text-center">{document.type}</td>
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
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                Upload a new Document
                            </div>
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
            </div>
        );
    }
}
