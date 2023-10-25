import itemCard from './itemcard.js';

export default function ProjectGrid({ items }) {
    console.log(items)
    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {projects.length === 0 ?
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl">No projects yet!</h1>
                <p className="text-xl">Create a project to get started.</p>
            </div>
            :
            <>
                {items?.map((item) => (
                    <itemCard key={items.id} item={item} ></itemCard>
                ))}
            </>
            }
        </div>
    );
}