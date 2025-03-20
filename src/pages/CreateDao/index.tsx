import { Button } from "@/components/ui/button";
import { CircleHelpIcon } from "lucide-react";

function CreateDaoPage() {
  return <div className="w-full h-full text-center mt-[150px]">
    <div className=" h-20 bg-[url('/images/dao/bg.png')] bg-contain bg-no-repeat bg-center">

    </div>
    <div>Model Station</div>
    <div>A one-stop solution to manage your AI models, create, bind, and distribute them with no coding required.</div>
    <div>
      <Button>
        <div>
          <div>Upload Model</div>
          <div>Existing Model</div>
        </div>
      </Button>
    </div>
    <div className=" flex items-center justify-center">
      <CircleHelpIcon />
      <div>Upload and link your existing model to manage and tokenize it.</div>
    </div>
    <div>
      <Button>
        <div>
          <div>Upload Model</div>
          <div>Existing Model</div>
        </div>
      </Button>
    </div>
    <div className=" flex items-center justify-center">
      <CircleHelpIcon />
      <div>Upload and link your existing model to manage and tokenize it.</div>
    </div>

  </div>;
}

export default CreateDaoPage;
