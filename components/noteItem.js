import { MdDeleteOutline } from "react-icons/md";

const styles = {
    noteTitle: 'flex-auto font-semibold ',
}

export const NoteItem = ({
    active = false,
    title,
    text,
    className = "",
    onClick = () => { },
    onRemove = () => { },
}) => {
    return (
        <button className='flex flex-row justify-between rounded  w-full p-2 items-center pl-2 cursor-pointer focus:border-2'
            onClick={onClick}
        >
            <div className='flex-auto font-semibold text-left'>
                {title.length > 25 ? title.substring(0, 25) + "..." : title}
                {title.length === 0 && "Add title"}
            </div>
            <span className="text-2xl mr-2 hover:border-2 rounded drop-shadow-2xl" onClick={onRemove}>
                <MdDeleteOutline />
            </span>
        </button >
    );
};

export default NoteItem;