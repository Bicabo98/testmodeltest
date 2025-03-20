import { useState } from "react";
import { cn } from "@/lib/utils"
import SearchHeader from "./searchHeader";
import ImgAavator from '/images/model/avator.png'
import ImgStars from '/images/model/stars.png'
import Tag from '@/components/ui/tag'
import { Button } from "@/components/ui/button";

function Model() {
  const [list, setList] = useState([
    {
      avatorImg: ImgAavator,
      starImg: ImgStars,
      modelName: 'My Model',
      modelStatus: 'Created',
      modelDesc: 'A fortune prediction  ...',
      modelCost: 30,
      modelEarn: 5,
    },
    {
      avatorImg: ImgAavator,
      starImg: ImgStars,
      modelName: 'My Model',
      modelStatus: 'Purchased',
      modelDesc: 'A fortune prediction  ...',
      modelCost: 30,
      modelEarn: 5,
    }
  ])
  return (
    <div className="w-full px-[15px] h-full text-center mt-[44px]">
      <SearchHeader />
      <section className="mt-[20px]">
        {
          list.map((item, index) => {
            return (
              <ModelCardItem key={index} {...item} className='mb-[12px]' />
            )
          })
        }
      </section>
    </div>
  )  
}

interface ModelCardItemProps {
  className?: string;
  avatorImg: string;
  starImg: string;
  modelName: string;
  modelStatus: string; 
  modelDesc: string;
  modelCost: number;
  modelEarn: number;
}
function ModelCardItem({className, avatorImg, starImg, modelName, modelStatus, modelDesc, modelCost, modelEarn} : ModelCardItemProps) {
  return (
    <div className={cn('flex items-center border-[0.5px] border-[#EAEAEA] rounded-lg h-[94px] py-[15px] pr-[12px] pl-[16px]', className)}>
      <div className="mr-[8px]">
        <img src={avatorImg} alt="Model" className="w-[46px] h-[46px] rounded-lg mb-[2px]" />
        <img src={starImg} alt="Star" className="w-[48px] h-[11px]" />
      </div>
      <div className="text-left flex-1">
        <p className="flex items-center">
          <span className="text-sm mr-[6px]">{modelName}</span>
          <Tag className="text-[#00C456] bg-[#DEF4E8]">{modelStatus}</Tag>
        </p>
        <div className="text-[#101010] text-xs text-ellipsis overflow-hidden">{modelDesc}</div>
        <p className="text-[#9FA5B3] text-[10px]">Chat cost: {modelCost} energy</p>
        <p className="text-[#9FA5B3] text-[10px]">Chat Earn: {modelEarn} feedback-key</p>
      </div>
      <div className="flex gap-[5px] self-end">
        { modelStatus === 'Created' && <Button className="py-[6px] px-[10px] rounded-full h-[28px] text-xs">Launch</Button> }
        <Button variant='outline' className="py-[6px] px-[10px] rounded-full h-[28px] text-xs border border-[#111215]">Chat</Button>
      </div>
    </div>
  )
}


export default Model;
