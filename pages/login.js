import { Button } from '@material-ui/core';
import Head from 'next/head'
import styled from 'styled-components'
import { auth,provider } from '../firebase';

function Login() {
    const loginIn = () => {
        auth.signInWithPopup(provider).catch(alert)  
    }
    return (
        <div>
            <Container>
                <Head >
                    <title>Login</title> 
                </Head>  
                 <LoginContainer> 
                    <Logo src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png" ></Logo>
                    <Button onClick={loginIn}  variant="outlined" >Sign in  with Google</Button>
                 </LoginContainer>
            </Container>
        </div>
    )
}

export default Login

const Container = styled.div `
    display:grid;
    place-items:center;
    height:100vh;
    background: whitesmoke;
`;
const LoginContainer = styled.div `
    display:  flex; 
    flex-direction:column; 
    padding:100px;
    background-color:white;
    box-shadow: -4px 8px 5px 1px rgba(0,0,0,0.02),-12px 20px 15px 0 rgba(0,0,0,0.01) ;
    border-radius:10px;
   
`;
const Logo = styled.img `
    height:200px;
    width:200px; 
    margin-bottom:3em;
`;