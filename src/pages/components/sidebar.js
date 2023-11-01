import {
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import {
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import Logo from "./logo";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigateToProducts = () => {
    Router.push('/products');
  };

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 rounded-none bg-[var(--app-container)]">
      <div className="p-4">
        <Logo />
      </div>
      {/* <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div> */}
      <List>
        <div
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform`}
            />
          }
        >
         <Link className="flex items-center gap-4" href="/projects">
          <ListItem className="p-0">
            <div  className="border-b-0 p-3 flex">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Projects
              </Typography>
            </div>
          </ListItem>
          </Link>
        </div>
        <div
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform`}
            />
          }
        >
          <Link className="flex items-center gap-4" href="/store">

            <ListItem className="p-0" >
              <div className="border-b-0 p-3 flex">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Tools
                </Typography>
              </div>
            </ListItem>
          </Link>
        </div>
        <hr className="my-2 border-blue-gray-50" />
        {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        <Link href="/profile">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <ListItem onClick={(event) => { signOut() }}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}