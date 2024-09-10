import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

const LoadingSpinner = ({visible}) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  spinnerContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // White background for the box
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow effect for better visibility
  },
});

export default LoadingSpinner;
