import styled from "styled-components"
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../firebase"
import moment from "moment"

const Message = ({user,message}) => {
    const [userLoggedIn] =  useAuthState(auth)
    const TypeOfMessage = user ===  userLoggedIn.email? Sender : Reciever
    return (
        <Container>
            <TypeOfMessage> 
            {message.message}
                <Timestamp>
                    {message.timestamp? moment(message.timestamp).format('LT'):'...'}
                </Timestamp>
            </TypeOfMessage> 
        </Container>
    )
}

export default Message

const Container = styled.div ``

const MessageElement = styled.p `
    width:fit-content;
    padding:13px 15px;
    border-radius:8px;
    margin:10px ;
    min-width:60px;
    padding-bottom:28px;
    position:relative;
    text-align:right; 
    &::after,&::before{
        content: '';
        position: absolute;
        top: 0;
        z-index: 80;
        display: block; 
        border-width:8px ;
        border-style:solid; 
        border-color:transparent;
    }
`

const Sender = styled(MessageElement) `
    margin-left:auto;
    background-color:#dcf8c6;
    &::after { 
        right: -10px;  
        border-color:  #dcf8c6  transparent  transparent #dcf8c6  ;  
    }
`
const Reciever = styled(MessageElement) `
    background-color:whitesmoke;
    text-align: left;
    &::before { 
        left: -10px;  
        border-color: whitesmoke whitesmoke transparent transparent ; 
       
    }
`
const Timestamp = styled.span `
    color:gray;
    padding:10px;
    font-size:9px;
    position: absolute;
    bottom:0;
    text-align:right;
    right:0;
  
   
`