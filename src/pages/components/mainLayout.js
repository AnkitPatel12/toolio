import { SidebarWithSearch } from './sidebar'

// import Footer from './footer'

export default function Layout({ children }) {

    return (
        <div className='flex flex-row h-screen '>

            <aside className="shrink-0">
                <SidebarWithSearch />
            </aside>
            <div className="h-full w-full p-8 shadow-none overflow-y-scroll bg-white">
                {children}
            </div>
            {/* <Footer /> */}
            <div>
                {/* Add other routes as needed */}
            </div>
        </div>

    )
}