import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createModelDao } from '@/lib/fetcher';
import { CircleHelpIcon } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
function CreateDaoFormPage() {
  const form = useForm();
  const navigate = useNavigate();
  const values = useWatch({
    control: form.control,
  });
  const handleCreateModel = useCallback(async () => {
    const values = form.getValues();
    try {
      const data = {
        name: values.name,
        avatar: values.avatar || 'https://example.com/avatar.png',
        description: values.description,
        participant_count: 10,
        class_name: 'example_class',
        api_key: values.endpoint,
        contributors: [],
      };
      const rs = await createModelDao(data);
      console.log(rs);
      toast.success('Create DAO Success');
      navigate('/model');
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  }, [form, navigate]);
  const isValidate = useMemo(() => {
    return values.name && values.description && values.endpoint;
  }, [values]);
  console.log(values);
  return (
    <div className="mt-20 h-full w-full px-6">
      <div className="my-4 font-semibold text-[#0E0E10]">Name</div>
      <div>
        <Input
          className="placeholder:text-[#9FA5B3]"
          placeholder="Please enter model name"
          {...form.register('name')}
        />
      </div>
      <div className="my-4 mt-10 font-semibold text-[#0E0E10]">Description</div>
      <Textarea
        placeholder="Please enter model description"
        className="placeholder:text-[#9FA5B3]"
        {...form.register('description')}
      />
      <Input
        placeholder="Input Model API Address"
        className="mt-6 placeholder:text-[#9FA5B3]"
        {...form.register('endpoint')}
      />
      <div className="my-4 text-xs text-[#9FA5B3]">
        you can provide the RESTful API endpoint or hosting link for your model.
      </div>
      <div className="flex items-center justify-center">
        <Button
          className="w-full py-8 md:max-w-96"
          disabled={!isValidate}
          onClick={handleCreateModel}
        >
          <div>
            <div>Create Your ModelDAO</div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CreateDaoFormPage;
