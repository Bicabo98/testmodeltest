import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleHelpIcon } from "lucide-react";
import { useForm } from "react-hook-form";

function CreateDaoFormPage() {
  const form = useForm();
  return <div className="w-full h-full mt-20 px-6">
    <div className=" text-[#0E0E10] font-semibold my-4">Name</div>
    <div>
      <Input {...form.register("name")}/>
    </div>
    <div className=" text-[#0E0E10] font-semibold my-4 mt-10">Description</div>
    <Textarea  {...form.register("description")}/>
    <Input placeholder="Input Model API Address" className=" mt-6 placeholder:text-[#9FA5B3]"
    {...form.register("endpoint")}
    />
    <div className=" text-[#9FA5B3] text-xs my-4">you can provide the RESTful API endpoint or hosting link for your model.</div>
    <div className=" flex items-center justify-center">
      <Button className="w-full py-8 md:max-w-96"
        disabled
      >
        <div>
          <div>Create Your ModelDAO</div>
        </div>
      </Button>
    </div>

  </div>;
}

export default CreateDaoFormPage;
