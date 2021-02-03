import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'core/types/User';
import './styles.scss';

type Props = {
    user: User ;
    onRemove: (userId: number) => void; 
}

const Card = ({user, onRemove }: Props) => {
    return(
        <div className="card-base user-card-admin">
            <div className="row">
                <div className="col-6 ">
                    <h1 className="user-card-admin">
                       {user.firstName} {user.lastName}
                    </h1>
                    <h5 className="email-card-admin">
                        {user.email}
                    </h5>
                    
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link 
                        to={`/admin/users/${user.id}`}
                        className="btn btn-outline-secondary btn-block border-radius-10 btn-edit "               
                    >
                        EDITAR                
                    </Link>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <button 
                            type="button" 
                            className="btn btn-outline-danger btn-block border-radius-10 "
                            onClick={() => onRemove(user.id)}                          
                    > 
                                EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Card;