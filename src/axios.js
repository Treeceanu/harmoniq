import axios from 'axios';

const instance= axios.create({
    baseURL:'https://harmoniq-backend-gk2i.onrender.com/'
})

export default instance;