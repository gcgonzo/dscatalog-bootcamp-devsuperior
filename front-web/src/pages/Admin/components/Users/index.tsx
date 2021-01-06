import React from 'react';
import { Route, Switch } from 'react-router-dom';
import  List  from './List';
import  Form  from './Form';

const Users = () => {
    return(
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <List/>
                </Route>
                <Route path="/admin/users/create">
                    <Form />
                </Route>
                <Route path="/admin/users/:usersId">
                    <h1>Editar um usuários</h1>
                </Route>
            </Switch>
        </div>

    );

}

export default Users;