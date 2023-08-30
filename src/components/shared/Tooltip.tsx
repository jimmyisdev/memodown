export default function Tooltip({ message, children, direction = "top" }: { message: string, children: JSX.Element, direction?: string }) {
    return (
        <div className="group relative  flex justify-center">
            {children}
            <span className="absolute top-10 scale-0 transition-all rounded bg-blue-700 p-2 text-xs text-white group-hover:scale-100 z-50">{message}</span>
        </div>
    )
}