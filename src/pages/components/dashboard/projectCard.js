import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography
} from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React from "react";
import { getColor } from "../../../lib/colors";
import { hash } from "../../../lib/crypto";
import { Tag } from "../tag";
import { EditProjectModal } from "./editProjectModal";

export default function ProjectCard({ project, setAlert, setAlerted }) {
  const [color, setColor] = React.useState(getColor())
  const [openEdit, setOpenEdit] = React.useState(false);
  function ProjectMenu({ project, setAlert, setAlerted }) {
    const { data: session, status } = useSession();

    function deleteProject() {
      fetch('/api/projects/delete', {
        method: 'POST',
        body: JSON.stringify({
          email: session.user.email,
          projectID: project.projectID,
        })
      }).then(res => res.json()).then((response) => {
        if (response.success) {
          setAlert({ type: 'success', message: response.message })
          setAlerted(true)
        } else {
          setAlert({ type: 'fail', message: response.message })
          setAlerted(true)
        }
      })
    }

    function leaveProject() {
      fetch('/api/projects/leave', {
        method: 'POST',
        body: JSON.stringify({
          userToRemove: session.user.email,
          projectID: project.projectID,
        })
      }).then(res => res.json()).then((response) => {
        if (response.success) {
          setAlert({ type: 'success', message: response.message })
          setAlerted(true)
        } else {
          setAlert({ type: 'fail', message: response.message })
          setAlerted(true)
        }
      })
    }

    function duplicateProject() {

      fetch('/api/projects/fetch', {
        method: 'POST',
        body: JSON.stringify({
          email: session.user.email,
        }),
      }).then(res => res.json()).then((response) => {
        let projects = response.projects
        let projectNames = projects.map(obj => obj.name);

        let baseName = project.name.split('_')[0];
        let suffix = project.name.split('_')[1];
        let count = suffix ? parseInt(suffix) : 0;

        let newName = count > 0 ? baseName + '_' + count : baseName;

        while (projectNames.includes(newName)) {
          count++;
          newName = baseName + '_' + count;
        }

        fetch('/api/projects/add', {
          method: 'POST',
          body: JSON.stringify({
            email: session.user.email,
            name: newName,
            description: project.description,
            projectID: hash(session.user.name + newName),
          }),
        }).then(res => res.json()).then((response) => {
          if (response.success) {
            setAlert({ type: 'success', message: response.message })
            setAlerted(true)
          } else {
            setAlert({ type: 'fail', message: response.message })
            setAlerted(true)
          }
        })

      })
    }

    return (
      <Menu>
        {project.projectID !== "" ?
          <Tooltip content="Click to copy unique ID" animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}>
            <Button style={{ ml: 6, textTransform: 'inherit' }} variant="text" className="max-w-[150px] h-[50px] truncate mt-[-35px] me-[27px]" onClick={() => { navigator.clipboard.writeText(project.projectID) }}>
              {project.projectID}
            </Button>
          </Tooltip>
          :
          <> </>
        }
        <MenuHandler>
          <div className="absolute end-1 top-1">

            <Button className='rounded-lg w-[40px] h-[50px]' variant="text">
              <EllipsisVerticalIcon className='h-8 w-8 ms-[-15px] mt-[-3px]' />
            </Button>
          </div>
        </MenuHandler>
        <MenuList className="mt-5">
          <MenuItem onClick={(e) => setOpenEdit(true)}>Edit project</MenuItem>
          {/* <MenuItem>Edit collaborators</MenuItem> */}
          <MenuItem onClick={duplicateProject}>Duplicate project</MenuItem>
          <hr className="my-3" />
          <MenuItem className="text-[var(--message-warn)]" onClick={project.users[0] === session.user.email ? deleteProject : leaveProject}>{project.users[0] === session.user.email ? "Delete Project" : "Leave Project"}</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Card className={`w-[100%] 2xl:w-[31%] shadow-lg`} style={{ background: color }}>

      <EditProjectModal project={project} openEdit={openEdit} setOpenEdit={setOpenEdit} setAlert={setAlert} setAlerted={setAlerted} />

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
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium truncate">
            {project.name}
            <p className="text-sm rounded-full">Owned by {project.users[0]}</p>
          </Typography>

          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <ProjectMenu project={project} setAlert={setAlert} setAlerted={setAlerted} />
          </Typography>
        </div>

        <Typography color="black" className="pt-2">
          {project.description == "" ? "No description" : project.description}
        </Typography>



        <Typography color="black" className="pt-4 pb-1 font-semibold">
          Collaborators
        </Typography>
        <div className="group inline-flex flex-wrap items-center gap-1">
          {
            project.users.length == 0 &&
            <Tag content="No collaborators" />}

          {project?.users?.map((user, index) => (
            <Tag key={index} content={user} />
          ))}

        </div>

        <Typography color="black" className="pt-4 pb-1 font-semibold">
          Items
        </Typography>
        <div className="group inline-flex flex-wrap items-center gap-2">
          {Object.entries(project.items) == 0
            ?
            <Tag content="No items" />
            :
            <>
              {Object.entries(project.items).map(([item, amt], index) => (
                <Tag key={index} content={`${amt} ${item}`} />
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