import React from "react";
import { Alert } from "@material-tailwind/react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";

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
import { CheckIcon, PaintBrushIcon, PlusIcon, WrenchIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";
import { hash } from "../../../lib/crypto";

export function EditProfileModal({ user, setAlert, setAlerted }) {
    const { data: session, status } = useSession();
    const [addRes, setAddRes] = React.useState({ success: true, message: null });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    async function onInfoSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        await fetch('/api/users/edit', {
            method: 'POST',
            body: JSON.stringify({
                newName: formData.get('name'),
                email: user.email,
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

    async function onPasswordChangeSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await fetch('/api/users/resetpassword', {
            method: 'POST',
            body: JSON.stringify({
                oldPassword: formData.get("oldPassword"),
                newPassword: hash(formData.get("newPassword")),
                email: formData.get('email'),
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
                <WrenchIcon className='h-7 w-7 ms-[-12px]' />
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                <Card className="mx-auto w-[700px]">
                    <Tabs value="My Info" className="p-4">
                        <TabsHeader className="mx-4">
                            <Tab key="info" value="My Info">
                                My Info
                            </Tab>
                            <Tab key="password" value="Reset Password">
                                Reset Password
                            </Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel key="info" value="My Info">
                                <form className="" onSubmit={onInfoSubmit}>
                                    <CardBody className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <h1 className='mt-2'>Edit Profile</h1>
                                           
                                        </div>
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
                                            User Name
                                        </Typography>
                                        <Input required label="User Name" type="text" id="name" name="name" size="lg" defaultValue={user.name} />
                                    </CardBody>
                                    <CardFooter className="pt-0 flex flex-row ">
                                        <Button variant="gradient" className="me-3" value="Submit" type="submit">
                                            Confirm
                                        </Button>
                                        <Button variant="outlined" color="red" onClick={handleOpen}>
                                            Exit
                                        </Button>
                                    </CardFooter>
                                </form>
                            </TabPanel>
                            <TabPanel key="password" value="Reset Password">
                                <form className="" onSubmit={onPasswordChangeSubmit}>
                                    <CardBody className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <h1 className='mt-2'>Reset Password</h1>
                                       
                                        </div>
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
                                            Old password
                                        </Typography>
                                        <Input required label="Old password" type="text" id="oldPassword" name="oldPassword" size="lg"/>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium mb-[-10px]"
                                        >
                                            New password
                                        </Typography>
                                        <Input required label="New password" type="text" id="newPassword" name="newPassword" size="lg" />
                                    </CardBody>
                                    <CardFooter className="pt-0 flex flex-row ">
                                        <Button variant="gradient" className="me-3" value="Submit" type="submit">
                                            Confirm
                                        </Button>
                                        <Button variant="outlined" color="red" onClick={handleOpen}>
                                            Exit
                                        </Button>
                                    </CardFooter>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </Card>
            </Dialog>
        </>
    );
}