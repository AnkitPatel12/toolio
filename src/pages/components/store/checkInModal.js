import React, { useEffect } from "react";
import { Alert, DialogHeader } from "@material-tailwind/react";

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
import Loading from "../loading";

export function CheckInModal({ item, setAlert, setAlerted }) {
    const [open, setOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const [addRes, setAddRes] = React.useState({ success: true, message: null });
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [projectName, setProjectName] = React.useState();

    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        fetch('/api/projects/fetch', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
            }),
        }).then(res => res.json()).then((response) => {
            console.log("res")
            setProjects(response.projects)
            setLoading(false)
        })
    }, []);

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        if (!parseInt(formData.get("quantity")) || parseInt(formData.get("quantity")) <= 0) {
            setAddRes({ success: false, message: "Please enter a valid quantity" })
            return;
        }
        await fetch('/api/items/update', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                itemName: item.name,
                quantity: formData.get("quantity"),
                projectName: projectName,
                type: "checkIn",
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
            <Button onClick={handleOpen} className="me-3" size="lg" fullWidth={true} variant="outlined" style={{ ml: 6, textTransform: 'inherit' }}>
                Check In
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                <Card className="mx-auto w-[700px]">
                    <img src={item.image} className=" h-[300px] rounded-t-xl object-cover" />
                    <form className="" onSubmit={onSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h1 className='mt-2'>Check in to {item.name}</h1>
                                <Button className='rounded-full w-[50px] h-[50px] mt-[-10px] me-[-10px]' variant="text" onClick={handleOpen}>
                                    <XMarkIcon className='h-7 w-7 ms-[-13px]' />
                                </Button>
                            </div>
                            {!addRes.success ?
                                <p className="text-[var(--message-warn)]">{addRes.message}</p>
                                :
                                <></>
                            }
                            {!loading ?
                                <>
                                    <div class="group inline-flex flex-wrap items-center gap-3">
                                        <Button style={{ ml: 6, textTransform: 'inherit' }} variant="outlined" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">
                                            {item.quantity} of {item.capacity} available
                                        </Button>
                                        <Button style={{ ml: 6, textTransform: 'inherit' }} variant="outlined" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">
                                            ${item.price} per {item.unit}
                                        </Button>
                                    </div>
                                    <Typography color="gray">Please enter the quantity of items you are checking out.</Typography>
                                    <div className="mb-2 flex items-center gap-2">
                                        <p className="w-[70px]">Check in</p>
                                        <div class="w-56">
                                            <div class="relative h-10 w-full min-w-[100px]">
                                                <input
                                                    type="text" id="quantity" name="quantity"
                                                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                    placeholder=" "
                                                />
                                                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                    Quantity
                                                </label>
                                            </div>
                                        </div>
                                        <Typography >from</Typography>
                                        <div className="w-72 flex-col ">

                                            <Select label="Select Project" id="projectName" name="projectName" disabled={projects.length == 0}>
                                                {projects.map((project) => (
                                                    <Option key={project.name} onClick={() => setProjectName(project.name)}>{project.name}</Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </>
                                :
                                <Loading />}
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" className="me-3" value="Submit" type="submit" disabled={projects.length == 0}>
                                Confirm order
                            </Button>
                            <Button variant="outlined" color="red" onClick={handleOpen}>
                                Exit
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}