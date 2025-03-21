import { Button } from '@/components/ui/button';
import { CircleHelpIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

function CreateModelPage() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full text-center">
      <div className="bg-gradient-to-b from-[#d2d2d2] to-[#fefefe]">
        <div className="h-[40vh] bg-[url('/images/dao/bg.png')] bg-contain bg-center bg-no-repeat md:h-[40vh]"></div>
      </div>
      <div className="px-4">
        <div className="my-6 text-3xl font-semibold">Model Station</div>
        <div className="mb-10 text-center text-sm text-[#111215]">
          A one-stop solution to manage your AI models, create, bind, and
          distribute them with no coding required.
        </div>
        <div>
          <Button
            className="w-full py-8 md:max-w-96"
            onClick={() => {
              navigate('/createDaoForm');
            }}
          >
            <div>
              <div className="text-lg font-semibold">Upload Model</div>
              <div className="text-sm text-[#9FA5B3]">Existing Model</div>
            </div>
          </Button>
        </div>
        <div className="mt-2 flex items-start justify-center text-xs text-[#9FA5B3]">
          <span className="mx-1 h-4 pt-0.5">
            <CircleHelpIcon className="size-3" />
          </span>
          <span className="">
            Upload and link your existing model to manage and tokenize it.
          </span>
        </div>
        <div className="mt-8">
          <Button
            className="w-full border-black py-7 md:max-w-96"
            variant={'outline'}
            onClick={() => {
              navigate('/createDaoForm');
            }}
          >
            <div>
              <div className="text-lg font-semibold">Create Model</div>
              <div className="text-sm text-[#9FA5B3]">No Model?</div>
            </div>
          </Button>
        </div>
        <div className="mt-2 flex items-start justify-center text-xs text-[#9FA5B3]">
          <span className="mx-1 h-4 pt-0.5">
            <CircleHelpIcon className="size-3" />
          </span>
          <div>Build a custom LoRA-enhanced model using your data.</div>
        </div>
      </div>
    </div>
  );
}

export default CreateModelPage;
