import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default function Menu() {

    return (
        <>
            <nav className="p-5 w-full flex gap-3 items-center bg-zinc-800">
                <Link href={'/'} className="text-white">
                    <span>Projeto pizzaria</span>
                </Link>
                <ul className="flex gap-3 ms-auto">
                    <Link href={'/login'} className="text-white">
                        <li>
                            <LuLogIn size={20}/>
                        </li>
                    </Link>
                </ul>
            </nav>
        </>
    )

}