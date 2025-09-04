export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: 'Aberto' | 'EmAndamento' | 'Fechado';
  prioridade: 'Baixa' | 'Media' | 'Alta';
  dataCriacao: string;
  dataAtualizacao?: string;
  usuarioId: number;
  tecnicoId?: number;
}

export interface ChamadoDto {
  titulo: string;
  descricao: string;
  prioridade: 'Baixa' | 'Media' | 'Alta';
}
