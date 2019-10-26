import axios from 'axios';
import url from "./API";

export const register = async (data) => {
    const response = await axios.post(`${url}/registerUser`, data);
    return response;
};

export const loginUser = async (data) => {
    try {
      const response = await axios.post(`${url}/login`, data);
      return response;
    }catch (e) {
      //alert('BabyBoo Engine is not running. Please run Engine');
      this.alertPresent = true;
      return false;
    }
  };