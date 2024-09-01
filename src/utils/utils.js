import RNFS from 'react-native-fs';

export const convertImageToBase64 = async uri => {
  try {
    const base64String = await RNFS.readFile(uri, 'base64');
    return `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    console.error('Error converting image to base64: ', error);
    throw error;
  }
};
