import { Card } from "@material-tailwind/react"
import React from "react"
import Footer from "../components/footer"
import { Login } from "../components/login/login"
import LogoLarge from "../components/logoLarge"

export default function SignIn({ csrfToken }) {
    return (
        <div className="grid h-screen place-items-center">
            <Card className="">

                <div className="p-6">
                    <LogoLarge />
                    <Login />
                </div>
            </Card>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </div>

    )

}