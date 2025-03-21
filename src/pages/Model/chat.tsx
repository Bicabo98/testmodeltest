import { BackIcon } from "@/components/svg/icons/tabbar";
import ImgAavator from '/images/model/avator.png'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface Msg {
  role: string;
  content: string;
}

const Header = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className="py-5 pl-[10px]" onClick={() => goBack()}>
      <BackIcon />
    </div>
  ) 
}

const MessageItem = ({name, item}: {name:string, item: Msg}) => {
  return (
    <div>
      {
        item.role === 'assistant' ? (
          <div>
            <div>
              <img src={ImgAavator} alt="Model" className="w-[26px] h-[26px] rounded-[6px]" />
              <span>{name}</span>
            </div>
            <p>您好!很高兴为您提供帮助。如果您有任何问题或需要了解的信息，请随时告诉我，我会尽力为您详细解答。以下是一些可能的方向供您参考:</p>
          </div>
        ) : (
          <div className="rounded-lg bg-[#EEF0F6] p-[10px]">
            <p className="text-black text-base">{item.content}</p>
          </div>
        )
      }
    </div>
  )
}

const ChatPage = ({ modelName }: {modelName: string}) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {

  }, [])

  return (
    <div className="h-full flex flex-col px-[15px]">
      <Header />
      <div className="flex-1">
        {
          messages.map((item, index) => {
            return (
              <MessageItem item={item} name={modelName} key={index} />
            )
          })
        }
      </div>
      <footer className="w-full h-[42px] leading-[42px] indent-[5px] rounded-full border bg-[#F8F8F8] mb-[20px]">
        <input type="text" placeholder='send message' className='focus:outline-none flex-1 bg-transparent pl-[12px]' />
      </footer>
    </div>
  )
}

export default ChatPage; 