import { PlusIcon, SearchIcon } from '@/components/svg/icons/tabbar'
import { useNavigate } from 'react-router-dom';
// import { Input } from '@/components/ui/input'
const SearchHeader = () => {
  const navigate = useNavigate();
  const handlePlusClick = () => {
    window.open('https://model-dao-web.vercel.app/createModel', '_blank'); 
  };
  return (
    <div className="w-full h-[40px] flex gap-[10px]">
      <div className='flex-1 flex px-[20px] py-[10px] border border-[#111215] rounded-lg'>
        <SearchIcon />
        <input type="text" placeholder='search by Model name' className='focus:outline-none flex-1 bg-transparent pl-[12px]' />
      </div>
      <div 
        className='cursor-pointer w-[39px] h-[39px] flex items-center justify-center bg-black rounded-full' 
        onClick={handlePlusClick} 
      >
        <PlusIcon />
      </div>
    </div>
  );
};

export default SearchHeader;