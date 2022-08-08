import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
} from 'react-bootstrap';

const url = 'http://localhost:3000/users/';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((users) => {
                setUsers(users);
            });
    };

    const addRow = (userName, email) => {
        const json = { userName, email };
        fetch(url, {
            body: JSON.stringify(json),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(fetchUsers);
    };

    const deleteRow = (id) => {
        const targetUrl = url + id;
        fetch(targetUrl, {
            method: 'DELETE',
        }).then(fetchUsers);
    };

    return (
        <div>
            <UserAddForm addRow={addRow} />
            <Table className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((row, index) => {
                        const { id, userName, email } = row;
                        return (
                            <UserRow
                                key={index}
                                id={id}
                                userName={userName}
                                email={email}
                                deleteRow={deleteRow}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

const UserRow = (props) => {
    return (
        <tr>
            <td>{props.userName}</td>
            <td>{props.email}</td>
            <td>
                <Button onClick={() => props.deleteRow(props.id)}>X</Button>
            </td>
        </tr>
    );
};

const UserAddForm = (props) => {
    const [form, setForm] = useState({
        userName: '',
        email: '',
    });

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { userName, email } = form;
        props.addRow(userName, email);
        setForm({ userName: '', email: '' });
    };

    return (
        <div>
            <legend>ユーザー追加</legend>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <FormLabel htmlFor="userNameInput">Name</FormLabel>
                    <FormControl
                        id="userNameInput"
                        name="userName"
                        type="text"
                        onChange={handleInputChange}
                        value={form.userName}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel htmlFor="emailInput">E-mail</FormLabel>
                    <FormControl
                        id="emailInput"
                        name="email"
                        type="email"
                        onChange={handleInputChange}
                        value={form.email}
                    />
                </FormGroup>
                <Button type="submit" variant="primary">
                    追加
                </Button>
            </Form>
        </div>
    );
};

export default UserList;
