import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
    color:{
        primary:{
            main:'#058da8',
            on:'#f9f9ff',
            opacity:(value=1.0)=>`rgba(5, 141, 168,${value})`
        },
        secondary:{
            main:"#efa200",
            on:"#f9f9ff",
            opacity:(value=1.0)=>`rgba(239, 162, 0,${value})`
        },
        background:"#efefef",
        foreground:"white",
        onBackground:"#595959",
        onForeGround:"#595959",
        light:'#f9f9ff',
        dark:"#202021",
        white:"white",
        black:"black",
        blackOpacity:(value=1.0)=>`rgba(0, 0, 0,${value})`,
        grey:"#a9a9ad",

    },
    windowWidth,
    windowHeight,
    percentageHeight:(number)=>windowHeight*number/100,
    percentageWidth:(number)=>windowWidth*number/100
}