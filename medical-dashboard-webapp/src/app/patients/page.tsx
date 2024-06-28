import "mapbox-gl/dist/mapbox-gl.css"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {getAuthSession} from "@/lib/auth";

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

interface Patient {
    identifier: String
    surname: String
    familyname: String
    gender: String
    birthdate: String
    telecom: String
    adress: String
    city: String
    state: String
    postalcode: String
    country: String
    maritalstatus: String
}

const fetchPatients = async (): Promise<Patient[]> => {
    const res = await fetch(`${process.env.APP_URL}/api/patients`, {
        cache: 'no-store',
    });
    //console.log("RESULT ERROR : ", res)
    if (!res.ok) {
        throw new Error('Failed to fetch patients');
    }
    return res.json();
};

export default async function Dashboard() {

    // @ts-ignore
    const session: user | null = await getAuthSession()

    const patients = await fetchPatients()
    //console.log(patients)

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar/>
        </div>
        <div className="flex flex-col">
          <Header/>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {session && session.user.role == 'DOCTOR' ?
                              <main
                                  className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                                  <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                                      <Tabs defaultValue="week">
                                          <TabsContent value="week">
                                              <Card x-chunk="dashboard-05-chunk-3">
                                                  <CardHeader className="px-7">
                                                      <CardTitle>Patients</CardTitle>
                                                      <CardDescription>
                                                          Recent patients from your clinic.
                                                      </CardDescription>
                                                  </CardHeader>
                                                  <CardContent>
                                                      <Table>
                                                          <TableHeader>
                                                              <TableRow>
                                                                  <TableHead>Patient name</TableHead>
                                                                  <TableHead className="hidden sm:table-cell">
                                                                      Gender
                                                                  </TableHead>
                                                                  <TableHead className="hidden sm:table-cell">
                                                                      Birth date
                                                                  </TableHead>
                                                                  <TableHead className="hidden md:table-cell">
                                                                      Telecom
                                                                  </TableHead>
                                                                  <TableHead className="text-right">Address</TableHead>
                                                              </TableRow>
                                                          </TableHeader>
                                                          <TableBody>
                                                              {patients && patients.map((patient, index) => (
                                                              <TableRow className="bg-accent">
                                                                  <TableCell>
                                                                      <div className="font-medium">{patient.surname} {patient.familyname}</div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      {patient.gender}
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          {patient.birthdate}
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      {patient.telecom}
                                                                  </TableCell>
                                                                  <TableCell className="text-right">{patient.adress} {patient.city}, {patient.state}</TableCell>
                                                              </TableRow>
                                                                  ))}
                                                          </TableBody>
                                                      </Table>
                                                  </CardContent>
                                              </Card>
                                          </TabsContent>
                                      </Tabs>
                                  </div>
                          </main>
                  : 'you are not allowed to visualize the content of this page'}
          </main>
        </div>
        </div>
    )
}