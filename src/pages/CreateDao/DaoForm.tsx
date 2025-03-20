import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleHelpIcon } from "lucide-react";

function CreateDaoFormPage() {
  return <div className="w-full h-full text-center mt-[150px]">
    <div>Name</div>
    <div>
      <Input />
    </div>
    <div>Description</div>
    <Input />
    <Input />
    <div>you can provide the RESTful API endpoint or hosting link for your model.</div>
    <div>
      <Button>
        <div>
          <div>Create Your ModelDAO</div>
        </div>
      </Button>
    </div>

  </div>;
}

export default CreateDaoFormPage;
