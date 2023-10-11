export default function NoteHead() {
    return (
        <div className="flex flex-row justify-between font-bold text-slate-950 p-2 border-b-2 border-slate-950">
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