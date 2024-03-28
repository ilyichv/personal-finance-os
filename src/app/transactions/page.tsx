import { ArrowLeftIcon, CalendarClockIcon, SearchIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";

export default async function Transactions() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold md:text-xl">Transactions</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button className="hidden sm:flex" variant="outline">
            Today
          </Button>
          <Button className="hidden md:flex" variant="outline">
            This Month
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-[280px] justify-start text-left font-normal"
                id="date"
                variant="outline"
              >
                <CalendarClockIcon className="mr-2 h-4 w-4" />
                June 01, 2023 - June 30, 2023
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar initialFocus mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="relative flex items-center gap-2">
          <SearchIcon className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full pl-8 md:w-[400px] lg:w-[600px]"
            placeholder="Search transactions..."
            type="search"
          />
        </div>
        <Button className="ml-auto" size="sm">
          Export
        </Button>
      </div>
      <div className="mt-4 flex min-h-[300px] flex-col gap-4">
        <div className="max-w-full overflow-auto rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead className="w-[200px]">Description</TableHead>
                <TableHead className="w-[150px]">Amount</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-01 10:45 AM
                </TableCell>
                <TableCell className="font-medium">TRN001</TableCell>
                <TableCell className="font-medium">
                  Subscription Renewal
                </TableCell>
                <TableCell className="font-medium">$99.00</TableCell>
                <TableCell className="font-medium">Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-02 11:20 AM
                </TableCell>
                <TableCell className="font-medium">TRN002</TableCell>
                <TableCell className="font-medium">Product Purchase</TableCell>
                <TableCell className="font-medium">$49.00</TableCell>
                <TableCell className="font-medium">Pending</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-03 09:35 AM
                </TableCell>
                <TableCell className="font-medium">TRN003</TableCell>
                <TableCell className="font-medium">Service Payment</TableCell>
                <TableCell className="font-medium">$199.00</TableCell>
                <TableCell className="font-medium">Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-04 08:15 AM
                </TableCell>
                <TableCell className="font-medium">TRN004</TableCell>
                <TableCell className="font-medium">Ticket Booking</TableCell>
                <TableCell className="font-medium">$79.00</TableCell>
                <TableCell className="font-medium">Pending</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-05 12:50 PM
                </TableCell>
                <TableCell className="font-medium">TRN005</TableCell>
                <TableCell className="font-medium">
                  Membership Renewal
                </TableCell>
                <TableCell className="font-medium">$149.00</TableCell>
                <TableCell className="font-medium">Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-06 03:25 PM
                </TableCell>
                <TableCell className="font-medium">TRN006</TableCell>
                <TableCell className="font-medium">Book Purchase</TableCell>
                <TableCell className="font-medium">$29.00</TableCell>
                <TableCell className="font-medium">Pending</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-07 04:40 PM
                </TableCell>
                <TableCell className="font-medium">TRN007</TableCell>
                <TableCell className="font-medium">Course Enrollment</TableCell>
                <TableCell className="font-medium">$129.00</TableCell>
                <TableCell className="font-medium">Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-08 06:10 PM
                </TableCell>
                <TableCell className="font-medium">TRN008</TableCell>
                <TableCell className="font-medium">Software Purchase</TableCell>
                <TableCell className="font-medium">$69.00</TableCell>
                <TableCell className="font-medium">Pending</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-09 07:30 PM
                </TableCell>
                <TableCell className="font-medium">TRN009</TableCell>
                <TableCell className="font-medium">
                  Subscription Upgrade
                </TableCell>
                <TableCell className="font-medium">$79.00</TableCell>
                <TableCell className="font-medium">Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  2023-08-10 09:20 PM
                </TableCell>
                <TableCell className="font-medium">TRN010</TableCell>
                <TableCell className="font-medium">
                  Accessory Purchase
                </TableCell>
                <TableCell className="font-medium">$19.00</TableCell>
                <TableCell className="font-medium">Pending</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
