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
                <Route path="/admin/categories/:categoriesId">
                    <Form/>
                </Route>
            </Switch>
        </div>

    );

}

export default Categories;