import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;   
}

type ParamsType =  {
    userId: string;
}

const Form = () => {

    const {register, handleSubmit, errors, setValue} = useForm<FormState>();
    const history = useHistory();
    const { userId } = useParams<ParamsType>();
    const isEditing = userId !== 'create';
    const formTitle = isEditing ? 'Editar usuário' : 'Cadastrar um usuário'
    
    useEffect(() => {
       if(isEditing){
        makePrivateRequest({ url: `/users/${userId}`})
        .then(response => {
           setValue('firstName', response.data.firstName);
           setValue('lastName', response.data.lastName);
           setValue('email', response.data.email);
           setValue('role', response.data.role);          
    
        })        
       }
    },[userId, isEditing, setValue ]);

       
    const onSubmit = (data: FormState) => {
            makePrivateRequest({ 
                url: isEditing ? `/users/${userId}` : '/users', 
                method: isEditing ? 'PUT' : 'POST', 
                data 
            })
            .then(() => {
                toast.info('Usuário cadastrado com sucesso!');
                history.push('/admin/users');
            }).catch(() => {
                toast.error('Erro ao salvar usuário!');
                
            })
       }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
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
                                ref={register({ 
                                    required: "Campo Obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Entre com email válido !"
                                      }                                  
                                })} 
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