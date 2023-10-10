import { Card } from "@material-tailwind/react"
import { Login } from "../components/login/login"
import React from "react"
import Footer from "../components/footer"
import { CubeTransparentIcon } from "@heroicons/react/24/outline"
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