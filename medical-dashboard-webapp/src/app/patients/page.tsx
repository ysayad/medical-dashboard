import "mapbox-gl/dist/mapbox-gl.css"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {getAuthSession} from "@/lib/auth";

export default async function Dashboard() {

    // @ts-ignore
    const session: user | null = await getAuthSession()

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar/>
        </div>
        <div className="flex flex-col">
          <Header/>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {session && session.user.role == 'DOCTOR' ? 'mates ça mon salaud' : 'you are not allowed to visualize the content of this page'}
          </main>
        </div>
      </div>
  )
}