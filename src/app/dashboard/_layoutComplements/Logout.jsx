'use client'
import {api} from '@/src/constants/env.js'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

export default function Logout () {
    const jwt = cookies.get('jwt')
    const router = useRouter()

    const logoutFetch = () => {
        fetch(api + "api/logout", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .finally(() => {
          router.push('/')
        });
    }

    return(
      <li>
        <button className="dropdown-item" onClick={logoutFetch} >
          <i className="mdi mdi-logout me-2"></i>
          <span className="align-middle">Salir</span>
        </button>
      </li>
    )
  }