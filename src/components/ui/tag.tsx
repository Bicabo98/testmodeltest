import { cn } from "@/lib/utils"

interface TagProps {
  className?: string;
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({className, children}) => {
  return (
    <div className={cn('text-xs rounded-xs p-[2px]', className)}>
      {children}
    </div>
  );
};

export default Tag;