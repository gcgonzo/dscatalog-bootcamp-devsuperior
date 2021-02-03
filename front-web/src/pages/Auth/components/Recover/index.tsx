import ButtonIcon from 'core/components/ButtonIcon';
import React  from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

const Recover = () => {
    return(
        <div>
            <AuthCard title="Recuperação">
                <form className="recover-form">
                    <div className="margin-bottom-30 ">
                        <input
                            type="email"
                            className='form-control input-base'
                            placeholder="Digite o Email Cadastrado"
                        >
                        </input>
                    </div >
                    <div className="email">
                        <input
                            type="email"
                            className='form-control input-base'
                            placeholder="Repita o Email Cadastrado"
                        >
                        </input>
                        
                    </div>
                    <div className="col-6 pt-3 pr-5">
                        <Link 
                            to={''}
                                type="button" 
                                className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit"> 
                                CANCELAR
                        </Link>
                    </div>
                    <div className="col-6 pt-3 pr-5">
                        <button 
                            type="button" 
                            className="btn btn-outline-danger btn-block border-radius-10 mb-3"
                            
                        > 
                            ENVIAR
                        </button>

                    </div> 
                   
                </form>
            </AuthCard>
        </div>
    )
}

export default Recover;