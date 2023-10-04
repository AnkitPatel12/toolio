import { Typography } from "@material-tailwind/react";
import {
    CubeTransparentIcon,
  } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <div className="mb-2 flex items-center gap-4">
        <CubeTransparentIcon className="h-7 w-7" />
        <Typography variant="h5" color="blue-gray">
          Toolio
        </Typography>
      </div>
  )
}