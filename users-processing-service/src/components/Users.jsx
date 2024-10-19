import { useState, useEffect } from 'react';

import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';

import axios from 'axios';

const Component = styled(Box)`
    width: 80%;
    margin: 50px auto;
    & > h4 {
        margin-bottom: 20px;
    }
    & > div > table > thead {
        background-color: #000;
    }
    & > div > table > thead > tr > th {
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
    }
    & > div > table > tbody > tr > td {
        font-size: 16px;
    }
`;

const Users = () => {

    const [users, setUsers] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    // console.log(API_URL)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL);
            console.log(response)
            console.log(JSON.parse(response.data.body).Items)
            setUsers(JSON.parse(response.data.body).Items);
        }
        getData();
        console.log(users)
    }, [])

    const removeEntry = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    }

    return (
        <Component>
            <Typography variant="h4">Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id.N}>
                                    <TableCell>{user.id.N}</TableCell>
                                    <TableCell>{user.name.S}</TableCell>
                                    <TableCell>{user.email.S}</TableCell>
                                    <TableCell>{user.phone.N}</TableCell>
                                    <TableCell>{user.salary.N}</TableCell>
                                    <TableCell>{user.age.N}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={() => removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    )
}

export default Users;