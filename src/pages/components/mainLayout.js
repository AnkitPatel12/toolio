import Nav from './nav'
import { SidebarWithSearch } from './sidebar'
import { Card } from '@material-tailwind/react'

// import Footer from './footer'

export default function Layout({ children }) {

    return (
        <div className='flex flex-row h-screen'>

            <aside className="shrink-0">
                <SidebarWithSearch />
            </aside>
            <main className='py-4'>
                <Card className="h-[calc(100vh-2rem)] w-[calc(100vw-17rem)] p-4 rounded-3xl shadow-none">
                    <div className="mb-2 flex items-center gap-4 p-4">
                        {children}

                    </div>
                </Card>
            </main>
            {/* <Footer /> */}
        </div>

    )
}