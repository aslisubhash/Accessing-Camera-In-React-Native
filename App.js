
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';


import {RNCamera} from "react-native-camera";

const PendingView = () => (
  <View
  style = {{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }}
  >
    <Text style = {{
      fontSize: 30,
      color: "red"
    }}>Loading...</Text>
  </View>
)


const App = () => {
  const [image, setImage] = useState(null)
  const takePicture = async (camera) => {
    try {
      const options= {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <View
    style = {styles.container}>
      {image ? (
        <View style = {styles.preview}>
          <Text style= {styles.camtext}>Here is your new profile pic.</Text>
          <Image style = {styles.clicked} source={{uri: image, width: "100%", height: "80%"}} />
          <Button
          title = "Click New Image"
          onPress = {()=> {
            setImage(null)
          }}
          ></Button>
        </View>
        
      ) : (
        <RNCamera
        style= {styles.preview}
        type = {RNCamera.Constants.Type.back}
        captureAudio = {false}
        flashMode = {RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions = {{
          title: "Permission to use camera",
          message : "longer text to use camera",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio",
          message : "longer text to use audio",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }}
        >
          {({camera, status})=>{
            if (status !== "READY") return <PendingView/>
            return (
              <View
              style= {{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center"
              }}
              >
                <TouchableOpacity
                style = {{
                  flex: 0,
                  backgroundColor: "orange",
                  padding: 20,
                  alignSelf: "center"
                }}center
                onPress = {()=>takePicture(camera)}
                >
                  <Text
                  style={{fontWeight: "bold", fontSize: 20, color: "white"}}
                  >Snap</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      )}
    </View>
    </>
  )
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0A79DF"

  },
  preview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  camtext : {
    backgroundColor: "#3498DB",
    color: "#FFF",
    width : "100%",
    textAlign : "center",
    marginTop: 40,
    marginBottom: 100,
    paddingVertical: 20,
    fontSize : 20,
    fontWeight: "bold"
  },
  clicked : {
    width: 250,
    height: 250,
    borderRadius: 150,
    marginBottom: 50,

  }

})