import ProjectCard from './projectCard';

export default function ProjectGrid({ projects, setAlert, setAlerted }) {
    console.log(projects)
    return (
        <div className="flex flex-row gap-7 flex-wrap">
            {projects.length === 0 ?
            <div className="flex flex-col">
                <h1 className="text-2xl">No projects yet!</h1>
                <p className="text-xl">Create a project to get started.</p>
            </div>
            :
            <>
                {projects?.map((project) => (
                    <ProjectCard key={project?.projectID} project={project} setAlert={setAlert} setAlerted={setAlerted} />
                ))}
            </>
            }
        </div>
    );
}