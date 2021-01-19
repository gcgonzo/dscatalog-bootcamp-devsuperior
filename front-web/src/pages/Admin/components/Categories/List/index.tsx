import Pagination from 'core/components/Pagination';
import { CategoryResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () =>{

    const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'

        }
        setIsLoading(true); 
        makeRequest({ url: '/categories', params })
            .then(response => setCategoryResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    },[activePage]);
       
    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCreate = () => {
        history.push('/admin/categories/create');
    }
const onRemove = (categoriesId: number) => {
    const confirm = window.confirm('Deseja realmente excluir esta categoria?');
    if(confirm){
        makePrivateRequest({ url: `/categories/ ${categoriesId}`, method: 'DELETE'})
            .then (() => {
                toast.info('Categoria removida com sucesso!');
                getCategories();
            })
            .catch(() => {
                toast.error('Erro ao remover a Categoria!');
        })
    }
}

    return(
        <div className="admin-categories-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {categoryResponse?.content.map(cat =>
                    <Card category={cat} key={cat.id} onRemove={onRemove}/>    
                )}  
                {categoryResponse && (
                <Pagination
                    totalPages={categoryResponse?.totalPages}
                    activePages={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}



            </div>

        </div>
    );
}

export default List;