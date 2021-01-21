import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
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

type FormEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>;

const Form = () => {

    const[formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });
    
    const handleOnChange = (event: FormEvent ) => {
       const name = event.target.name;
        const value = event.target.value;
         setFormData(data => ({...data, [name]: value}));
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
           roles: [{ id:formData.role }]
           
        }
       makePrivateRequest({url: '/users', method: 'POST' , data: payload})
       .then(() => {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: ''
            })
       });
        
    }

    return(
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM USUARIO">
                <div className="row">                  
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                name="firstName" 
                                value={formData.firstName}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Nome"
                                onChange={handleOnChange}
                            />

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input 
                                name="lastName"
                                value={formData.lastName}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Sobrenome"
                                onChange={handleOnChange}
                            />

                        </div>
                    </div>

                    <div className="col-7">
                        <div className="margin-bottom-30">
                            <input 
                                name="email"
                                value={formData.email}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Email"
                                onChange={handleOnChange}
                            />

                        </div>
                    </div>
                    <div className="col-5">
                        <div className="margin-bottom-30">
                            <select
                            value={formData.role}
                            className="form-control mb-5"
                            onChange={handleOnChange}
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
                                name="password"
                                value={formData.password}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Digite aqui a senha"
                                onChange={handleOnChange}
                            />

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                name="password" 
                                value={formData.password}
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Repita aqui a senha"
                                onChange={handleOnChange}
                            />

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