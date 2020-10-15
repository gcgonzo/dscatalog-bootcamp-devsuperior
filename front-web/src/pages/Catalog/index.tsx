import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/ProductCard/Loaders/ProductCardLoader';

const Catalog = () => {
    // quando o componente iniciar, buscar a lista de produtos
    //quando a lista de produtos estiver disponível,
    const [productsResponse, setProductsResponse] = useState <ProductsResponse>();
    const [isLoadind, setIsLoading] = useState(false);

    console.log(productsResponse);
    
    //popular um estado no componente, e listar os produtos dinâmicamente
    
    useEffect(() => {
       const params = {
           page: 0,
           linesPerPage: 12
       }
        setIsLoading(true); //iniciar o loader
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() =>{
                setIsLoading(false);//finalizar o loader
            });
    }, []);
    
    return(
        <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de produtos
        </h1>
        <div className="catolog-products">
            {isLoadind ? <ProductCardLoader /> : (
                productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product}/>
                    </Link>
                ))

            )}
           
        </div>
   </div>
);
   
}
  

export default Catalog;