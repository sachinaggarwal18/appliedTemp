import { arrayRemove, arrayUnion, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";
import { useState } from "react";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteChat = async () => {
    if (!chatId) return;
  
    const chatDocRef = doc(db, "chats", chatId);
  
    try {
      await deleteDoc(chatDocRef);
      resetChat();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat()
  };
  
  const [isChatSettingsVisible, setChatSettingsVisible] = useState(false);

  const handleChatSettingsToggle = () => {
    setChatSettingsVisible(!isChatSettingsVisible);
  };

  const [isSharedPhotosVisible, setSharedPhotosVisible] = useState(false);

  const handleSharedPhotosToggle = () => {
    setSharedPhotosVisible(!isSharedPhotosVisible);
  };

  const [isSharedFilesVisible, setSharedFilesVisible] = useState(false);

  const handleSharedFilesToggle = () => {
    setSharedFilesVisible(!isSharedFilesVisible);
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={isChatSettingsVisible ? "./arrowUp.png" : "./arrowDown.png"} alt="" onClick={handleChatSettingsToggle} />
            </div>
            {isChatSettingsVisible && (
              <button onClick={handleBlock}>
                {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}
              </button>
            )}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={isSharedPhotosVisible ? "./arrowUp.png" : "./arrowDown.png"} alt="" onClick={handleSharedPhotosToggle} />
          </div>
          {isSharedPhotosVisible && (
            <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
            )}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={isSharedFilesVisible ? "./arrowUp.png" : "./arrowDown.png"} alt="" onClick={handleSharedFilesToggle} />
          </div>
        </div>
        <button className="deleteChat" onClick={handleDeleteChat}>
          Delete Chat
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
