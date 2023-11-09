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
    <Card className="w-[100%] lg:w-[47%] xl:w-[31%] overflow-hidden shadow-lg">
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
    </Card>
  );
}