import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const ModalLayout = ({visible, children, style, close}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}
    >
      <View 
        style={{...styles.container, ...style}}
      >
        <Pressable style={styles.backdrop} onPress={close}></Pressable>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default ModalLayout;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
    paddingTop: 220,
  },
  backdrop: {
    height: '100%',
    width: '100%',
    position: "absolute",
  },
  content: {
    position: "relative",
    zIndex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
  }
})