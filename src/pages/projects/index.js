import React, { useEffect } from 'react';
import Layout from '../components/mainLayout'
import ProjectGrid from '../components/dashboard/projectGrid';
import Router from 'next/router';
import { getSession } from 'next-auth/react';

import { useSession, signIn, signOut } from 'next-auth/react'
import { Alert, Button } from '@material-tailwind/react';
import { AddProjectModal } from '../components/dashboard/addProjectModal';


export default function Projects({ user }) {

    const { data: session, status } = useSession();
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState({ type: '', message: '' });
    const [alerted, setAlerted] = React.useState(false);
    function Alerts() {
        const [open, setOpen] = React.useState(true);

        useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setOpen(false)
            }, 5000)

            return () => {
                clearTimeout(timeId)
            }
        }, []);
        return (
            <>
                <>
                    {alert.type === 'success' &&
                        <>
                            <Alert
                                open={open}
                                color="green"
                                onClose={() => setOpen(false)}
                                className="font-medium text-white fixed bottom-8 w-[calc(100vw-22rem)] min-w-[700px]"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 100 },
                                }}
                            >
                                {alert.message}
                            </Alert>
                        </>
                    }
                    {alert.type === 'fail' &&
                        <>
                            <Alert
                                open={open}
                                color="red"
                                onClose={() => setOpen(false)}
                                className="font-medium text-white fixed bottom-8 w-[calc(100vw-22rem)] min-w-[700px]"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 100 },
                                }}
                            >
                                {alert.message}
                            </Alert>
                        </>
                    }
                </>
            </>

        )
    }
    useEffect(() => {
        if (status === 'unauthenticated') { Router.replace('/login'); }
        else {
            fetch('/api/projects/fetch', {
                method: 'POST',
                body: JSON.stringify({
                    email: user.email,
                }),
            }).then(res => res.json()).then((response) => {
                console.log("res")
                setProjects(response.projects)
                setLoading(false)
                setAlerted(false)
            })
        }
    }, [alerted]);

    if (status === 'authenticated')
        return (
            <Layout>

                <div className='flex justify-between items-center pb-7'>
                    <h1 className=''>My Projects</h1>
                    <AddProjectModal setAlert={setAlert} setAlerted={setAlerted} />
                </div>
                <div>
                    {!loading &&
                        <ProjectGrid projects={projects} setAlert={setAlert} setAlerted={setAlerted} />
                    }
                </div>
                <Alerts />


            </Layout>
        )

    return <div></div>
}

export async function getServerSideProps(context) {

    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const { user } = session;

    return {
        props: { user },
    }
}