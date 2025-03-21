import { BackIcon } from "@/components/svg/icons/tabbar";
import ImgAavator from '/images/model/avator.png'
import ImgSend from '/images/chat/send.png'
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { aiChatHistory, daoChat } from '@/api/model';
import { Button } from "@/components/ui/button";


interface Msg {
    role: string;
    content: string;
}


const Header = ({ modelName }: { modelName: string }) => {
    const navigate = useNavigate();
    const [showComingSoon, setShowComingSoon] = useState(false);
    const goBack = () => {
        navigate(-1);
    }
    const handleThreeDotsClick = () => {
        setShowComingSoon(true)
        setTimeout(() => setShowComingSoon(false), 2000);
    }
    return (
        <div className="bg-white flex items-center p-4 shadow-md">
            <div className="flex items-center cursor-pointer" onClick={goBack}>
                <div className="w-12 h-12 flex items-center justify-center">
                    <BackIcon className="w-10 h-4" />
                </div>
            </div>
            <h1 className="flex-1 text-center">{modelName}</h1>
            <div className="relative">
                <Button
                    onClick={handleThreeDotsClick}
                    variant='ghost'
                    className="text-gray-600"
                >
                    •••
                </Button>
                {showComingSoon && (
                    <div className="absolute right-0 mt-2 bg-gray-200 text-gray-800 p-2 rounded shadow-lg">
                        Coming soon
                    </div>
                )}
            </div>
        </div>
    );
};

const MessageItem = ({ item }: { item: Msg }) => {
    return (
        <div className={`flex mb-2 ${item.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            {item.role === 'assistant' ? (
                <div className="flex items-start mr-2">
                    <img src={ImgAavator} alt="AI" className="w-[26px] h-[26px] rounded-[6px] mr-2" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-black">Model DAO</span>
                        <div className="max-w-[100%] p-2 rounded-lg break-words bg-white text-black">
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

const DaoChatPage = () => {
    const location = useLocation();
    const { modelName } = location.state || {};
    const [messages, setMessages] = useState<Msg[]>([]);
    const [userMessage, setUserMessage] = useState('');

    const group_id = "group123";
    const user_id = 'user7891';
    const sender_id = 'user456'; // 
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchHistoryResponse = async () => {
            try {
                const aiResponse = await aiChatHistory({
                    t: "daochat",
                });
                const events = aiResponse.data.data.events.map((event: any) => {
                    const roleTag = event.tags.find((tag: string[]) => tag[0] === 'user_id');

                    const role = roleTag ? (roleTag[1] === user_id ? 'user' : 'assistant') : 'assistant';
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
    }, [modelName, user_id, group_id]);

    const sendMessage = async () => {
        if (!userMessage) return;
        const newMessage: Msg = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newMessage]);
        try {
            const daoChatResponse = await daoChat({
                group_id: group_id,
                user_id: user_id,
                sender_id: sender_id,
                message: userMessage,
            });

            console.log('daoChatResponse=', daoChatResponse);

            const aiMessage: Msg = { role: 'assistant', content: daoChatResponse.data.data.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setUserMessage('');
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

export default DaoChatPage;