import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";

const ModalLayout = ({visible, closeModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.container}>
        {children}
      </View>
    </Modal>
  )
}

export default ModalLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
})