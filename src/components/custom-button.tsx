import { VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function CustomButton({
  className,
  variant,
  size,
  icon,
  tooltip,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon: ReactNode;
    tooltip: string;
  }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button className={className} variant={variant} size={size} {...props}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
