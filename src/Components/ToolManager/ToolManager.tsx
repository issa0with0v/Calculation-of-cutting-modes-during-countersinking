import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '../Card/Card';
import { useTool } from '../../context/ToolContext';
import type { Tool } from '../../Dictionaries/tools';

const ToolManager: React.FC = () => {
  const {
    tools,
    selectedToolType,
    setSelectedToolType,
    addTool,
    updateTool,
    deleteTool,
    diameter,
    teeth,
    material,
  } = useTool();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>({
    id: '',
    label: '',
    image: '/images/tools/cylindrical.png',
  });

  const handleOpenAdd = () => {
    setIsEdit(false);
    setCurrentTool({
      id: Date.now().toString(),
      label: '',
      image: '/images/tools/cylindrical.png',
      toolMaterial: material,
      diameter: diameter,
      teeth: teeth,
    });
    setOpen(true);
  };

  const handleOpenEdit = (tool: Tool, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEdit(true);
    setCurrentTool({ ...tool });
    setOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTool(id);
  };

  const handleSave = () => {
    if (!currentTool.label.trim()) return;

    const toolToSave: Tool = {
      ...currentTool,
      toolMaterial: material,
      diameter: diameter,
      teeth: teeth,
    };

    if (isEdit) {
      updateTool(toolToSave);
    } else {
      addTool(toolToSave);
    }
    setOpen(false);
  };

  return (
    <Card title="Управление зенкерами">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          fullWidth
        >
          Добавить зенкер
        </Button>

        <List dense>
          {tools.map((tool) => (
            <ListItem key={tool.id} disablePadding divider>
              <ListItemButton
                selected={selectedToolType?.id === tool.id}
                onClick={() => setSelectedToolType(tool)}
              >
                <ListItemText
                  primary={tool.label}
                  secondary={
                    tool.diameter
                      ? `Ø${tool.diameter} мм, z=${tool.teeth}, ${tool.toolMaterial || ''}`
                      : undefined
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => handleOpenEdit(tool, e)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => handleDelete(tool.id, e)}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {isEdit ? 'Редактировать зенкер' : 'Добавить зенкер'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Название зенкера"
              value={currentTool.label}
              onChange={(e) =>
                setCurrentTool({ ...currentTool, label: e.target.value })
              }
              fullWidth
              size="small"
              autoFocus
            />
            <TextField
              label="Путь к фото"
              value={currentTool.image}
              onChange={(e) =>
                setCurrentTool({ ...currentTool, image: e.target.value })
              }
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ToolManager;