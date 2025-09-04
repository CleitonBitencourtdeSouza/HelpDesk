import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Chamado, ChamadoDto } from './types';
import { chamadosService } from './services/api';

const App: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingChamado, setEditingChamado] = useState<Chamado | null>(null);
  const [formData, setFormData] = useState<ChamadoDto>({
    titulo: '',
    descricao: '',
    prioridade: 'Media',
  });

  useEffect(() => {
    loadChamados();
  }, []);

  const loadChamados = async () => {
    const data = await chamadosService.getChamados();
    setChamados(data);
  };

  const handleOpenDialog = (chamado?: Chamado) => {
    if (chamado) {
      setEditingChamado(chamado);
      setFormData({
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        prioridade: chamado.prioridade,
      });
    } else {
      setEditingChamado(null);
      setFormData({
        titulo: '',
        descricao: '',
        prioridade: 'Media',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingChamado(null);
  };

  const handleSubmit = async () => {
    if (editingChamado) {
      // Atualizar chamado existente (simplificado)
      await loadChamados();
    } else {
      // Criar novo chamado
      const newChamado = await chamadosService.createChamado(formData);
      if (newChamado) {
        await loadChamados();
      }
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este chamado?')) {
      const success = await chamadosService.deleteChamado(id);
      if (success) {
        await loadChamados();
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    await chamadosService.updateStatus(id, newStatus);
    await loadChamados();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'error';
      case 'EmAndamento':
        return 'warning';
      case 'Fechado':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'error';
      case 'Media':
        return 'warning';
      case 'Baixa':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema HelpDesk
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Novo Chamado
        </Button>
      </Box>

      <Grid container spacing={3}>
        {chamados.map((chamado) => (
          <Grid item xs={12} md={6} lg={4} key={chamado.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {chamado.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {chamado.descricao}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={chamado.status}
                    color={getStatusColor(chamado.status) as any}
                    size="small"
                  />
                  <Chip
                    label={chamado.prioridade}
                    color={getPrioridadeColor(chamado.prioridade) as any}
                    size="small"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Criado em: {new Date(chamado.dataCriacao).toLocaleDateString('pt-BR')}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Box>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={chamado.status}
                      onChange={(e) => handleStatusChange(chamado.id, e.target.value)}
                    >
                      <MenuItem value="Aberto">Aberto</MenuItem>
                      <MenuItem value="EmAndamento">Em Andamento</MenuItem>
                      <MenuItem value="Fechado">Fechado</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => handleOpenDialog(chamado)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(chamado.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {chamados.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Nenhum chamado encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Clique em "Novo Chamado" para criar o primeiro chamado
          </Typography>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingChamado ? 'Editar Chamado' : 'Novo Chamado'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            variant="outlined"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Prioridade</InputLabel>
            <Select
              value={formData.prioridade}
              onChange={(e) => setFormData({ ...formData, prioridade: e.target.value as any })}
              label="Prioridade"
            >
              <MenuItem value="Baixa">Baixa</MenuItem>
              <MenuItem value="Media">Média</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingChamado ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
