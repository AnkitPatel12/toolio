import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import React, { useEffect } from "react";

import { PlusIcon } from '@heroicons/react/24/solid';
import {
    Button,
    Card,
    CardBody,
    Dialog,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { hash } from "../../../lib/crypto";

export function AddProjectModal({ setAlert, setAlerted }) {
    const [open, setOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const [addRes, setAddRes] = React.useState({ success: true, message: null });
    const [projectName, setProjectName] = React.useState('');
    const [projectID, setProjectID] = React.useState('');
    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        setProjectID(hash(session.user.name + projectName));
    }, [projectName]);

    async function onSubmitNewProject(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        await fetch('/api/projects/add', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                projectID: formData.get("projectID"),
                name: formData.get("projectName"),
                description: formData.get("projectDescription"),
            }),
        }).then(res => res.json()).then((response) => {
            setAddRes({ success: response.success, message: response.message })
            if (response.success) {
                setAlert({ type: 'success', message: response.message })
                setAlerted(true)
                handleOpen()
            }
        })
    }

    async function onSubmitJoinProject(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        await fetch('/api/projects/join', {
            method: 'POST',
            body: JSON.stringify({
                userToAdd: session.user.email,
                projectID: formData.get("projectID"),
            }),
        }).then(res => res.json()).then((response) => {
            setAddRes({ success: response.success, message: response.message })
            if (response.success) {
                setAlert({ type: 'success', message: response.message })
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
                    <Tabs value="Create Project" className="p-4">
                        <TabsHeader className="mx-4">
                            <Tab key="create" value="Create Project">
                                Create Project
                            </Tab>
                            <Tab key="join" value="Join Project">
                                Join Project
                            </Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel key="create" value="Create Project">
                                <form className="" onSubmit={onSubmitNewProject}>
                                    <CardBody className="flex flex-col gap-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <h1 >Create a project</h1>
                                        </div>
                                        <Typography color="gray">Start something new by entering your project's info</Typography>
                                        {!addRes.success ?
                                            <p className="text-[var(--message-warn)]">{addRes.message}</p>
                                            :
                                            <></>
                                        }
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium mb-[-10px]"
                                        >
                                            Project Name
                                        </Typography>
                                        <Input required label="Project Name" type="text" id="projectName" name="projectName" size="lg" onChange={(e) => setProjectName(e.target.value)}/>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium mb-[-10px]"
                                        >
                                            Project Description
                                        </Typography>
                                        <Textarea label="Project Description" type="text" id="projectDescription" name="projectDescription" size="lg" className="mb-[-5px]" />
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium mb-[-10px]"
                                        >
                                            Generated Unique ID
                                        </Typography>
                                        <Input required label="projectID" type="text" id="projectID" name="projectID" size="lg" value={projectID} />
                                    </CardBody>
                                    <div className="pt-8">
                                        <Button variant="gradient" className="me-3" value="Submit" type="submit">
                                            Create Project
                                        </Button>
                                        <Button variant="outlined" color="red" onClick={handleOpen}>
                                            Exit
                                        </Button>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel key="join" value="Join Project">
                                <form className="" onSubmit={onSubmitJoinProject}>
                                    <CardBody className="flex flex-col gap-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <h1 >Join a project</h1>

                                        </div>
                                        <Typography color="gray">Join a project by entering its unique ID</Typography>
                                        {!addRes.success ?
                                            <p className="text-[var(--message-warn)]">{addRes.message}</p>
                                            :
                                            <></>
                                        }
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium mb-[-10px]"
                                        >
                                            Unique Project ID
                                        </Typography>
                                        <Input required label="Project ID" type="text" id="projectID" name="projectID" size="lg" />
                                    </CardBody>
                                    <div className="pt-8">
                                        <Button variant="gradient" className="me-3" value="Submit" type="submit">
                                            Join Project
                                        </Button>
                                        <Button variant="outlined" color="red" onClick={handleOpen}>
                                            Exit
                                        </Button>
                                    </div>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </Card>
            </Dialog>
        </>
    );
}