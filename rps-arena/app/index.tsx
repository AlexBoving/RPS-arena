import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState<string | null>(null);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  useEffect(() => {
    if (picture) {
      console.log("Picture taken at", picture);
    }
  }, [picture]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <TouchableOpacity
        onPress={() => {
          handleTakePicture();
        }}
        style={styles.press}
      >
        <Text style={styles.text}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  press: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignSelf: "center",
  },
});
