import React, { useEffect } from 'react';
import Layout from '../components/mainLayout';
import { getSession } from 'next-auth/react';
import Loading from '../components/loading';

export default function Profile({ user }) {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('/api/projects/fetch', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                setProjects(response.projects);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className='flex justify-between items-center pb-7'>
                <h1 className=''>Hi, {user.name === '' ? user.email : user.name}</h1>
                </div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <h2>Projects:</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                )}

        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const { user } = session;

    return {
        props: { user },
    };
}
