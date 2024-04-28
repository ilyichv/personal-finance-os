import { ArrowLeftRightIcon, HomeIcon, SettingsIcon } from "lucide-react";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <ArrowLeftRightIcon className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
];

export { routes };
