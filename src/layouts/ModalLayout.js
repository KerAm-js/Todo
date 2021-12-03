import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const ModalLayout = ({visible, closeModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <Pressable
        onPress={closeModal}
        style={styles.backdrop}
      >
        <View style={styles.backdropChild}>
        </View>
      </Pressable>
      <View style={styles.container}>
        {children}
      </View>
    </Modal>
  )
}

export default ModalLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backdropChild: {
    width: '100%',
    height: '100%',
  },
})