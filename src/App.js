import React, {Component} from 'react';
import './App.css';
import {Button} from "./components/Button.js";
import {Table} from "./components/Table.js";
import {Search} from "./components/Search.js";
import logo from './logo.png';

const DEFAULT_QUERY = 'gpt-4';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search_by_date';
const PARAM_SEARCH = 'query=';
const PARAM_TAGS = 'tags=story';
const PARAM_PAGE = 'page=';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }

    setSearchTopStories(result) {
        this.setState({result});
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_TAGS}&${PARAM_PAGE}${page}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    onDismiss(id) {
        function isNotId(item) {
            return item.objectID !== id;
        }

        const updatedList = this.state.result.hits.filter(isNotId);
        this.setState({
            result: {...this.state.result, hits: updatedList}
        })
    }

    render() {
        const {result, searchTerm} = this.state;
        const page = (result && result.page) || 0;
        return (
            <div className="page">
                <div className="interactions">
                    <img className={"logo"} src={logo} alt={"DEV NEWS"}/>
                    <Search value={searchTerm}
                            buttonLabel={'Search'}
                            onChange={this.onSearchChange}
                            onSubmit={this.onSearchSubmit}
                    />
                </div>
                {result &&
                    <Table list={result.hits}
                           onDismiss={this.onDismiss}/>
                }
                <div className={"interactions"}>
                    <Button className={"more-button"} onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        )
    }
}

export default App;
