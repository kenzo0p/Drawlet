import axios from "axios"
import { BACKEND_URL } from "../../../config"
import { ChatRoom } from "../../../components/chat-room";
async function getRoom(slug : string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

interface Props {
    params : Promise<{ slug : string}>
}
export default async function ChatRoomPage ({params} : Props) {
    const slug = (await params).slug;
    const roomId = await getRoom(slug);
    return (
        <div>
            <ChatRoom id={roomId}/>
        </div>
    )
}