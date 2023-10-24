import { SidebarWithSearch } from './sidebar'
import { Card } from '@material-tailwind/react'

// import Footer from './footer'

export default function Layout({ children }) {

    return (
        <div className='flex flex-row h-screen '>

            <aside className="shrink-0">
                <SidebarWithSearch />
            </aside>
            <main className='py-4'>
                <Card className="h-[calc(100vh-2rem)] w-[calc(100vw-17rem)] min-w-[700px] p-8 rounded-3xl shadow-none overflow-y-scroll">
                    {children}
                </Card>
            </main>
            {/* <Footer /> */}
        </div>

    )
}