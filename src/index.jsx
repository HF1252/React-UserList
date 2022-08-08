import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import UserList from './component/userList';

const App = () => {
    return (
        <Container>
            <h1>Hello React!</h1>
            <p className="lead">Reactで作成した最初のページです。</p>
            <UserList />
        </Container>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
