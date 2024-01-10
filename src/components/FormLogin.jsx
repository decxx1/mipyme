'use client'
import { useState } from 'react';
import {api} from '@/src/constants/env.js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import axios from 'axios'
import cookies from 'js-cookie'

export function FormLogin () {
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
      axios.post(api + 'api/login', fields)
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
                    <span style={{color: '#666cff',}}>
                      
                    </span>
                  </span>
                  <span className="app-brand-text demo text-heading fw-bold">Mipyme</span>
                </a>
              </div>
  
              <div className="card-body mt-2">
                <h4 className="mb-2">Bienvenido! 👋</h4>
                <p className="mb-4">Inicie sesión con su cuenta para empezar</p>
  
                <form id="formAuthentication" className="mb-3" method="POST" onSubmit={handleSubmit}>
                  <div className="form-floating form-floating-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="user_name"
                      name="user_name"
                      placeholder="Escriba su usuario"
                      autoFocus />
                    <label htmlFor="user_name">Nombre de usuario</label>
                  </div>
                  <div className="mb-3">
                    <div className="form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type={showPassword ? 'text': 'password'}
                            id="password"
                            className="form-control"
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
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me"> Recuérdame </label>
                    </div>
                    <a href="auth-forgot-password-basic.html" className="float-end mb-1">
                      <span>Olvidó la contraseña?</span>
                    </a>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">Entrar</button>
                  </div>
                </form>
  
                <p className="text-center">
                  <span>¿No tienes cuenta?</span>
                  <Link href="/register">
                  <span> Crear una cuenta</span>
                  </Link>
                </p>
  
              </div>
            </div>
            <img
              alt="mask"
              src="/assets/img/illustrations/auth-basic-login-mask-light.png"
              className="authentication-image d-none d-lg-block"
              data-app-light-img="illustrations/auth-basic-login-mask-light.png"
              data-app-dark-img="illustrations/auth-basic-login-mask-dark.png" />
          </div>
        </div>
      </div>
    )
  }