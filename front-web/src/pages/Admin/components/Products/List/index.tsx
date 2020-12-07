import React, { useEffect, useState, useCallback} from 'react';
import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoader';

const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoadind, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

   const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction : 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true); //iniciar o loader
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);//finalizar o loader
            });
   }, [activePage]);

    useEffect(() => {
       getProducts();
    }, [getProducts]);
   
    const handleCreate = () => {
        history.push('/admin/products/create');

    }

    const onRemove = (productId: number) =>{
        const confirm = window.confirm('Deseja realmente excluir este produto?');
        
        if(confirm){
            makePrivateRequest({url: `/products/${productId}`, method: 'DELETE' })
                .then(() =>{
                    toast.info('Produto removido com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover produto');
                })
        }
    }


    return(
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
                {isLoadind ? <CardLoader /> : (
                    productsResponse?.content.map(product =>(
                        <Card product={product} key={product.id} onRemove={onRemove}/>
                    ))
                )}
               
               {productsResponse && (
                <Pagination
                    totalPages={productsResponse?.totalPages}
                    activePages={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}

            </div>

        </div>
        
    );

}

export default List;