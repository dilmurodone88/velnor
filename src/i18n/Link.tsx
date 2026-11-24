"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocalePath } from "./I18nProvider";

// next/link o'rniga: ichki havolalarga avtomatik til prefiksi qo'shadi ("/aloqa" -> "/ru/aloqa")
export function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const lp = useLocalePath();
  return <NextLink href={typeof href === "string" ? lp(href) : href} {...rest} />;
}
export default Link;
