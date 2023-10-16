import React from "react";
import { Alert } from "@material-tailwind/react";

import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Select,
    Option,
    Textarea,
} from "@material-tailwind/react";
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";

export function AddProjectModal({setAlertType, setAlerted}) {
    const [open, setOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const [addRes, setAddRes] = React.useState({ success: true, message: null });
    const handleOpen = () => setOpen((cur) => !cur);

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/projects/add', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                name: formData.get("projectName"),
                description: formData.get("projectDescription"),
            }),
        }).then(res => res.json()).then((response) => {
            setAddRes({ success: response.success, message: response.message })
            if (response.success) {
                setAlertType('success')
                setAlerted(true)
                handleOpen()
            }
        })
    }

    return (
        <>
            <Button className='rounded-full w-[52px] shadow-none' onClick={handleOpen}>
                <PlusIcon className='h-7 w-7 ms-[-12px]' />
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                <Card className="mx-auto w-[700px]">
                    <form className="" onSubmit={onSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h1 className='mt-2'>Create a project</h1>
                                <Button className='rounded-full w-[50px] h-[50px] mt-[-10px] me-[-10px]' variant="text" onClick={handleOpen}>
                                    <XMarkIcon className='h-7 w-7 ms-[-13px]' />
                                </Button>
                            </div>
                            {!addRes.success ?
                                <p className="text-[var(--message-warn)]">{addRes.message}</p>
                                :
                                <></>
                            }
                            <Input required label="Project Name" type="text" id="projectName" name="projectName" size="lg" />
                            <Textarea label="Project Description" type="text" id="projectDescription" name="projectDescription" size="lg" />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" fullWidth value="Submit" type="submit">
                                Create Project
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}