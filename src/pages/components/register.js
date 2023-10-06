import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import CryptoJS from 'crypto-js';

const hashPassword = 'oooOOOoo very much secure password'

function encrypt(tohash) {
    return tohash = CryptoJS.AES.encrypt(tohash, hashPassword).toString();
}


export function SimpleRegistrationForm() {
    const [success, setSuccess] = React.useState(null);

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/adduser', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: encrypt(formData.get("password")),
                isAdmin: false
            }),
        })

        // hash the passowrd here

        // Handle response if necessary
        const data = await response.json()
        setSuccess(data.success)
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
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Name" type="text" id="name" name="name" />
                    <Input size="lg" label="Email" type="email" id="email" name="email" />
                    <Input type="password" size="lg" label="Password" name="password" />
                </div>
                <Checkbox
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

                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography>
            </form>
            {success ?
                <p>Success!!</p>

                :
                <></>}


        </Card>
    );
}



