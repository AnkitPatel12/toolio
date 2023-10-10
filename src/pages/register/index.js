import { Card } from "@material-tailwind/react"
import { Register } from "../components/register/register"
import React from "react"
import Footer from "../components/footer"
import LogoLarge from "../components/logoLarge"

export default function RegisterScreen() {
    return (
        <div className="grid h-screen place-items-center">
            <Card className="">
                <div className="p-6">
                    <LogoLarge/>
                    <Register/>
                </div>
            </Card>
            <div className="absolute bottom-0 w-full">
                <Footer />
            </div>
        </div>

    )

}