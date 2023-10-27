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

export function EditProjectModal({project, openEdit, setOpenEdit, setAlert, setAlerted }) {
    const { data: session, status } = useSession();
    const [addRes, setAddRes] = React.useState({ success: true, message: null });
    const handleOpen = () => setOpenEdit((cur) => !cur);

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        await fetch('/api/projects/edit', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                name: project.name,
                newName: formData.get("projectName"),
                description: formData.get("projectDescription"),
                users: project.users,
                items: project.items,
            }),
        }).then(res => res.json()).then((response) => {
            setAddRes({ success: response.success, message: response.message })
            if (response.success) {
                setAlert({ type: 'success', message: "Project updated!" })
                setAlerted(true)
                handleOpen()
            }
        })
    }

    return (
        <>
            <Dialog
                open={openEdit}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                <Card className="mx-auto w-[700px]">
                    <form className="" onSubmit={onSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h1 className='mt-2'>Edit {project.name}</h1>
                                <Button className='rounded-full w-[50px] h-[50px] mt-[-10px] me-[-10px]' variant="text" onClick={handleOpen}>
                                    <XMarkIcon className='h-7 w-7 ms-[-13px]' />
                                </Button>
                            </div>
                            {!addRes.success ?
                                <p className="text-[var(--message-warn)]">{addRes.message}</p>
                                :
                                <></>
                            }
                            <Input required label="Project Name" type="text" id="projectName" name="projectName" size="lg" defaultValue={project.name} />
                            <Textarea label="Project Description" type="text" id="projectDescription" name="projectDescription" size="lg" defaultValue={project.description} />
                        </CardBody>
                        <CardFooter className="pt-0 flex flex-row ">
                            <Button variant="gradient" className="me-3"  value="Submit" type="submit">
                                Edit Project
                            </Button>
                            <Button variant="gradient" color="red" onClick={handleOpen}>
                                Exit
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}