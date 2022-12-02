import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/admin">
      <img src="/logo.png" className="my-0 mx-auto pt-2 w-[180px]" />
    </Link>
  );
};

export default LogoIcon;
