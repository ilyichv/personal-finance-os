import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  CalendarClockIcon,
} from "lucide-react";
import {
  CurvedlineChart,
  FilledtimeseriesChart,
} from "~/components/dashboard/placeholders";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold md:text-xl">Home</h1>
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
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Net Sales</CardDescription>
              <CardTitle>$2389.00</CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart className="aspect-[2/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Gross Profit</CardDescription>
              <CardTitle>$1454.00</CardTitle>
            </CardHeader>
            <CardContent>
              <FilledtimeseriesChart className="aspect-[2/1]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Gross Margin</CardDescription>
              <CardTitle>$986.00</CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart className="aspect-[2/1]" />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription>Income</CardDescription>
              <CardTitle>$2389.00</CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Expenses</CardDescription>
              <CardTitle>$1454.00</CardTitle>
            </CardHeader>
            <CardContent>
              <FilledtimeseriesChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Savings</CardDescription>
              <CardTitle>$986.00</CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Investments</CardDescription>
              <CardTitle>$986.00</CardTitle>
            </CardHeader>
            <CardContent>
              <CurvedlineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardDescription>Transactions</CardDescription>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between border-b py-2 last:pb-2">
              <div className="flex items-center gap-4">
                <ArrowDownIcon className="text-green-500 dark:text-green-500" />
                <div className="flex flex-col leading-none">
                  <div className="font-medium">Netflix</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Entertainment
                  </div>
                </div>
              </div>
              <div className="font-medium">$14.99</div>
            </div>
            <div className="flex items-center justify-between border-b py-2 last:pb-2">
              <div className="flex items-center gap-4">
                <ArrowUpIcon className="text-blue-500 dark:text-blue-500" />
                <div className="flex flex-col leading-none">
                  <div className="font-medium">Deposit</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Income
                  </div>
                </div>
              </div>
              <div className="font-medium">$500.00</div>
            </div>
            <div className="flex items-center justify-between border-b py-2 last:pb-2">
              <div className="flex items-center gap-4">
                <ArrowUpIcon className="text-blue-500 dark:text-blue-500" />
                <div className="flex flex-col leading-none">
                  <div className="font-medium">Salary</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Income
                  </div>
                </div>
              </div>
              <div className="font-medium">$2500.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
