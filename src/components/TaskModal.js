import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import GradientLayout from "../layouts/GradientLayout";

const TaskModal = ({visible, closeModal}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <GradientLayout>
        <View style={styles.container}>
          <Button 
            title="close" 
            onPress={closeModal}
          />
        </View>
      </GradientLayout>
    </Modal>
  )
}

export default TaskModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
})