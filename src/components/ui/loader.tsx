import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn(className)}>
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
