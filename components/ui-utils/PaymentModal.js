import { Modal, StyleSheet, SafeAreaView } from "react-native";

import Button from "../UI/Button";
import PaymentForm from "../screenComps/Transaction/Payment/PaymentForm";

const PaymentModal = ({
  isFunding,
  isModalVisible,
  fundDetails,
  setModalVisible,
  setIsFunding,
  fundWalletHandler,
}) => {
  function closeModalHandler() {
    setModalVisible(false);
  }

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <SafeAreaView style={styles.container}>
        <PaymentForm
          onPress={fundWalletHandler}
          isFunding={isFunding}
          fundDetails={fundDetails}
          setIsFunding={setIsFunding}
        />
        <Button onPress={closeModalHandler}>Close Modal</Button>
      </SafeAreaView>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
