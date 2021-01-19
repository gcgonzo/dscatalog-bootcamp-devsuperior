import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {UsersResponse} from 'core/types/User';
import Card from '../Card';
import Pagination from 'core/components/Pagination';


const List = () =>{

    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

       
    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true); 
        makePrivateRequest({ url: '/users', params })
            .then(response => setUsersResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);
    
    const handleCreate = () => {
        history.push('/admin/users/create');
    }

    return(
        <div className="admin-users-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {usersResponse?.content.map(use =>
                        <Card user={use} key={use.id} />                      
                )}
                {usersResponse && (
                <Pagination
                    totalPages={usersResponse?.totalPages}
                    activePages={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
               
            </div>
        </div>
    );
}

export default List;