import { Cog8ToothIcon, CogIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { getColor } from "../../../lib/colors";
import React from "react";
import { useSession } from "next-auth/react";
import { set } from "lodash";

export function ProjectMenu({projectName, setAlertType, setAlerted}) {
  const {data: session, status} = useSession();
  function deleteProject() {
   fetch ('/api/projects/delete', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
        name: projectName,
      })
      }).then(res => res.json()).then((response) => {
        if (response.success) {
          setAlertType('success')
          setAlerted(true)
        }
      })}

  return (
    <Menu>
      <MenuHandler>
        <Button className='rounded-full w-[52px]' variant="text">
          <EllipsisVerticalIcon className='h-7 w-7 ms-[-12px]' />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Add project users</MenuItem>
        <MenuItem>Edit project</MenuItem>
        <MenuItem>Duplicate project</MenuItem>
        <hr className="my-3" />
        <MenuItem className="text-[var(--message-warn)]" onClick={deleteProject}>Delete Project</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function ProjectCard({ project, setAlertType, setAlerted }) {
  const [color, setColor] = React.useState(getColor())
  return (
    <Card className="w-72 lg:w-96 2xl:w-[500px] shadow-none" style={{ background: color }}>
      <CardHeader floated={false} color="blue-gray" className="mt-0">
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium truncate">
            {project.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <ProjectMenu projectName={project.name} setAlertType={setAlertType} setAlerted={setAlerted}/>
          </Typography>
        </div>
        <Typography color="gray">
          {project.description == "" ? "No description" : project.description}
        </Typography>
        <div class="group inline-flex flex-wrap items-center gap-3">
        {Object.entries(project.items) == 0
        ? 
        <Button style={{ml:6, textTransform: 'inherit'}} variant="text" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">No items</Button>
        :
        <>
        {Object.entries(project.items).map(([item, amt]) => (
          <Button style={{ml:6, textTransform: 'inherit'}} variant="text" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">
            <Typography color="gray" className="font-semibold">{amt}</Typography>
            <Typography color="gray" className="text-sm">{item}</Typography>
          </Button>
        ))}
        
        </>
        }
        </div>
      </CardBody>
      {/* <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          Reserve
        </Button>
      </CardFooter> */}
    </Card>
  );
}