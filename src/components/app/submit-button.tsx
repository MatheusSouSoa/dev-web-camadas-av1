"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { ComponentProps } from "react";

export function SubmitButton(props: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      {...props}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : props.children}
    </Button>
  );
}
