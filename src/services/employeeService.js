import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Asume que tu json-server corre en este puerto.

export default {
  async getEmployees() {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  },
  async addEmployee(employee) {
    const response = await axios.post(`${API_URL}/employees`, employee);
    return response.data;
  },
  async updateEmployee(employee) {
    const response = await axios.put(`${API_URL}/employees/${employee.id}`, employee);
    return response.data;
  },
  async deleteEmployee(id) {
    try {
        const response = await axios.delete(`${API_URL}/employees/${id}`); // Nota la adición de API_URL aquí.
        return response.data;
    } catch (error) {
        throw error;
    }
},

}
