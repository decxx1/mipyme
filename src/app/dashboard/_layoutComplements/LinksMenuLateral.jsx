'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LinksMenuLateral () {
    const baseRoute = '/dashboard'

    const pages = [{
        name: 'Dashboard',
        route: baseRoute,
        icon: 'mdi mdi-home-outline'
    },{
        name: 'Usuarios',
        route: baseRoute + '/usuarios',
        icon: 'mdi mdi-account-group-outline'
    }]

    const LinkLateral = ({ name, route, icon}) => {
        const pathname = usePathname()
        const [active, setActive] = useState('')
        
        useEffect(() => {
            if(pathname === route){
                setActive('active')
            }else{
                setActive('')
            }
        }, [pathname, route])

        return (
            <li className={`menu-item ${active}`}>
                <Link href={route} className='menu-link'>
                    <i className={`menu-icon tf-icons ${icon}`}></i>
                    <div data-1={name}>{name}</div>
                </Link>
            </li>
        )
    }
    return (
        <ul className="menu-inner py-1">

        { pages.map( (page,index) => {
            return (
                <LinkLateral 
                    key = {index}
                    name = {page.name}
                    route = {page.route}
                    icon = {page.icon}
                />
            )
        }) }
        </ul>
    )
}