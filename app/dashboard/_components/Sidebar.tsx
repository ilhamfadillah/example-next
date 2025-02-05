import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="bg-blue-500 h-screen text-white">
            <div className="py-5 text-center">
                <h1 className="text-xl font-bold">ADMIN PANEL</h1>
            </div>
            <ul>
                <li className="mb-2">
                    <Link href={{ pathname: `/dashboard/provider` }}>
                        <span className="block p-2 hover:bg-gray-700 rounded text-bold">
                            Provider
                        </span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;