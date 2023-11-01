import { getSession } from 'next-auth/react';
import Router from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../components/mainLayout';

import { Alert } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import Loading from '../components/loading';
import ItemsGrid from '../components/store/itemsGrid';

export default function Projects({ user }) {

    const { data: session, status } = useSession();
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [alert, setAlert] = React.useState({ type: '', message: '' });
    const [alerted, setAlerted] = React.useState(false);
    function Alerts() {
        useEffect(() => {
            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setAlerted(false)
            }, 5000)

            return () => {
                clearTimeout(timeId)
            }
        }, []);
        return (
                <>
                    {alert.type === 'success' &&
                        <>
                            <Alert
                                open={alerted}
                                color="green"
                                onClose={() => setAlerted(false)}
                                className="font-medium text-white fixed bottom-8 w-[calc(100vw-22rem)] min-w-[700px]"
                            >
                                {alert.message}
                            </Alert>
                        </>
                    }
                    {alert.type === 'fail' &&
                        <>
                            <Alert
                                open={alerted}
                                color="red"
                                onClose={() => setAlerted(false)}
                                className="font-medium text-white fixed bottom-8 w-[calc(100vw-22rem)] min-w-[700px]"
                                
                            >
                                {alert.message}
                            </Alert>
                        </>
                    }
                </>
        )
    }
    useEffect(() => {
        if (status === 'unauthenticated') { Router.replace('/login'); }
        else {
            fetch('/api/items/fetch', {
                method: 'POST',
                body: {},
            }).then(res => res.json()).then((response) => {
                setItems(response.items)
                setLoading(false)
            })
        }
    }, [alert]);

    if (status === 'authenticated')
        return (
            <Layout>
                
                <div className='flex justify-between items-center pb-7'>
                    <h1 className='pt-[6px]'>Tool Marketplace</h1>
                    {/* <AddProjectModal setAlert={setAlert} setAlerted={setAlerted} /> */}
                </div>
                {!loading ?
                    <ItemsGrid items={items} setAlert={setAlert} setAlerted={setAlerted} />
                    :
                    <Loading />
                    
                }

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