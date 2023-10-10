import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { hashPassword } from "../../../lib/crypto";
import Link from "next/link";

export function Register() {
    const [addRes, setAddRes] = React.useState({success: true, message: null});
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/adduser', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: hashPassword(formData.get("password")),
                isAdmin: false
            }),
        }).then(res => res.json())

        // hash the passowrd here

        setAddRes({success: response.success, message: response.message})
        // if(response.success) {
        //     const res = await signIn("credentials", {
        //         email: formData.get("email"),
        //         password: formData.get("password"),
        //         callbackUrl: "/home",
        //     })
        // }
        // ...
    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-4 gap-4 flex flex-col mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
                {!addRes.success ?
                    <p className="text-[var(--message-warn)]">{addRes.message}</p>
                    :
                    <></>
                }
                <Input size="lg" label="Name" type="text" id="name" name="name" />
                <Input size="lg" label="Email" type="email" id="email" name="email" />
                <Input type="password" size="lg" label="Password" name="password" />
                <Checkbox
                required
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" value="Submit" >
                    Register
                </Button>

                <Typography color="gray" className="text-center font-normal">
                    Already have an account?{" "}
                    <Link href='/api/auth/signin' className="font-medium text-gray-900">
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}