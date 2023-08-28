import { useEffect, useState } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";

import { Colors } from "../../constants/style";

const ReferralScreen = () => {
  const [referralCode, setReferralCode] = useState("");
  const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  useEffect(() => {
    function generateCode() {
      const alphabetLength = alphabet.length;
      let result = "";

      for (let i = 0; i < alphabetLength; i++) {
        result += alphabet.charAt(Math.random() * alphabetLength);
      }
      setReferralCode(result);
    }

    generateCode();
  }, []);

  let code = referralCode.substring(0, 8);

  async function copyToClipboard(text) {
    await Clipboard.setStringAsync(text);
  }

  let referralLink = `https://easypay.com/signup/${code}`;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/referral.jpg")}
        style={styles.image}
      />
      <View>
        <Text style={styles.description}>
          Earn extra bucks with every referral
        </Text>
        <Text style={[styles.description, styles.desc2]}>
          Share your referral code with your friends and earn some reward.
        </Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={copyToClipboard.bind(this, code)}
        >
          <View style={styles.button1}>
            <Text style={[styles.text, styles.code]}>{code}</Text>
            <Text style={styles.text}>Tap to copy your referral code</Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={copyToClipboard.bind(this, referralLink)}
        >
          <View style={styles.button2}>
            <Text style={styles.text}>Share Referral Link</Text>
          </View>
        </Pressable>
      </View>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <Text style={[styles.text, styles.finalText]}>
          Check Your Referral Earnings
        </Text>
      </Pressable>
    </View>
  );
};

export default ReferralScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 12,
  },
  image: {
    width: "90%",
    height: 350,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    color: Colors.primary700,
  },
  desc2: {
    fontSize: 18,
    marginTop: -4,
  },
  buttons: {
    width: "90%",
    marginTop: 12,
    marginBottom: 12,
  },
  button1: {
    backgroundColor: Colors.primary900,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  button2: {
    backgroundColor: Colors.primary900,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  text: {
    color: Colors.primary50,
    fontFamily: "open-sans",
  },
  code: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    marginHorizontal: 16,
  },
  finalText: {
    color: Colors.primary900,
  },
  pressed: {
    opacity: 0.5,
  },
});
