import ProjectCard from './projectCard';

export default function ProjectGrid({ projects, setAlert, setAlerted }) {
    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} setAlert={setAlert} setAlerted={setAlerted} />
            ))}
        </div>
    );
}