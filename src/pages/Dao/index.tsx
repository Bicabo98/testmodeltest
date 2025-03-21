import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import SearchHeader from "./daoSearchHeader";
import { signedEvent } from "./signedEvent";
import ImgAavator from '/images/model/avator.png'
import { Button } from "@/components/ui/button";
import { daoChatCount, getModels, nostrMessage } from '@/api/model'
import { Relay } from 'nostr-tools/relay'
import { useNavigate } from "react-router";

type ModelItem = {
  name: string;
  description: string;
}

function Dao() {
  const navigate = useNavigate()
  const [list, setList] = useState<ModelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatCount, setChatCount] = useState(0);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getModels();
        console.log('modellist=', res.data.data);
        // let modelsArray = Object.values(res.data.data) as ModelItem[];
        let modelsArray = Object.values(res.data.data).map((model: any) => ({
          ...model,
          name: "Ada's ModelDAO"
        })) as ModelItem[];
        setList(modelsArray);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    }
    const getChatCount = async () => {
      try {
        const chatCountRes = await daoChatCount({
          user_id: 'user789'
        })
        setChatCount(chatCountRes.data.data.count);
        console.log('chatCountRes=', chatCountRes);
      } catch (error) {
        console.error('Error fetching chat count:', error);
      }

    }
    getList();
    getChatCount();
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

  // useEffect(() => {
  //   const connectWs = async () => {
  //     const relay = await Relay.connect('ws://213.136.84.124:10547')
  //     console.log(`connected to ${relay.url}`)

  //     relay.subscribe([
  //       {
  //         kinds: [42],
  //         "#e": ["chat_group_id"]
  //       }
  //     ], {
  //       onevent(event) {
  //         console.log('got event:', event)
  //       }
  //     })
  //   }
  //   connectWs()
  // })

  const startChat = (modelName: string) => {
    // navigate('/daoChat', { state: { modelName: modelName } });
    //navigate('/daoChat', { state: { modelName } })
    navigate('/daoChat');
  }
  return (
    <div className="w-full px-[15px] h-full text-center mt-[44px]">
      <SearchHeader />
      <section className="mt-[20px]">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
              <span className="mt-2 text-gray-500">Loading models...</span>
            </div>
          </div>
        ) : (
          list.map((item, index) => (
            <ModelCardItem
              avatorImg={""}
              starImg={""}
              modelStatus={""}
              modelCost={0}
              modelEarn={0}
              onClick={() => startChat(item.name)}
              key={index}
              chatCount={chatCount}
              {...item}
              className='mb-[12px]'

            />
          ))
        )}
      </section>
    </div>
  )
}

interface ModelCardItemProps {
  className?: string;
  avatorImg: string;
  starImg: string;
  name: string;
  modelStatus: string;
  description: string;
  onClick: () => void;
  modelCost: number;
  modelEarn: number;
  chatCount: number,
}
function ModelCardItem({ className, name, description, chatCount, onClick }: ModelCardItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn(
      'flex flex-col border-[0.5px] border-[#EAEAEA] rounded-lg transition-all duration-300',
      isExpanded ? 'mb-[100px]' : 'mb-[12px]',
      className
    )}>
      <div className="flex items-center py-[15px] pr-[12px] pl-[16px]">
        <div className="mr-[8px]">
          <img src={ImgAavator} alt="Model" className="w-[46px] h-[46px] rounded-lg mb-[2px]" />
        </div>
        <div className="text-left flex-1">
          <div className="text-lg font-bold mr-[6px]">{name}</div>
          <div className="text-[#101010] text-xs text-ellipsis overflow-hidden">{description}</div>
          <div className="h-2" />
          <div className="flex items-center">
            <div className="flex">
              <img src={ImgAavator} alt="User" className="w-[20px] h-[20px] rounded-full" />
              <img src={ImgAavator} alt="User" className="w-[20px] h-[20px] rounded-full -ml-3" />
              <img src={ImgAavator} alt="User" className="w-[20px] h-[20px] rounded-full -ml-3" />
              <img src={ImgAavator} alt="User" className="w-[20px] h-[20px] rounded-full -ml-3" />
            </div>
            <span className="text-[#101010] text-xs text-ellipsis overflow-hidden ml-2">30k</span>
          </div>
        </div>
        <div className="flex flex-col gap-[5px] self-end">
          <Button
            onClick={onClick}
            variant='outline'
            className="py-[6px] px-[10px] rounded-full h-[28px] text-xs border border-[#111215] bg-black text-white"
          >
            Enter Chat
          </Button>
          <Button
            onClick={toggleExpand}
            variant='ghost' 
            className="py-[6px] px-[10px] h-[28px] text-xs text-gray-600 hover:bg-transparent" 
          >
            {isExpanded ? 'Close ▲' : 'Expand ▼'}
          </Button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-[16px] py-[12px] bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-bold text-sm">Key Type</div>
            <div className="font-bold text-sm">Count</div>
            <div className="font-bold text-sm">Circulating Supply</div>
            <div>Chat Key</div>
            <div>{chatCount}</div>
            <div>--</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dao;
