import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Card = () => {
    return(
        <div className="card-base user-card-admin">
            <div className="row">
                <div className="col-6 ">
                <h1 className="user-card-admin">user</h1>
                <h5 className="email-card-admin">gilnei@gmail.com</h5>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link 
                        to=''
                        className="btn btn-outline-secondary btn-block border-radius-10 btn-edit "               
                    >
                        EDITAR                
                    </Link>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <button 
                            type="button" 
                            className="btn btn-outline-danger btn-block border-radius-10 "
                                                      
                    > 
                                EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Card;