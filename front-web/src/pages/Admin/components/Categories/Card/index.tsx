import { Category } from 'core/types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    category: Category;
    onRemove:(categoriesId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {
    return(
    <div className="card-base category-card-admin">
        <div className="row">
            <div className="col-6 text-left py-3">
                <h1 className="category-card-admin">
                    {category.name}
                </h1>
            </div>
            <div className="col-3 pt-4 pr-5">
                <Link 
                    to={`/admin/categories/${category.id}`}
                    className="btn btn-outline-secondary btn-block border-radius-10 btn-edit"               
                >
                    EDITAR                
                </Link>


            </div>
            <div className="col-3 pt-4 pr-5">
                <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 "
                        onClick={() => onRemove(category.id)}                           
                > 
                            EXCLUIR
                        </button>
            </div>        
        </div>   
    </div>        
    )
}

export default Card;