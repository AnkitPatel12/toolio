import { Cog8ToothIcon, CogIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { getColor } from "../../../lib/colors";
import React from "react";
import { useSession } from "next-auth/react";
import { CheckOutModal, EditProjectModal } from "./checkOutModal";
import { CheckInModal } from "./checkInModal";

export default function ItemCard({ item, setAlert, setAlerted }) {
  const [color, setColor] = React.useState(getColor())
  const [checkInModal, setCheckInModal] = React.useState(false);
  const [checkOutModal, setCheckOutModal] = React.useState(false);

  return (
    <Card className="max-w-[24rem] overflow-hidden shadow-none border-gray-300 border-[1px]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={item.image}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="px-6 pb-3">
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {item.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            5.0
          </Typography>
        </div>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {item.description}
        </Typography>
        <div class="group inline-flex flex-wrap items-center gap-3">
          <Button style={{ ml: 6, textTransform: 'inherit' }} variant="outlined" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">
            {item.quantity} of {item.capacity} available
          </Button>
          <Button style={{ ml: 6, textTransform: 'inherit' }} variant="outlined" className="flex items-center gap-2 mt-2 bg-[var(--light-font)] rounded-full py-2 px-3">
            ${item.price} per {item.unit}
          </Button>
        </div>
      </CardBody>
      <div className="pt-3 px-6 mb-6 flex">
        <CheckOutModal item={item} setAlert={setAlert} setAlerted={setAlerted} />
        <CheckInModal item={item} setAlert={setAlert} setAlerted={setAlerted} />
      </div>
      {/* <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">January 10</Typography>
      </CardFooter> */}
    </Card>
  );
}