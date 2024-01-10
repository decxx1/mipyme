'use client'
import DialogCrud from '@/src/components/DialogCrud'
import { toast } from 'sonner'
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DataTable from '@/src/components/DataTable'

export default function UsersTable ({api, jwt}){

    const userEmpty = {
        id: 0,
        user_name: '',
        first_name: '',
        last_name: '',
        role:'guest',
        email: '',
    }
    const [propsDialog, setPropsDialog] = useState({active:false, title:'', isConfirm:false})
    
    const [user, setUser] = useState(userEmpty)
    const [roles, setRoles] = useState(null)
    
    

    
    
    //guardar usuario
    const handleSubmit = (event) => {
        event.preventDefault()
        if (propsDialog.isConfirm) {
            deleteUser()
        }else{
            const fields = Object.fromEntries(new window.FormData(event.target))
            if(user.id > 0){
                editUser(fields)
            }else{
                createUser(fields)
            }
        }
    }
    //enviar petición para crear usuario en la base de datos
    const createUser = (fields) => {
        axios.post(api + 'api/users', fields, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => {
            console.log('usuario creado');
            toast.success('Usuario creado');
            //actualizar tabla de usuarios
            updateUsers();
            //reiniciar valores del formulario
            resetForm();
            //cerrar modal
            handleCloseDialog();
        })
        .catch(error => {
            console.error(error)
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                console.error(errorMessage);
                toast.error(errorMessage);
            } else {
                console.error(error);
                toast.error('Error desconocido');
            }
        })
        .finally(() => {
            
        });
    }
    //Enviar petición para editar un usuario
    const editUser = (fields) => {
        //console.log(fields)
        axios.put( api + 'api/users/' + user.id, fields, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => {
            console.log('usuario editado');
            toast.success('Usuario editado');
            //actualizar tabla de usuarios
            updateUsers();
            //reiniciar valores del formulario
            resetForm();
            //restablecer el valor de id a 0
            setUser(userEmpty);
            //cerrar modal
            handleCloseDialog();
        })
        .catch(error => {
            console.error(error);
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                console.error(errorMessage);
                toast.error(errorMessage);
            } else {
                console.error(error);
                toast.error('Error desconocido');
            }
        })
        .finally(() => {
            
        });
    }
    const deleteUser = () => {
        axios.delete(api + 'api/users/' + user.id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => {
            console.log('¡Usuario eliminado!');
            toast.success('¡Usuario eliminado!');
        })
        .catch(error => {
            console.log(error);
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                console.error(errorMessage);
                toast.error(errorMessage);
            } else {
                console.error(error);
                toast.error('Error desconocido');
            }
        })
        .finally(() => {
            //actualizar tabla de usuarios
            updateUsers();
            //restablecer el valor de id a 0
            setUser(userEmpty);
            //cerrar modal
            handleCloseDialog();
        });
    }
    //crear petición para cargar los roles
    const getRoles = async () => {
        const response = await fetch(api + 'api/roles',{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const responseData = await response.json();
        setRoles(responseData)
    }
    //abrir Dialog
    const handleOpenDialog = (user, titleDialog, deletingDialog) => {
        setPropsDialog({active:true, title:titleDialog, isConfirm:deletingDialog})
        setUser(user)
    }
    //cerrar Dialog
    const handleCloseDialog = () => {
        setPropsDialog(prevState => ({...prevState, active: false}))
    }
    //reiniciar valores del formulario
    const resetForm = () => {
        const form = document.getElementById('formUsers');
        form.reset();
    }
    // Función para manejar los cambios en los inputs
    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        getRoles()
    }, [])
    
    return(
        <>
            <DialogCrud
                propsDialog={propsDialog}
                setPropsDialog={setPropsDialog}
            >
                <form method="post" id="formUsers" onSubmit={handleSubmit}>
                    <DialogContent >
                        { propsDialog.isConfirm && (
                            <p className="text-center">¿Desea eliminar el usuario <b>{user.user_name ? user.user_name : ''}</b>?</p> 
                            ) }
                        { !propsDialog.isConfirm && (
                            <div>
                        <div className="row">
                            <div className="col-md-6 mb-4 mt-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        id="user_name"
                                        name="user_name"
                                        className="form-control"
                                        placeholder="Nombre de usuario"
                                        value={user.user_name ? user.user_name : ''}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="user_name">Usuario</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 mt-2">
                                <div className="form-floating form-floating-outline">
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        aria-label="role"
                                    >
                                        {
                                            roles ? roles.map((role,index) => {
                                                return(
                                                    <option key={role.id} value={role.name} defaultValue={user.role ? user.role === role.name : role.name === 'guest'}>{role.name}</option>
                                                )
                                            }) : ''
                                        }
                                    </select>
                                    <label htmlFor="role">Rol</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4 mt-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="form-control"
                                        placeholder="Nombre"
                                        value={user.first_name ? user.first_name : ''}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="first_name">Nombre</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 mt-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className="form-control"
                                        placeholder="Apellido"
                                        value={user.last_name ? user.last_name : ''}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="last_name">Apellido</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-4 mt-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Correo electrónico"
                                        value={user.email ? user.email : ''}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="email">E-mail</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2">
                            <div className="col-md-6 mb-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-floating form-floating-outline">
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        className="form-control"
                                    />
                                    <label htmlFor="password_confirmation">Repetir Contraseña</label>
                                </div>
                            </div>
                        </div>
                        </div>
                    )}
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleCloseDialog()}>Cerrar</button>
                        <button type="submit" className="btn btn-primary">{propsDialog.isConfirm ? 'Eliminar' : 'Guardar'}</button>
                    </DialogActions>
                </form>
            </DialogCrud>

            <div className="card">
                <div className="card-header">
                    <button type="button" className="btn btn-primary" onClick={ ()=> handleOpenDialog(userEmpty,'Crear usuario',false)}>Crear usuario</button>
                </div>
                <div className="card-body">
                    <Suspense>
                        <DataTable
                            api={api}
                            jwt={jwt}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}