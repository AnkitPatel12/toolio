import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Logo from "./logo";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { sidebarState } from "../../atoms/sidebarAtom";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigateToProducts = () => {
    Router.push('/products');
  };

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-none rounded-none bg-[var(--app-container)]">
      <div className="p-4">
        <Logo />
      </div>
      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div>
      <List>
        <Accordion
          open={sidebar.projectsOpen}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${sidebar.projectsOpen ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={sidebar.projectsOpen}>
            <AccordionHeader onClick={() => setSidebar({...sidebar, projectsOpen: !sidebar.projectsOpen})} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                My Projects
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <Link className="mb-2 flex items-center gap-4" href="/projects">
                <ListItem >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  My Projects
                </ListItem>
              </Link>

            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={sidebar.toolStoreOpen}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${sidebar.toolStoreOpen ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={sidebar.toolStoreOpen}>
            <AccordionHeader onClick={() => setSidebar({...sidebar, toolStoreOpen: !sidebar.toolStoreOpen})} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Tool Store
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem onClick={navigateToProducts}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                    Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <Link className="mb-2 flex items-center gap-4" href="/profile">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
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