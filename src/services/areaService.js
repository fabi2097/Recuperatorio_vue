import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  async getAreas() {
    const response = await axios.get(`${API_URL}/areas`);
    return response.data;
  },
  async addArea(area) {
    console.log("Intentando añadir área:", area);
    if (!area.name || area.name.trim() === '') {
      throw new Error('El nombre del área no puede estar vacío.');
    }

    const sendData = {
      name: area.name
    };

    const response = await axios.post(`${API_URL}/areas`, sendData);
    return response.data;
  },
  async updateArea(area) {

    if (!area.id || !area.name || area.name.trim() === '') {
      throw new Error('Los campos de nombre e ID son requeridos.');
    }

    const sendData = {
      name: area.name
    };

    const response = await axios.put(`${API_URL}/areas/${area.id}`, sendData);
    console.log("Respuesta al añadir área:", response);
    return response.data;
  },
  async deleteArea(areaId) {
    if (!areaId) {
      throw new Error('El ID del área es requerido para eliminar.');
    }

    const response = await axios.delete(`${API_URL}/areas/${areaId}`);
    return response.data;
  }
}
