import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Router from "next/router";

// fix login encrypt and decrypt

export function Login() {
    const [addRes, setAddRes] = React.useState({success: true, message: null});
    const [userInfo, setUserInfo] = React.useState({email: null, password: null})
    const {data: session, status} = useSession();

    useEffect(() => {
        if(status === 'authenticated') Router.replace('/projects');
    }, [status])
    
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        signIn("credentials", 
        {
            email: formData.get("email"),
            password: formData.get("password"),
            callbackUrl: "/projects",
        })

        // console.log(response)

        // setAddRes({success: response.success, message: response.message})

    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Log in
            </Typography>
            <form className="mt-4 gap-4 flex flex-col mb-4 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
                {!addRes.success ?
                    <p className="text-[var(--message-warn)]">{addRes.message}</p>
                    :
                    <></>
                }
                <Input size="lg" label="Email" type="email" id="email" name="email" onChange={({target}) => setUserInfo({...userInfo, email: target.value})} />
                <Input type="password" size="lg" label="Password" name="password" onChange={({target}) => setUserInfo({...userInfo, password: target.value})}/>
                <Button type="submit" value="Submit" >
                    Log in
                </Button>
            </form>
            <Typography color="gray" className="text-center font-normal">
                    New user?{" "}
                    <Link href='/register' className="font-medium text-gray-900">
                        Create an account
                    </Link>
            </Typography>
        </Card>
    );
}