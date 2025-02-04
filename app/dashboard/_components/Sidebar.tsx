const Sidebar = () => {
    return (
        <aside className="bg-blue-500 h-screen text-white">
            <div className="py-5 text-center">
                <h1 className="text-xl font-bold">ADMIN PANEL</h1>
            </div>
            <ul>
                <li className="mb-2">
                    <a href="#" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block p-2 hover:bg-gray-700 rounded">Profile</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block p-2 hover:bg-gray-700 rounded">Settings</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block p-2 hover:bg-gray-700 rounded">Notifications</a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;