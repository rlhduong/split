import { Loader2Icon } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className="animate-spin h-5 w-5 text-white" />
    </div>
  );
};

export default Loader;
