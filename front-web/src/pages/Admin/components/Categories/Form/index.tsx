import React from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

const Form = () => {
    return(
        <BaseForm title="CADASTRAR UMA CATEGORIA">
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control input-base" placeholder="Nome da categoria"/>

                </div>

            </div>

        </BaseForm>

    );
}

export default Form;