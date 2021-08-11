import React,{useState} from "react";
import { useEffect,useRef } from "react";
import { 
    Dimensions,
    Text,View,ActivityIndicator,Image,ScrollView
    ,RefreshControl
 } from "react-native";

 import Netinfo from "@react-native-community/netinfo";

 import Webview, { WebView } from "react-native-webview";


 import data from "../build_data/data.json";
 const Home=()=>
 {
    

    const WebViewRef=useRef()
    const [offline,setoffline]=useState(false)
    const [refr,setrefr]=useState(false)
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")
    const [pos,setpos]=useState(false)
    const [load,setload]=useState(false)
    const [firstLoad,setfirstLoad]=useState(true)
    const[splashVisible,setsplashVisibe]=useState(true)
    const {height,width}=Dimensions.get('screen')

    useEffect(
        ()=>
        {
        console.log("useeffect called")
        if(firstLoad)
        {
            setTimeout(
                ()=>
                {
                    setfirstLoad(false) 
                    setsplashVisibe(false)
                }
           ,3000 )
            
        }
         }
        ,[splashVisible]
    )
    useEffect(
        ()=>
        {
            const unsubscribe=Netinfo.addEventListener((state)=>
            {
              const OFFLINE=!(state.isConnected && state.isInternetReachable)
              if(OFFLINE)
              console.log('offline detected')
              else
              console.log('internet is avilable')
              setoffline(OFFLINE)
            }
            )
    
            return ()=>unsubscribe()
        }
    )
    const loadendprocess=()=>
    {
        setrefr(false)
        setload(false)
    }

   
    const loadstartProcess=()=>
    {
        setload(true)
    }

    const _onNavigationStateChange=(navState)=>
    {
        console.log(navState.url)
        setCanGoBack(navState.canGoBack)
        setCanGoForward(navState.canGoForward)
        setCurrentUrl(navState.url)
    }

    useEffect
    (
        ()=>
        {

            if(pos)
            {
                console.log("Ready TO TEST")
            }
        },[pos]
    )
    useEffect
    {
     ()=>
     { 
      BackHandler.addEventListener('hardwareBackPress',handleBackButton)
     }
      ,[]
    }

    //webview back navigation
    const  handleBackButton = ()=>
    {
        if (WebViewRef.current) WebViewRef.current.goBack()
          return true;
    }

    //if in future requires two ways naviagtion frombutton handlor
    const frontButtonHandler = () => {
        if (WebViewRef.current) WebViewRef.current.goForward()
      }


    //function for pull to refresh
    const refc=()=>
    {
        if (WebViewRef.current )  WebViewRef.current.reload()
      
        setrefr(true)
       // setpos(false)
    }
     
     
    return(
    
         <View
         style={
             {
               flex:1,  
             }
         }
         >
        
        {
        (!offline && (!splashVisible))&&
        
        <ScrollView 
        refreshControl={ <RefreshControl 
        refreshing={refr}
        enabled={pos}
        onRefresh={refc}
        ></RefreshControl>}
        contentContainerStyle={
            {
                flex:1
            }
        }
        style={{
            flex:1
            }}>
            
        <Webview
        ref={WebViewRef}
        source={
            {
                uri:data.url
            }
        }
        style={
            {
            

            
             flex:1,
              
              backgroundColor:"black",
              
            }
        }
        onLoadStart={
         ()=> loadstartProcess()
        }

        // onLoadProgress={
        //     (event)=>console.log(event)
        // }

       
        onLoadEnd={
           
            ()=>{console.log("Load succeed"),loadendprocess()}
        }
        onError={
            ()=>console.log("error loaded offline page")
        }

        onNavigationStateChange={navState => {
                _onNavigationStateChange(navState)
          
          }
        }
        onLoadProgress={
            ({nativeEvent})=>console.log(nativeEvent.progress*100)
        }
        //check postion of scroll for enable pull to refresh
        onScroll={syntheticEvent => {
           const { contentOffset } = syntheticEvent.nativeEvent
           console.log(contentOffset.y)
           if(contentOffset.y==0)
           setpos(contentOffset.y==0)
           else
            {
                if(pos)
                {
                    console.log("disabled pull to refresh")
                    setpos(false)
                }   
            }
          }}
        //enable pull to refreash for IOS no configure need for android
        pullToRefreshEnabled={true}

        //download the ftp
        allowFileAccessFromFileURLs={true}
        allowingReadAccessToURL={true}
        
        //add back/forward functionality
        allowsBackForwardNavigationGestures={true}

        //audio/video inside webview
        allowsInlineMediaPlayback={true}

        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}

        //popup support for android/ios
        setSupportMultipleWindows={true}
        javaScriptCanOpenWindowsAutomatically={true}

         
        allowsFullscreenVideo={true}
        userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
        javaScriptEnabled={true}
        cacheEnabled={true}


        //saves cookies like login data
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        />
        </ScrollView>
    }
        
        {(load && !(firstLoad) && (!refr)) &&  

        <ActivityIndicator 
        style={{backgroundColor:'white',
         height:50,
        width:50,
        borderRadius:50,
        position:"absolute",
        top:height/2-50,
        alignSelf:'center'}}

        size='large' color="gray" animating={true} >
        </ActivityIndicator>
        }    
            
        {(splashVisible ) &&
        <Image
        style={{height:height,width:width}}
        source={require('../splash.jpg')}
        >

        </Image>}
        {( offline) &&
        <Image
        style={{height:height,width:width}}
        source={require('../offline.jpg')}
        >

        </Image>}
        
         </View>
     )

 }

 
 export default Home