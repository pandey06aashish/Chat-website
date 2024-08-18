import React from 'react'
import './chat.css'
import LeftSidebar from '../../components/LeftSiderbar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className='chat'>
     <div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
     </div>
    </div>
  )
}

export default Chat