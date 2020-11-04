import React from 'react';
import { isAllowedByRole, isAuthenticated, Role} from 'core/utils/auth';
import { Redirect, Route } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    path: string;
    allewdRoutes?: Role[];
}

const PrivateRoute = ({ children, path, allewdRoutes }: Props) => {


    return (
        <Route
            path={path}
            render={({ location }) => {
                if (!isAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/admin/auth/login',
                                state: { from: location }
                            }}
                        />
                    )
                } else if (isAuthenticated() && !isAllowedByRole(allewdRoutes) ) {
                    return (
                        <Redirect to={{ pathname: '/admin' }} />
                    )
                }

                return children;

            }}
        />
    );
}

export default PrivateRoute;