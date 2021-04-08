 import { Avatar, IconButton } from "@material-ui/core"
 import { useRouter } from "next/router"
 import { useAuthState } from "react-firebase-hooks/auth"
 import styled from "styled-components"
 import { auth, db } from "../firebase"
 import AttachFileIcon from '@material-ui/icons/AttachFile';
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
 import MicIcon from '@material-ui/icons/Mic';
 import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"
import { useRef, useState } from "react"
import firebase from "firebase"
import getRecipientEmail from "../utils/getRecipientEmail"
import TimeAgo from "timeago-react"

const ChatScreen = ({chat, messages}) => {
    const [user] = useAuthState(auth)
    const router =  useRouter()
    const [input, setInput] = useState("")

    const endOfMessagesRef = useRef(null)

    const [messagesSnapshot] = useCollection(
        db.collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp','asc')
    );
    const [recipientSnapshot] =  useCollection(
        db.collection('users').where('email','==',getRecipientEmail(chat.users,user))
    )
    const showMessages = ()=> {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message=>(
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{ 
                        ...message.data(),
                        timestamp:message.data().timestamp?.toDate().getTime()
                    }}
                 />
            ))
        }else {
            return JSON.parse(messages).map(message=>(
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                 />
            ))
        }
    }
    const ScrollToBotton = ()=> {
        endOfMessagesRef.current.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    }
    const sendMessage = (e)=> {
        e.preventDefault()

        //Update the last seen...
        db.collection('user').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            },
            {merge: true}
        )

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user:user.email, 
            photoURL: user.photoURL 
        })
        setInput("");
        ScrollToBotton()
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail =  getRecipientEmail(chat.users, user)


    return (
        <Container> 
            <Header>
                <IconButton>
                {recipient?(
                    <Avatar src={recipient?.photoURL} />
                ):(
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                 
                </IconButton> 
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot?(
                        <p>Last activo:{" "}
                            {recipient?.lastSeen?.toDate()?(
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                            ):(
                        "Unavailable"
                    )}
                        </p>     
                    ):(
                      <p>Loading Last active...</p>
                    )}
                
                </HeaderInformation> 
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon /> 
                    </IconButton>
                    <IconButton>  
                        <MoreVertIcon />
                    </IconButton>  
                </HeaderIcons> 
            </Header>
            <MessageContainer>
                {/* Show message */}
                {  showMessages()  }
                <EndOfMessage ref={endOfMessagesRef} /> 
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon/> 
                <Input value={input} onChange={(e) => setInput(e.target.value) } /> 
                <button hidden  disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>
                <MicIcon/> 
            </InputContainer>
        </Container>
    )
}

export default ChatScreen


const Input = styled.input `
    flex: 1;
    outline: none;
    border: none;
    border-radius:10px;
    background:whitesmoke;
    padding:10px;
    margin-left:15px;
    margin-right:15px;
`

const InputContainer = styled.form `
    display: flex;
    align-items:center;
    position: sticky;
    bottom:0;
    background:white;
    z-index:100;
    padding:10px;
`

const Container = styled.div `
   
`

const Header =  styled.div `
    position:sticky;
    display:flex;
    align-items:center;
    height:88px;
    top:0;
    z-index:100;
    background:white;
    padding:11px;
    border-bottom:1px solid whitesmoke;

    
`;

const HeaderInformation =  styled.div `
margin-left:15px;
flex:1;
>h3{
     margin-bottom:3px;
}
>p{
     font-size:14px;
     color:gray;
 }
`;
const HeaderIcons =  styled.div `
    display:flex;

`;
const MessageContainer =  styled.div ` 
    padding:30px;
    background:#e5ded8;
    min-height:98vh;
`;


const EndOfMessage =  styled.div `
 margin-bottom:56px;
`;
