import ProjectCard from './projectCard';

export default function ProjectGrid({ projects, setAlert, setAlerted }) {
    console.log(projects)
    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {projects.length === 0 ?
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl">No projects yet!</h1>
                <p className="text-xl">Create a project to get started.</p>
            </div>
            :
            <>
                {projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} setAlert={setAlert} setAlerted={setAlerted} />
                ))}
            </>
            }
        </div>
    );
}