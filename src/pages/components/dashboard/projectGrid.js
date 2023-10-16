import ProjectCard from './projectCard';

export default function ProjectGrid({ projects, setAlertType, setAlerted }) {
    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} setAlertType={setAlertType} setAlerted={setAlerted} />
            ))}
        </div>
    );
}