import {Circle} from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display: 'grid',placeItems:'center', height:'100vh'}} >
            <div>
                <img 
                src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png"
                style={{marginBottom:10}}
                height={200}
                    />
                <Circle color="#3cbc28"  size={60} />
            </div>
        </center>
    )
}

export default Loading 
