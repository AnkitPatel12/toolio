import {
  Card,
  CardBody,
  CardHeader,
  Typography
} from "@material-tailwind/react";

import React from "react";
import { Tag } from "../tag";
import { CheckInModal } from "./checkInModal";
import { CheckOutModal } from "./checkOutModal";

export default function ItemCard({ item, setAlert, setAlerted }) {
  return (
    <Card className=" w-[100%] xl:w-[26rem] overflow-hidden shadow-lg">
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
        </div>
        <Typography color="black" className="mb-3">
          {item.description}
        </Typography>
        <div class="group inline-flex flex-wrap items-center gap-3 pt-2">
          <Tag content={`${item.quantity} of ${item.capacity} available`} />
          <Tag content={`$${item.price} per ${item.unit}`} />
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