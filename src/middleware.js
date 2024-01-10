import { NextResponse } from 'next/server'

export async function middleware(request) {
    //const response = new NextResponse()

    const api = process.env.NEXT_PUBLIC_API_PATH;
    
    if(request.cookies.has('jwt')){
        const objectToken = request.cookies.get('jwt');
        let jwt = objectToken.value;
        //console.log(jwt);
        const chk_jwt = await fetch(api + "api/verify-token", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        
        const resp_jwt = await chk_jwt.json();
        console.log(resp_jwt.status)
        if (!resp_jwt.status) {
            console.log(resp_jwt.status);
            request.cookies.delete('jwt')
            return NextResponse.redirect(new URL('/', request.url))
        }
  
    }else{
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    
    matcher: '/dashboard/:path*'
    
}

