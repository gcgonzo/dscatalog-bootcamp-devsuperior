import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;   
}

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: ''
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData
        }
        makePrivateRequest({ url: '/categories', method:'POST', data: payload})
        .then(() => {
            setFormData({name: ''});
        });
    }
    

    return(

        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UMA CATEGORIA">
                <div className="row">
                    <div className="col-10">
                        <input 
                            value={formData.name}
                            name="name"
                            type="text" 
                            className="form-control input-base" 
                            placeholder="Nome da categoria"
                            onChange={handleOnChange}
                        />

                    </div>

                </div>

            </BaseForm>
        </form>
    );
}

export default Form;