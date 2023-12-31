import Image from "next/image";
import logo from "../../../public/md_logo.png";
export default function Cover() {
    return (
        <div>
            <Image
                src={logo}
                width={200}
                height={200}
                alt="Logo"
                placeholder="blur"
            />
            <div>
                <h1 className="text-2xl mb-2 font-extrabold">Memodown</h1>
                <p className="text-xl font-medium">Best Memo App</p>
            </div>
        </div>
    )
}

