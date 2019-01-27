import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-burger-a78b1.firebaseio.com'
});

export default instance;
