import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select'
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useHistory, useParams } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { Category } from 'core/types/Product';


type FormState = {
    name: string;
    price: string;
    description:string;
    imgUrl: string;
    categories: Category[];
   
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar produto' : 'Cadastrar um produto'
    
    
    useEffect(() => {
       if (isEditing){
            makeRequest({ url: `/products/${productId}`})
            .then(response =>{
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('description', response.data.description);
                setValue('imgUrl', response.data.imgUrl);
                setValue('categories', response.data.categories);
                
       
            })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() =>{
        setIsLoadingCategories(true);
        makeRequest({url: '/categories'})
        .then(response => setCategories(response.data.content))
        .finally(() => setIsLoadingCategories(false))


    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data 
        })
        .then(() =>{
            toast.info('Produto Salvo com Sucesso!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar o produto!')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}
            >
                <div className="row">
                    <div className="col-6">
                       <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: {value: 5, message: 'O campo tem que ter o mínimo de 5 caracteres'},
                                    maxLength: {value: 60, message: 'O campo tem que ter o máximo de 60 caracteres'}
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block" >
                                    {errors.name.message}
                                </div>                        
                            )}
                       </div>
                       <div className="margin-bottom-30">
                            <Controller
                                as={Select}
                                name='categories'
                                rules={{ required: true}}
                                control={control}  
                                isLoading={isLoadingCategories}                             
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                placeholder="Categorias"
                                isMulti 
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block" >
                                    Campo Obrigatório
                                </div>                        
                            )}
                       </div>

                         <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório"})}
                                name="price"
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço"
                            />
                             {errors.price && (
                                <div className="invalid-feedback d-block" >
                                    {errors.price.message}
                                </div>                        
                            )}

                        </div>            
                        
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório"})}
                                name="imgUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Imagem do Produto"
                            />
                             {errors.imgUrl && (
                                <div className="invalid-feedback d-block" >
                                    {errors.imgUrl.message}
                                </div>                        
                            )}

                        </div>                       

                    </div>
                    <div className="col-6">
                        <textarea
                            ref={register({ required: "Campo Obrigatório"})}
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />
                        {errors.description && (
                                <div className="invalid-feedback d-block" >
                                    {errors.description.message}
                                </div>                        
                            )}

                    </div>
                </div>
            </BaseForm>
        </form>

    );
}

export default Form;
