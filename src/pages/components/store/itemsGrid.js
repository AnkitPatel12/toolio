import ItemCard from './itemCard';
import ProjectCard from './itemCard';

export default function ItemsGrid({ items, setAlert, setAlerted }) {
    return (
        <div className="flex flex-row gap-4 flex-wrap">
            {items.length === 0 ?
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl">No projects yet!</h1>
                <p className="text-xl">Create a project to get started.</p>
            </div>
            :
            <>
                {items?.map((item) => (
                    <ItemCard key={item.id} item={item} setAlert={setAlert} setAlerted={setAlerted} />
                ))}
            </>
            }
        </div>
    );
}