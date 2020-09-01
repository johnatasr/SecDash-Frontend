import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://secdash.herokuapp.com/',
    baseURL: 'http://localhost:8000/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            let refresh_token = localStorage.getItem('refresh_token');
            let access_token = localStorage.getItem('access_token');

          if ( (refresh_token == '' || refresh_token == undefined || refresh_token == null) && 
                    ( access_token == '' || access_token == undefined || access_token == null ) ) {
              return
          }
          else {
            return axiosInstance
            .post('users/token/refresh/', {refresh: refresh_token})
            .then((response) => { 

                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                return axiosInstance(originalRequest);
            })
            .catch(err => {
                console.log(err)
            });
          }    
      }
      return Promise.reject(error);
  }
);
export default axiosInstance