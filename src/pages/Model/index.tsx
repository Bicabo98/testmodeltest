import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import SearchHeader from "./searchHeader";
import ImgAavator from '/images/model/avator.png'
import ImgStars from '/images/model/stars.png'
import Tag from '@/components/ui/tag'
import { Button } from "@/components/ui/button";
import { getModels, nostrMessage } from '@/api/model'
import { signedEvent } from './signedEvent'
import { Relay } from 'nostr-tools/relay'
import { useNavigate } from "react-router";

type ModelItem = {
  name: string;
  description: string;
}

function Model() {
  const navigate = useNavigate()
  const [list, setList] = useState([
    {
      // avatorImg: ImgAavator,
      // starImg: ImgStars,
      name: 'My Model',
      // modelStatus: 'Created',
      description: 'A fortune prediction  ...',
      // modelCost: 30,
      // modelEarn: 5,
    },
    {
      // avatorImg: ImgAavator,
      // starImg: ImgStars,
      name: 'My Model',
      // modelStatus: 'Purchased',
      description: 'A fortune prediction  ...',
      // modelCost: 30,
      // modelEarn: 5,
    }
  ])

  useEffect(() => {
    const getList = async () => {
      const res = await getModels()
      setList(res.data)
    }
    getList()
    const eventTemplate = {
      kind: 42,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
        ["e", "group_id"]
      ],
      content: "final test 111 msg",
    }
    const params = {
      "event": signedEvent(eventTemplate)
    }
    nostrMessage(params).then(res => {
      console.log('res', res)
    })
  }, [])

  useEffect(() =>{
    const connectWs = async () => {
      const relay = await Relay.connect('ws://213.136.84.124:10547')
      console.log(`connected to ${relay.url}`)
  
      relay.subscribe([
        {
          kinds: [42],
          "#e": ["chat_group_id"]
        }
      ], {
        onevent(event) {
          console.log('got event:', event)
        }
      })
    }
    connectWs()
  })

  const startChat = () => {
    navigate('/chat')
  }
  return (
    <div className="w-full px-[15px] h-full text-center mt-[44px]">
      <SearchHeader />
      <section className="mt-[20px]">
        {
          list.map((item, index) => {
            return (
              <ModelCardItem onClick={() => startChat()} key={index} {...item} className='mb-[12px]' />
            )
          })
        }
      </section>
    </div>
  )  
}

interface ModelCardItemProps {
  className?: string;
  // avatorImg: string;
  // starImg: string;
  name: string;
  // modelStatus: string; 
  description: string;
  onClick: () => void;
  // modelCost: number;
  // modelEarn: number;
}
function ModelCardItem({className, name, description, onClick} : ModelCardItemProps) {
  return (
    <div className={cn('flex items-center border-[0.5px] border-[#EAEAEA] rounded-lg py-[15px] pr-[12px] pl-[16px]', className)}>
      {/* <div className="mr-[8px]">
        <img src={avatorImg} alt="Model" className="w-[46px] h-[46px] rounded-lg mb-[2px]" />
        <img src={starImg} alt="Star" className="w-[48px] h-[11px]" />
      </div> */}
      <div className="text-left flex-1">
        <p className="flex items-center">
          <span className="text-sm mr-[6px]">{name}</span>
          {/* <Tag className="text-[#00C456] bg-[#DEF4E8]">{modelStatus}</Tag> */}
        </p>
        <div className="text-[#101010] text-xs text-ellipsis overflow-hidden">{description}</div>
        {/* <p className="text-[#9FA5B3] text-[10px]">Chat cost: {modelCost} energy</p>
        <p className="text-[#9FA5B3] text-[10px]">Chat Earn: {modelEarn} feedback-key</p> */}
      </div>
      <div className="flex gap-[5px] self-end">
        {/* { modelStatus === 'Created' && <Button className="py-[6px] px-[10px] rounded-full h-[28px] text-xs">Launch</Button> } */}
        <Button onClick={onClick} variant='outline' className="py-[6px] px-[10px] rounded-full h-[28px] text-xs border border-[#111215]">Chat</Button>
      </div>
    </div>
  )
}


export default Model;
