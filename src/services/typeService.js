import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  async getTypes() {
    const response = await axios.get(`${API_URL}/types`);
    return response.data;
  },
  async addType(type) {
    const sendData = {
        name: type.name
    };
    const response = await axios.post(`${API_URL}/types`, sendData);
    return response.data;
    },
  async updateType(type) {
    const response = await axios.put(`${API_URL}/types/${type.id}`, type);
    return response.data;
  },
  async deleteType(typeId) {
    const response = await axios.delete(`${API_URL}/types/${typeId}`);
    return response.data;
   },
}
