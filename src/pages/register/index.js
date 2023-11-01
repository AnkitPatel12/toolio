import { Card } from "@material-tailwind/react"
import React from "react"
import Footer from "../components/footer"
import LogoLarge from "../components/logoLarge"
import { Register } from "../components/register/register"

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