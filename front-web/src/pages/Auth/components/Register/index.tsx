import ButtonIcon from 'core/components/ButtonIcon';
import React  from 'react';
import AuthCard from '../Card';
import './styles.scss';

const Register = () => {
    return(
        <div>
            <AuthCard title="Cadastro">
                <form className="register-form">
                    <div className="margin-bottom-30 ">
                        <input
                            type="text"
                            className='form-control input-base'
                            placeholder="Nome"
                        >
                        </input>
                    </div >
                    <div className="margin-bottom-30">
                        <input
                            type="text"
                            className='form-control input-base'
                            placeholder="Sobrenome"
                        >
                        </input>
                    </div>
                    <div className="margin-bottom-30">                        
                        <input
                            type="email"
                            className='form-control input-base'
                            placeholder="Email"
                        >
                        </input>
                    </div>
                    <div className="margin-bottom-30">
                        <input
                            type="password"
                            className='form-control input-base'
                            placeholder="Digite aqui a Senha"
                        >
                        </input>
                        <h3 className="text-password">A sua senha deve ter pelo menos 8 caracteres e conter pelo menos<br/> uma número</h3>
                    </div>
                    <div>
                        <input
                            type="rePassword"
                            className='form-control input-base'
                            placeholder="Repita aqui a Senha"
                        >
                        </input>
                        <div className="login-submit">
                            <ButtonIcon text="Cadastrar" />
                        </div>
                    </div>
                </form>
            </AuthCard>
        </div>
    )
}

export default Register;