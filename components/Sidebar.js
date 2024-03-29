

import {Avatar,IconButton,Button} from '@material-ui/core'
import styled from 'styled-components'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth,db } from '../firebase';
import Chat from './Chat';

const Sidebar = () => {  

    const [user] = useAuthState(auth)
    const  userChatRef = db.collection('chats').where('users','array-contains',user.email) 
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = ()=>{
        const input  =  prompt('Please enter an email address for the user yuo wish to chat with')
        if(!input) return null;
        if(
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !==  user.email 
        ) {
            // We need to add the chat into the DB 'chats' collection if it  doesnt already exist and is valid
            db.collection('chats').add({
                users:[user.email, input]
            })
        } 
    }
    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find(
            (chat) => 
            chat.data().users.find(user => user === recipientEmail)?.length>0 
        ) 
 

    return (
        <Container>
            <Header>
                <UserAvatar onClick={()=> auth.signOut() } src={user.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/> 
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/> 
                <SearchInput placeholder="Search in chats" /> 
                
            </Search>
            <SidebarButton  onClick={createChat} >Start a new chat</SidebarButton>
            {/* List of  Chats */}
           
            { 
                chatsSnapshot?.docs.map((chat)=> 
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ) 

            }
        </Container>
    )
}

export default Sidebar

const Container = styled.div `

    flex:1;
    border-right:1px solid whitesmoke;
    height:100vh;
    min-width:300px;
    max-width:350px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`;

const SearchInput = styled.input `
    outline-width:0;
    border:none;
    flex:1;

`;  
const SidebarButton = styled(Button) `
     width:100%; 
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;  
 
const Header = styled.div `
    display:flex;
    justify-content: space-between;
    position: sticky;
    top:0;
    background: #fff;
    z-index:1;
    align-items:center;
    padding:15px;
    height:88px;
    border-bottom:1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar) `
    cursor:pointer;
    :hover{
        opacity:0.8;
    }
`;
const IconsContainer = styled.div ``;  
const Search = styled.div `
    display:flex;
    align-items:center;
    padding:20px;
    border-radius:2px;

`;  

