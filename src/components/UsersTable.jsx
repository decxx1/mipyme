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
    const [propsDialog, setPropsDialog] = useState({active:false, title:'', isDeleting:false, isChangingPassword:false})
    
    const [user, setUser] = useState(userEmpty)
    const [updateNow, setUpdateNow] = useState(false)
    const [roles, setRoles] = useState(null)
    

    //guardar usuario
    const handleSubmit = (event) => {
        event.preventDefault()
        if (propsDialog.isDeleting) {
            deleteUser()
        }else{
            const fields = Object.fromEntries(new window.FormData(event.target))
            if(user.id > 0){
                editUser(fields)
                console.log(fields)
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
            setUpdateNow(true);
            //reiniciar valores del formulario
            resetForm();
            //cerrar modal
            handleCloseDialog();
        })
        .catch(error => {
            console.error(error)
            if (error.response && error.response.data && error.response.data.message) {
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
            setUpdateNow(true);
            //reiniciar valores del formulario
            resetForm();
            //restablecer el valor de id a 0
            setUser(userEmpty);
            //cerrar modal
            handleCloseDialog();
        })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
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
            if (error.response && error.response.data && error.response.data.message) {
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
            setUpdateNow(true);
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
    const handleOpenDialog = (user, titleDialog, deletingDialog, changingPassword) => {
        setPropsDialog({active:true, title:titleDialog, isDeleting:deletingDialog, isChangingPassword:changingPassword})
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
                        { propsDialog.isDeleting && (
                            <p className="text-center">¿Desea eliminar el usuario <b>{user.user_name ? user.user_name : ''}</b>?</p> 
                        ) }
                        { propsDialog.isChangingPassword && (
                            <div className="row">
                                <p className="text-center">Cambiar la contraseña de: <b>{user.user_name ? user.user_name : ''}</b></p> 
                                <div className="col-md-12 mb-4 mt-2">
                                    <div className="form-floating form-floating-outline">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Nueva contraseña"
                                        />
                                        <label htmlFor="password">Nueva contraseña</label>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4 mt-2">
                                    <div className="form-floating form-floating-outline">
                                        <input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            className="form-control"
                                            placeholder="Repetir nueva contraseña"
                                        />
                                        <label htmlFor="password_confirmation">Repetir nueva contraseña</label>
                                    </div>
                                </div>
                            </div>
                        )}
                        { !propsDialog.isDeleting && !propsDialog.isChangingPassword && (
                        <>
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
                                            value={user.role ? user.role : ''}
                                            onChange={handleInputChange}
                                        >
                                            {
                                                roles ? roles.map((role,index) => {
                                                    return(
                                                        <option key={role.id} value={role.name} >{role.name}</option>
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
                        </>
                    )}
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleCloseDialog()}>Cerrar</button>
                        <button type="submit" className="btn btn-primary">{propsDialog.isDeleting ? 'Eliminar' : 'Guardar'}</button>
                    </DialogActions>
                </form>
            </DialogCrud>

            <div className="card">
                <div className="card-header">
                    <button type="button" className="btn btn-primary" onClick={ ()=> handleOpenDialog(userEmpty,'Crear usuario',false,false)}>Crear usuario</button>
                </div>
                <div className="card-body">
                    <Suspense>
                        <DataTable
                            api={api}
                            jwt={jwt}
                            handleOpenDialog={handleOpenDialog}
                            updateNow={updateNow}
                            setUpdateNow={setUpdateNow}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}