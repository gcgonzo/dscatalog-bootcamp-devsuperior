import React from 'react';
import { Link } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

const Form = () => {
    return(
        <form>
            <BaseForm title="CADASTRAR UM USUARIO">
                <div className="row">
                  
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Nome"/>

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Sobrenome"/>

                        </div>
                    </div>

                    <div className="col-12">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Email"/>

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Digite aqui a senha"/>

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Repita aqui a senha"/>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <Link to="/admin/users/create" className="">
                                A sua senha deve ter pelo menos 8 caracteres e conter pelo menos uma número
                            </Link>
                        </div>
                    </div>

                </div>

            </BaseForm>
        </form>
    );
}

export default Form;