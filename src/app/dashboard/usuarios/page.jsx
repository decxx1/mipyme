import UsersTable from '@/src/components/UsersTable.jsx'
import {api} from '@/src/constants/env.js'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Usuarios - Mipyme',
  description: 'Usuarios table',
}
  
export default function Dashboard() {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt').value


  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 mb-4">
        Usuarios
      </h4>
      <UsersTable
        api={api} 
        jwt={jwt}
      />
    </div>
  )
}