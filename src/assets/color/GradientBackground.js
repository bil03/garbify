import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({style, children}) => {
  return (
    <LinearGradient
      colors={['#66ff99', '#33cc66']} // Warna gradien bisa disesuaikan
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
