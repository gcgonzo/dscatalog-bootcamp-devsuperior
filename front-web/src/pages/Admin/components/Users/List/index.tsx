import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import {UsersResponse} from 'core/types/User';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import CardLoader from '../Loaders/UserCardLoader';
import { toast } from 'react-toastify';


const List = () => {

    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getUsers = useCallback(() => {
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
            })
    },[activePage])
       
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    
    const handleCreate = () => {
        history.push('/admin/users/create');
    }

    const onRemove = (userId: number) => {
        makePrivateRequest({ url:`/users/${userId}`, method: 'DELETE'})
        .then(() => {
            toast.info('Usuário removido com sucesso!');
            getUsers();
        }).catch(() => {
            toast.error('Erro ao remover o usuário!');
            
        })
    }

    return(
        <div className="admin-users-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
            {isLoadind ? <CardLoader /> : (
                    usersResponse?.content.map(use =>
                        <Card user={use} key={use.id}  onRemove={onRemove}/> 
                    )
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