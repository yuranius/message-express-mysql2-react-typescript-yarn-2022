import React, {ChangeEvent, useState} from "react"
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import AlertForm from "../../components/Alert";


type AuthPageProps = {
    changeHandler: React.FormEventHandler<HTMLElement>,
    loginHandler:React.MouseEventHandler<HTMLButtonElement>,
    registerHandler: React.MouseEventHandler<HTMLButtonElement>,
    loading:boolean,
    setShow(isShow: boolean): void,
    alertMessage: string,
    show: boolean
}



export const AuthPage: React.FC<AuthPageProps> = ({changeHandler, loginHandler, registerHandler, loading, setShow, alertMessage, show }) => {


    return (
        <Container className='d-flex justify-content-center align-items-center flex-column' style={{height: window.innerHeight - 100}}>
            <Card className='p-5'>
                <h1 style={{maxWidth:'100%', textAlign:"center"}}>Общайся 📨️, улыбайся 😃️, <br/> иди навстречу новому 🏆️!!!</h1>
                {/*<div className="card blue darken-1">*/}
                {/*    <div className="card-content white-text">*/}
                {/*        <span className="card-title">Авторизация</span>*/}

                {/*        <div className="input-field">*/}
                {/*            <input type="text" className="yellow-input" id="email" placeholder="Введите email" onChange={ changeHandler } />*/}
                {/*            <label htmlFor="email">Email</label>*/}
                {/*        </div>*/}

                {/*        <div className="input-field">*/}
                {/*            <input type="password" className="yellow-input" id="password" placeholder="Введите пароль" onChange={ changeHandler }/>*/}
                {/*            <label htmlFor="password">Password</label>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="card-action">*/}
                {/*        <button */}
                {/*        className="btn yellow darken-4" */}
                {/*        style={{marginRight:10}}*/}
                {/*        onClick={loginHandler}*/}
                {/*        disabled={loading} */}
                {/*        >Войти</button>*/}
                {/*        <button */}
                {/*        className="btn grey lighten-1 black-text"*/}
                {/*        onClick={registerHandler}*/}
                {/*        disabled={loading} */}
                {/*        >Регистрация</button>*/}
                {/*    </div>*/}

                {/*</div>*/}

                <Form className='mt-5 m-auto' style={{width: 500}}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control type="email" placeholder="Введите email..." onChange ={ changeHandler } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль..." onChange ={ changeHandler } />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Button
                            style={{marginRight:10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти</Button>
                        <Button
                            variant={"warning"}
                            onClick={registerHandler}
                            disabled={loading}
                        >Регистрация</Button>
                    </Form.Group>
                    {show && <AlertForm variant={"danger"} setShow={setShow}  heading={alertMessage} />}
                </Form>
            </Card>
        </Container>
    )
}