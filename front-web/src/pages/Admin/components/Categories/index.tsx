import React from 'react';
import  List  from './List';
import  Form  from './Form';
import { Route, Switch } from 'react-router-dom';

const Categories = () => {
    return(
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <List/>
                </Route>
                <Route path="/admin/categories/create">
                    <Form/>
                </Route>
                <Route path="/admin/categories/:categoriesId">
                    <h1>Editar uma categoria</h1>
                </Route>
            </Switch>
        </div>

    );

}

export default Categories;