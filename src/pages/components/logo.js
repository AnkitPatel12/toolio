import { Typography } from "@material-tailwind/react";
import {
    CubeTransparentIcon,
  } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="mb-2 flex items-center gap-4" href="/">
        <CubeTransparentIcon className="h-7 w-7" />
        <Typography variant="h5" color="blue-gray">
          Toolio
        </Typography>
    </Link>
  )
}