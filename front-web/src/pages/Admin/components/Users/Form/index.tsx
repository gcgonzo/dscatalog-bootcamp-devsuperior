import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makePrivateRequest  } from 'core/utils/request';
import { toast } from 'react-toastify';
import Select from 'react-select';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { Roles } from 'core/types/User';



type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordRepeat:string;
    role: Roles[];   
}

type ParamsType =  {
    userId: string;
}


const Form = () => {

    const {register, handleSubmit, errors, setValue, watch, control} = useForm<FormState>();
    const history = useHistory();
    const { userId } = useParams<ParamsType>();
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [roles, setRoles]=useState<Roles[]>([]);
    const isEditing = userId !== 'create';
    const formTitle = isEditing ? 'Editar usuário' : 'Cadastrar um usuário'
    const password = useRef({});
    password.current = watch("password", "");

    const rol = [
        {
            id: 1,
            authority: 'ROLE_OPERATOR',
            label: 'Operador'           
        },
        {
            id: 2,
            authority: 'ROLE_ADMIN',
            label: 'Admin'
        }
    ]
    
    useEffect(() => {
       if(isEditing){
        makePrivateRequest({ url: `/users/${userId}`})
        .then(response => {
           setValue('firstName', response.data.firstName);
           setValue('lastName', response.data.lastName);
           setValue('email', response.data.email);
           setValue('password', response.data.password);
           setValue('passwordRepeat', response.data.passwordRepeat);
           setValue('roles', response.data.Roles);        
          
        })        
       }
    },[userId, isEditing, setValue ]);

    useEffect(() => {
       makePrivateRequest({ url: '/users' })
       .then(response => setRoles(response.data.content))
       .finally(() => setIsLoadingRoles(false)) 
    }, []);
       
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
                            <Controller
                                as={Select}
                                name="roles"
                                rules={{ required: true}}
                                control={control}
                                options={rol}                                 
                                getOptionLabel={(option: Roles) => option.authority}
                                getOptionValue={(option: Roles) => String(option.id)}                    
                                isLoading={isLoadingRoles}  
                                classNamePrefix="users-select"
                                placeholder="Usuário"
                                isMulti         
                            />                                
                            
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
                                ref={register({ 
                                    required: 'Campo obrigratório',
                                   validate: value =>
                                    (value === password.current ||'As senhas não combinam')
                                })}
                                name="passwordRepeat" 
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Confirme aqui a senha"
                            />
                            {errors.passwordRepeat && (
                            <div className="invalid-feedback d-block" >
                                {errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}
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