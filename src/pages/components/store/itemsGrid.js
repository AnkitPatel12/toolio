import ItemCard from './itemCard';

export default function ItemsGrid({ items, setAlert, setAlerted }) {
    return (
        <div className="flex flex-row gap-7 flex-wrap">
            {items.length === 0 ?
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl">No items yet!</h1>
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