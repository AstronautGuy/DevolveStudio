import Image from "next/image";

export default function Header() {
    return(
        <header>
            <div className="flex items-center justify-between px-4 bg-gradient-to-b from-[#0C1B15] to-[#030D09] text-white">
                <div className="flex items-center">
                    <Image
                        src="/Logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <h1 className="text-2xl font-bold ml-2 text-[#00674b ]">DEVolveStudio.IN</h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400">About</a></li>
                        <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}