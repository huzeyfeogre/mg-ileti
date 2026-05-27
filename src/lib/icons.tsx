import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getIcon = (name: string): LucideIcon => {
  const Ico = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Ico ?? Icons.Smartphone;
};

export const IconByName = ({ name, className }: { name: string; className?: string }) => {
  const Ico = getIcon(name);
  return <Ico className={className} />;
};
