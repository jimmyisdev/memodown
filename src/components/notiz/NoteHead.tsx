export default function NoteHead() {
    return (
        <div className="flex flex-row justify-between bg-blue-900 text-slate-100">
            <div className="flex flex-col justify-center items-center w-16 p-2 ">
                <span className="w-full">Type</span>
            </div>
            <div className="w-52 p-2">
                <span className="w-full">Excerpt</span>
            </div>
            <div className="w-18 p-2">
                <span className="w-full">Actions</span>
            </div>
        </div>
    )
}