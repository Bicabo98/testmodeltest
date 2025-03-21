import { BackIcon } from "@/components/svg/icons/tabbar";
import ImgAavator from '/images/model/avator.png'
import ImgEmoji from '/images/chat/emoji.png'
import ImgSend from '/images/chat/send.png'
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { aiChat, aiChatHistory } from '@/api/model';
import ReactMarkdown from 'react-markdown';

interface Msg {
  role: string;
  content: string;
}
const LoadingBubble = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '·';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start mr-2">
      <img src={ImgAavator} alt="AI" className="w-[26px] h-[26px] rounded-[6px] mr-2" />
      <div className="flex flex-col">
        <span className="font-semibold text-black">Model DAO</span>
        <div className="max-w-[80%] p-4 rounded-lg break-words bg-white text-black">
          <div className="flex items-center">
            <span className="text-gray-500">
              AI正在思考
              <span className="inline-block w-8 text-left">{dots}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ modelName }: { modelName: string }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className="bg-white flex items-center p-4 shadow-md">
      <div className="flex items-center cursor-pointer" onClick={goBack}>
        <div className="w-12 h-12 flex items-center justify-center">
          <BackIcon className="w-10 h-4" />
        </div>
      </div>
      <h1 className="flex-1 text-center">{modelName}</h1>
    </div>
  );
}
const MessageItem = ({ item }: { item: Msg }) => {
  return (
    <div className={`flex mb-2 ${item.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      {item.role === 'assistant' ? (
        <div className="flex items-start mr-2">
          <img src={ImgAavator} alt="AI" className="w-[26px] h-[26px] rounded-[6px] mr-2" />
          <div className="flex flex-col">
            <span className="font-semibold text-black">Model DAO</span>
            <div className="max-w-[80%] p-2 rounded-lg break-words bg-white text-black">
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <div className="max-w-[90%] p-2 rounded-lg break-words bg-[#E0F7FA] text-black">
            {item.content}
          </div>
          <div className="flex items-center ml-2">
            <div className="w-0.5 h-4 bg-transparent border-r border-gray-300 mr-1"></div>
            <img src={ImgAavator} alt="User" className="w-[26px] h-[26px] rounded-[6px]" />
          </div>
        </div>
      )}
    </div>
  );
};

const ChatPage = () => {
  const location = useLocation();
  const { modelName } = location.state || {};
  const [messages, setMessages] = useState<Msg[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = 'test_user_123';
  const sessionId = 'session_456'; // 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const fetchHistoryResponse = async () => {
      try {
        const aiResponse = await aiChatHistory({
          t: "chat",
          model_name: modelName,
          user_id: userId,
          session_id: sessionId,
        });
        const events = aiResponse.data.data.events.map((event: any) => {
          const roleTag = event.tags.find((tag: string[]) => tag[0] === 'role');
          const role = roleTag ? (roleTag[1] === 'user' ? 'user' : 'assistant') : 'assistant';
          return {
            role,
            content: event.content,
            created_at: event.created_at
          };
        });
  
        const groupedEvents = events.reduce((acc: any[], event: any) => {
          const lastGroup = acc[acc.length - 1];
          if (lastGroup && lastGroup[0].created_at === event.created_at) {
            if (event.role === 'assistant') {
              lastGroup.unshift(event); 
            } else {
              lastGroup.push(event); 
            }
          } else {
            acc.push([event]);
          }
          
          return acc;
        }, []);
        const historyMessages: Msg[] = groupedEvents
          .flat()
          .reverse()
          .map((event: any) => ({
            role: event.role,
            content: event.content
          }));
  
        setMessages(historyMessages);
      } catch (error) {
        console.error("Error fetching initial AI response:", error);
      }
    };
  
    fetchHistoryResponse();
  }, [modelName, userId, sessionId]);


  const sendMessage = async () => {
    if (!userMessage) return;
    const newMessage: Msg = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);
    try {
      const aiResponse = await aiChat({
        model_name: modelName,
        user_id: userId,
        session_id: sessionId,
        message: userMessage,
      });

      const aiMessage: Msg = { role: 'assistant', content: aiResponse.data.data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setUserMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <Header modelName={modelName} />
      <div className="h-10" />
      <div className="flex-1 overflow-y-auto px-[15px] pb-[170px]">
        {messages.map((item, index) => (
          <MessageItem item={item} key={index} />
        ))}
        {loading && (
          <div className="mt-2">
            <LoadingBubble />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-gray-300 p-4 fixed bottom-0 left-0 right-0 h-[150px] z-10">
        <div className="flex items-start gap-2 max-w-[800px] mx-auto">
          <textarea
            placeholder='send message'
            className='flex-1 min-h-[40px] max-h-[120px] bg-[#F5F5F5] rounded-lg px-3 py-2 focus:outline-none resize-none'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          {/* <button className="flex-shrink-0 p-2">
            <img src={ImgEmoji} alt="Emoji" className="w-12 h-12" />
          </button> */}
          <button
            onClick={sendMessage}
            className="flex-shrink-0 p-2"
          >
            <img src={ImgSend} alt="Send" className="w-10 h-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;