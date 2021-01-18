import Pagination from 'core/components/Pagination';
import { CategoryResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';

const List = () =>{

    const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
       
    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true); 
        makeRequest({ url: '/categories', params })
            .then(response => setCategoryResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);


    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/categories/create');
    }


    return(
        <div className="admin-categories-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {categoryResponse?.content.map(cat =>
                    <Card category={cat} key={cat.id}/>    
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