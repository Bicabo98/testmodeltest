import SearchHeader from "./searchHeader";
import ImgAavator from '/images/model/avator.png'

function Model() {
  return (
    <div className="w-full px-[15px] h-full text-center mt-[44px]">
      <SearchHeader />
      <section className="mt-[20px]">
        <div className="border-[0.5px] border-[#EAEAEA] rounded-lg h-[94px] py-[15px] pr-[12px] pl-[16px]">
          <img src={ImgAavator} alt="Model" className="w-[46px] h-[46px] rounded-lg" />
        </div>
      </section>
    </div>
  ) 
    
}

export default Model;
