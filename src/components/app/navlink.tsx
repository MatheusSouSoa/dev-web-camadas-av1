"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

export function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const currentPage =
    props.href != "/"
      ? pathname.includes(props.href.toString())
      : props.href == pathname;

  return (
    <Button
      asChild
      className={props.className}
      variant={currentPage ? "default" : "ghost"}
    >
      <Link {...props} />
    </Button>
  );
}
