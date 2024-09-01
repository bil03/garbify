import {signOut} from 'firebase/auth';
import {Firebase_Auth} from '../../config/Firebase';

const handleLogout = () => {
  signOut(Firebase_Auth)
    .then(() => {
      console.log('User signed out!');
      setModalVisible(false);
      // Navigasi ke halaman login jika diperlukan
    })
    .catch(error => {
      console.error('Logout failed:', error);
    });
};
