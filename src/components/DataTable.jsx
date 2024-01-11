
'use client'
import { useState, useEffect } from 'react'
import Table from '@/src/components/Table'
import ResponsivePagination from 'react-responsive-pagination';

export default function DataTable({api, jwt, handleOpenDialog, updateNow, setUpdateNow}) {
    const [users, setUsers] = useState(null)
    const thead = ['Id', 'Usuario', 'Nombre y apellido', 'E-mail', 'Creado', 'Opciones'];
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const updateUsers = async (currentPage) => {
        const response = await fetch(api + 'api/users?page='+currentPage+'&perPage='+perPage,{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const jsonData = await response.json();
        setUsers(jsonData.data)
        setCurrentPage(jsonData.current_page)
        setPerPage(jsonData.per_page)
        setTotalPages(Math.ceil(jsonData.total / jsonData.per_page))
        
        //console.log(jsonData)
    }
    function handlePageChange(page) {
        setCurrentPage(page);
    }
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    }

    //ejecutar actualizar usuarios
    useEffect(() => {
        //console.log('ejecutando useEffect')
        updateUsers(currentPage)
    }, [currentPage])

    useEffect(() => {
        if(updateNow){
            updateUsers(currentPage)
            setUpdateNow(false)
        }
    }, [updateNow]);
    useEffect(() => {
        updateUsers(currentPage)
        setUpdateNow(false)
    }, [perPage]);
    return(
        <>
        <div className="col-1 mb-3">
            <div className="form-floating form-floating-outline">
                <select
                    className="form-select"
                    id="entrys"
                    name="entrys"
                    aria-label="entrys"
                    value={perPage ? perPage : 10}
                    onChange={handleSelectChange}
                >
                    <option value="10" >10</option>
                    <option value="15" >15</option>
                    <option value="20" >20</option>
                </select>
                <label htmlFor="entrys">Entradas</label>
            </div>
        </div>
        <Table  
            thead={thead}
        >
            { users ? users.map( (user,index) => {
                
                return (
                    <tr key={user.id}>
                        <td>
                            {user.id}
                        </td>
                        <td>
                            {user.user_name}
                        </td>
                        <td>
                            {user.first_name + ' ' + user.last_name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.created_at}
                        </td>
                        <td>
                            <div className="dropdown">
                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i
                                    className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu"> 
                                    <a className="dropdown-item" href="#" onClick={() => handleOpenDialog(user,'Editar usuario', false, false, false)}>
                                        <i className="mdi mdi-pencil-outline me-2"></i>Editar
                                    </a>
                                    <a className="dropdown-item" href="#" onClick={() => handleOpenDialog(user,'Cambiar contraseña', false, true, false)}>
                                        <i className="mdi mdi-lock-outline me-2"></i>Cambiar Contraseña
                                    </a>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <a className="dropdown-item" href="#" onClick={() => handleOpenDialog(user, 'Eliminar usuario', true, false, false)}>
                                        <i className="mdi mdi-trash-can-outline me-2"></i>Eliminar
                                    </a>
                                </div>
                            </div> 
                        </td>
                    </tr>
                    )
                }) : (
                    <tr>
                        <td colSpan="5">
                            <div className="no-record-message">No hay datos cargados</div>
                        </td>
                    </tr>
                ) }
        </Table>
            <ResponsivePagination
                total={totalPages}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
                extraClassName="pagination-rounded pagination-outline-primary justify-content-end mt-4"
                maxWidth={350}
            />
        </>
    )
}