import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;   
}

const Form = () => {

    const {register, handleSubmit, errors} = useForm<FormState>();
       
    const onSubmit = (data: FormState) => {
            makePrivateRequest({ url: '/users', method: 'POST' , data })
       }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR UM USUARIO">
                <div className="row">                  
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: {value: 5, message: 'O campo tem que ter o mínimo de 5 caracteres'},
                                    maxLength: {value: 20, message: 'O campo tem que ter o máximo de 20 caracteres'}
                                })}
                                name="firstName" 
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Nome"                                
                            />
                            {errors.firstName && (
                            <div className="invalid-feedback d-block" >
                                {errors.firstName.message}
                            </div>                        
                            )}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({ required: "Campo Obrigatório"})}
                                name="lastName"
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Sobrenome"
                            />
                            {errors.lastName && (
                            <div className="invalid-feedback d-block" >
                                {errors.lastName.message}
                            </div>                        
                            )}
                        </div>
                    </div>

                    <div className="col-7">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório"})} 
                                name="email"
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Email"
                            />
                            {errors.email && (
                            <div className="invalid-feedback d-block" >
                                {errors.email.message}
                            </div>                        
                            )}

                        </div>
                    </div>
                    <div className="col-5">
                        <div className="margin-bottom-30">
                            <select
                            className="form-control mb-5"
                            name="role"
                            >
                                <option value="1">Operador</option>
                                <option value="2">Admin</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({ 
                                    required: "Campo Obrigatório",
                                    minLength: {value: 5, message: 'O campo tem que ter o mínimo de 5 caracteres'}
                                })}
                                name="password"
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Digite aqui a senha"
                            />
                            {errors.password && (
                            <div className="invalid-feedback d-block" >
                                {errors.password.message}
                            </div>                        
                            )}

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                               
                                name="Password" 
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Repita aqui a senha"
                            />
                            {errors.password && (
                            <div className="invalid-feedback d-block" >
                                {errors.password.message}
                            </div>                        
                            )}

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