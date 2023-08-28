import { useState, useEffect } from "react";
import { Alert, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Colors } from "../../../constants/style";
import { getCutomerImage } from "../../../utills/http/customer";
import { storeCutomerImage } from "../../../utills/http/customer";
import IconButton from "../../UI/IconButton";

const IdentityHeader = ({ cutomer }) => {
  const [image, setImage] = useState(null);

  let initial = cutomer && cutomer.first_name.slice(0, 1).toUpperCase();

  useEffect(() => {
    async function fetchCustomerImage() {
      try {
        const imageData = await getCutomerImage();

        const imageArray = Object.keys(imageData).map((key) => {
          return { id: key, ...imageData[key] };
        });

        setImage(imageArray[0].assets[0].uri);
      } catch (error) {
        Alert.alert(
          "Error!!!",
          `Could not get your image. If you have an image uploaded try again. If not, upload an image`
        );
      }
    }

    fetchCustomerImage();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await storeCutomerImage(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Account Settings</Text>
      {!image && <Text style={styles.initial}>{initial}</Text>}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 80 }}
        />
      )}
      <Text style={styles.name}>
        {cutomer && cutomer.first_name} {cutomer && cutomer.last_name}
      </Text>
      <IconButton icon="image" name="Update picture" onPress={pickImage} />
    </View>
  );
};

export default IdentityHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginBottom: 12,
  },
  initial: {
    backgroundColor: Colors.primary900,
    color: Colors.primary50,
    borderRadius: 50,
    textAlign: "center",
    fontFamily: "roboto-bold",
    fontSize: 34,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 12,
  },
  name: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
  },
});
