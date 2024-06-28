import "mapbox-gl/dist/mapbox-gl.css"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {getAuthSession} from "@/lib/auth";

import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
              {session && session.user.role == 'DOCTOR' ?
                              <main
                                  className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                                  <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                                      <div
                                          className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                                          <Card
                                              className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                                          >
                                              <CardHeader className="pb-3">
                                                  <CardTitle>Your patients</CardTitle>
                                                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                                                      Introducing Our Dynamic Patients Dashboard for Dynamic
                                                      Management and Insightful Analysis.
                                                  </CardDescription>
                                              </CardHeader>
                                              <CardFooter>
                                                  <Button>Create a new patient</Button>
                                              </CardFooter>
                                          </Card>
                                          <Card x-chunk="dashboard-05-chunk-1">
                                              <CardHeader className="pb-2">
                                                  <CardDescription>Number Of Patients</CardDescription>
                                                  <CardTitle className="text-4xl">243</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                  <div className="text-xs text-muted-foreground">
                                                      +25% from last week
                                                  </div>
                                              </CardContent>
                                              <CardFooter>
                                                  <Progress value={25} aria-label="25% increase"/>
                                              </CardFooter>
                                          </Card>
                                          <Card x-chunk="dashboard-05-chunk-2">
                                              <CardHeader className="pb-2">
                                                  <CardDescription>Average Age</CardDescription>
                                                  <CardTitle className="text-4xl">~34 yo</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                  <div className="text-xs text-muted-foreground">
                                                      Min : 18 | Max : 74
                                                  </div>
                                              </CardContent>
                                              <CardFooter>
                                                  <Progress value={34} aria-label="34% increase"/>
                                              </CardFooter>
                                          </Card>
                                      </div>
                                      <Tabs defaultValue="week">
                                          <div className="flex items-center">
                                              <TabsList>
                                                  <TabsTrigger value="week">Week</TabsTrigger>
                                                  <TabsTrigger value="month">Month</TabsTrigger>
                                                  <TabsTrigger value="year">Year</TabsTrigger>
                                              </TabsList>
                                              <div className="ml-auto flex items-center gap-2">
                                                  <DropdownMenu>
                                                      <DropdownMenuTrigger asChild>
                                                          <Button
                                                              variant="outline"
                                                              size="sm"
                                                              className="h-7 gap-1 text-sm"
                                                          >
                                                              <ListFilter className="h-3.5 w-3.5"/>
                                                              <span className="sr-only sm:not-sr-only">Filter</span>
                                                          </Button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent align="end">
                                                          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                          <DropdownMenuSeparator/>
                                                          <DropdownMenuCheckboxItem checked>
                                                              Fulfilled
                                                          </DropdownMenuCheckboxItem>
                                                          <DropdownMenuCheckboxItem>
                                                              Declined
                                                          </DropdownMenuCheckboxItem>
                                                          <DropdownMenuCheckboxItem>
                                                              Cancered
                                                          </DropdownMenuCheckboxItem>
                                                      </DropdownMenuContent>
                                                  </DropdownMenu>
                                                  <Button
                                                      size="sm"
                                                      variant="outline"
                                                      className="h-7 gap-1 text-sm"
                                                  >
                                                      <File className="h-3.5 w-3.5"/>
                                                      <span className="sr-only sm:not-sr-only">Export</span>
                                                  </Button>
                                              </div>
                                          </div>
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
                                                                      Type
                                                                  </TableHead>
                                                                  <TableHead className="hidden sm:table-cell">
                                                                      Status
                                                                  </TableHead>
                                                                  <TableHead className="hidden md:table-cell">
                                                                      Date
                                                                  </TableHead>
                                                                  <TableHead className="text-right">Amount</TableHead>
                                                              </TableRow>
                                                          </TableHeader>
                                                          <TableBody>
                                                              <TableRow className="bg-accent">
                                                                  <TableCell>
                                                                      <div className="font-medium">Liam Johnson</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          liam@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Broken Bone
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-23
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$250.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Olivia Smith</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          olivia@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Cancer
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="outline">
                                                                          Declined
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-24
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$150.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Noah Williams</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          noah@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Diarhea
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-25
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$350.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Emma Brown</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          emma@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Broken Bone
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-26
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$450.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Liam Johnson</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          liam@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Broken Bone
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-23
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$250.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Liam Johnson</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          liam@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Broken Bone
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-23
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$250.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Olivia Smith</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          olivia@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Cancer
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="outline">
                                                                          Declined
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-24
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$150.00</TableCell>
                                                              </TableRow>
                                                              <TableRow>
                                                                  <TableCell>
                                                                      <div className="font-medium">Emma Brown</div>
                                                                      <div
                                                                          className="hidden text-sm text-muted-foreground md:inline">
                                                                          emma@example.com
                                                                      </div>
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      Broken Bone
                                                                  </TableCell>
                                                                  <TableCell className="hidden sm:table-cell">
                                                                      <Badge className="text-xs" variant="secondary">
                                                                          Fulfilled
                                                                      </Badge>
                                                                  </TableCell>
                                                                  <TableCell className="hidden md:table-cell">
                                                                      2023-06-26
                                                                  </TableCell>
                                                                  <TableCell className="text-right">$450.00</TableCell>
                                                              </TableRow>
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