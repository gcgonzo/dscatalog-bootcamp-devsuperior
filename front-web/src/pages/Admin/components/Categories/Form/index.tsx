import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;   
}

type ParamsType = {
    categoriesId: string;
}

const Form = () => {
    const{register, handleSubmit, errors, setValue} = useForm<FormState>();
    const history = useHistory();
    const {categoriesId} = useParams<ParamsType>();
    const isEditing = categoriesId !== 'create';
    const formTitle = isEditing ? 'Editar Categoria': 'Cadastrar uma Categoria'

    useEffect(() =>{
        if(isEditing) {
            makeRequest({url: `/categories/${categoriesId}`})
        .then(response => {
            setValue('name', response.data.name);
        })
        }

    }, [categoriesId, isEditing, setValue]);
   
    const onSubmit = (data: FormState) =>{
        makePrivateRequest({ 
            url: isEditing ? `/categories/${categoriesId}` : '/categories', 
            method: isEditing ? 'PUT' : 'POST', 
            data
        })
        .then(() => {
            toast.info('Categoria salva com sucesso!');
            history.push('/admin/categories');
        })
        .catch(() => {
            toast.error('Erro ao salvar a Categoria!');
        })
    }

    return(

        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}>
                    <div className="row">
                        <div className="col-10">
                            <input 
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: {value: 5, message: 'O campo tem que ter o mínimo de 5 caracteres'},
                                    maxLength: {value: 60, message: 'O campo tem que ter o máximo de 60 caracteres'}
                                })}                            
                                name="name"
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Nome da categoria"
                            
                            />
                            {errors.name && (
                                    <div className="invalid-feedback d-block" >
                                        Campo Obrigatório
                                    </div>                        
                                )}

                        </div>

                    </div>

            </BaseForm>
        </form>
    );
}

export default Form;