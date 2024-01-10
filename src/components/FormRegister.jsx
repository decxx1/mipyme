'use client'
import { useState } from 'react';
import {api} from '@/src/constants/env.js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import cookies from 'js-cookie'

export function FormRegister () {
    const router = useRouter()
    //hacer visible el password
    const [showPassword, setShowPassword] = useState(false);
    const eye = `mdi ${showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }`;
   
    const handleSubmit = (event) => {
      //detener submit
      event.preventDefault()
      //obtener valores de los inputs
      const fields = Object.fromEntries(new window.FormData(event.target))
      //enviarle al servidor las credenciales
      axios.post(api + 'api/register', fields)
      .then(response => {
          //obtener el token y guardarlo en cookies
          cookies.set("jwt", response.data.token, {sameSite: 'None', secure: true});
          //redirigir al dashboard
          router.push('/dashboard')
      })
      .catch(error => {
          console.error(error)
          //logica de errores, si no se encuentra el mensaje del backend, manda "error desconocido"
          if (error.response && error.response.data && error.response.data.message) {
              const errorMessage = error.response.data.message;
              console.error(errorMessage);
              toast.error(errorMessage);
          } else {
              console.error(error);
              toast.error('Error desconocido');
          }
      })
    }



    return(
      <div className="position-relative">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-4">
            <div className="card p-2">
              <div className="app-brand justify-content-center mt-5">
                <a className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    <span style={{color: 'var(--bs-primary)'}}>
                     
                    </span>
                  </span>
                  <span className="app-brand-text demo text-heading fw-bold">Mipyme</span>
                </a>
              </div>
              
              <div className="card-body mt-2">
                <h4 className="mb-2">Registro</h4>
                <p className="mb-4">Cree una nueva cuenta</p>

                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit} method="POST">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating form-floating-outline mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          placeholder="Escriba su nombre"
                          autoFocus />
                        <label htmlFor="first_name">Nombre</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating form-floating-outline mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          placeholder="Escriba su apellido"
                          autoFocus />
                        <label htmlFor="last_name">Apellido</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating form-floating-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="user_name"
                      name="user_name"
                      placeholder="Escribe tu usuario"
                      autoFocus />
                    <label htmlFor="user_name">Usuario</label>
                  </div>
                  <div className="form-floating form-floating-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Escriba su E-mail"
                    />
                    <label htmlFor="email">E-mail</label>
                  </div>
                  <div className="row mb-3 form-password-toggle">
                    <div className="col-md-6 form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type={showPassword ? 'text': 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            aria-describedby="password" />
                          <label htmlFor="password">Contraseña</label>
                        </div>
                        <span onClick={() => setShowPassword(!showPassword)} className="input-group-text cursor-pointer">
                            <i className={eye}></i>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type={showPassword ? 'text': 'password'}
                            className="form-control"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Repetir contraseña"
                            aria-describedby="password_confirmation" />
                          <label htmlFor="password_confirmation">Repetir contraseña</label>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                      <label className="form-check-label" htmlFor="terms-conditions">
                        Acepto
                        <a href="#"> Políticas de privacidad</a>
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary d-grid w-100">Registrar</button>
                </form>

                <p className="text-center">
                  <span>¿Ya tienes cuenta?</span>
                  <Link href="/">
                    <span> Inicia Sesión</span>
                  </Link>
                </p>

              </div>
            </div>
            
            <img
              alt="mask"
              src="/assets/img/illustrations/auth-basic-register-mask-light.png"
              className="authentication-image d-none d-lg-block"
              data-app-light-img="illustrations/auth-basic-register-mask-light.png"
              data-app-dark-img="illustrations/auth-basic-register-mask-dark.png" />
          </div>
        </div>
      </div>
    )
  }