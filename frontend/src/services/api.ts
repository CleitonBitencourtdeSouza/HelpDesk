import axios from 'axios';
import { Chamado, ChamadoDto } from '../types';

const API_BASE_URL = 'http://localhost:5215/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chamadosService = {
  async getChamados(): Promise<Chamado[]> {
    try {
      const response = await api.get('/chamados');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
      return [];
    }
  },

  async createChamado(chamado: ChamadoDto): Promise<Chamado | null> {
    try {
      const response = await api.post('/chamados', chamado);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
      return null;
    }
  },

  async updateStatus(id: number, status: string): Promise<Chamado | null> {
    try {
      const response = await api.put(`/chamados/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return null;
    }
  },

  async deleteChamado(id: number): Promise<boolean> {
    try {
      await api.delete(`/chamados/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao deletar chamado:', error);
      return false;
    }
  },
};

export default api;
