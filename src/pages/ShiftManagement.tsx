import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
  useTheme,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItemButton,
  Menu,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  People,
  Security,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface Shift {
  id: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

const ShiftManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 'SHIFT001',
      employeeName: 'John Doe',
      date: '2024-03-20',
      startTime: '09:00',
      endTime: '17:00',
      status: 'scheduled',
    },
    {
      id: 'SHIFT002',
      employeeName: 'Jane Smith',
      date: '2024-03-20',
      startTime: '13:00',
      endTime: '21:00',
      status: 'scheduled',
    },
    {
      id: 'SHIFT003',
      employeeName: 'Mike Johnson',
      date: '2024-03-20',
      startTime: '17:00',
      endTime: '01:00',
      status: 'scheduled',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
      case 'Employee List':
        navigate('/employees');
        break;
      case 'Shift Management':
        navigate('/shift-management');
        break;
      case 'Role-Based Access':
        navigate('/roles');
        break;
      default:
        if (mainTitle === 'Dashboard') {
          navigate('/dashboard');
        }
    }
  };

  const handleAddShift = () => {
    setSelectedShift(null);
    setOpenDialog(true);
  };

  const handleEditShift = (shift: Shift) => {
    setSelectedShift(shift);
    setOpenDialog(true);
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter(shift => shift.id !== shiftId));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShift(null);
  };

  const handleSaveShift = (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic to save shift
    handleCloseDialog();
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    handleLanguageClose();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/img/app-icon.png"
            alt="MKS Logo"
            sx={{
              width: 30,
              height: 'auto',
              mb: 3,
              marginTop: '15px',
              marginRight: '10px',
            }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t('shifts:title')}
          </Typography>
          <Clock />
          <IconButton
            color="inherit"
            onClick={handleLanguageClick}
            sx={{ ml: 2 }}
          >
            <LanguageIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 1 }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={languageAnchorEl}
        open={Boolean(languageAnchorEl)}
        onClose={handleLanguageClose}
      >
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('si')}>සිංහල</MenuItem>
        <MenuItem onClick={() => changeLanguage('ta')}>தமிழ்</MenuItem>
      </Menu>

      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 65,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 65,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.translationKey}>
                <ListItemButton onClick={() => handleMenuClick(item.title)}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  {drawerOpen && (
                    <>
                      <ListItemText primary={t(`menu.${item.translationKey}.title`)} />
                      {item.subItems ? (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />) : null}
                    </>
                  )}
                </ListItemButton>
                {item.subItems && (
                  <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.translationKey}
                          sx={{ pl: 4 }}
                          onClick={() => handleSubItemClick(item.title, subItem.title)}
                        >
                          <ListItemIcon>
                            <subItem.icon />
                          </ListItemIcon>
                          {drawerOpen && (
                            <ListItemText primary={t(`menu.${item.translationKey}.${subItem.translationKey}`)} />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {t('shifts:title')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/employees')}
                startIcon={<People />}
              >
                {t('employees:title')}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/roles')}
                startIcon={<Security />}
              >
                {t('employees:actions.manageRoles')}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddShift}
              >
                {t('shifts:addShift')}
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('shifts:employee')}</TableCell>
                  <TableCell>{t('shifts:date')}</TableCell>
                  <TableCell>{t('shifts:startTime')}</TableCell>
                  <TableCell>{t('shifts:endTime')}</TableCell>
                  <TableCell>{t('shifts:status')}</TableCell>
                  <TableCell>{t('common:actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.employeeName}</TableCell>
                    <TableCell>{shift.date}</TableCell>
                    <TableCell>{shift.startTime}</TableCell>
                    <TableCell>{shift.endTime}</TableCell>
                    <TableCell>{t(`shifts:status.${shift.status}`)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditShift(shift)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteShift(shift.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedShift ? t('shifts:editShift') : t('shifts:addShift')}
          </DialogTitle>
          <form onSubmit={handleSaveShift}>
            <DialogContent>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label={t('shifts:form.employee')}
                    defaultValue={selectedShift?.employeeName}
                    required
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    type="date"
                    label={t('shifts:form.date')}
                    defaultValue={selectedShift?.date}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    fullWidth
                    type="time"
                    label={t('shifts:form.startTime')}
                    defaultValue={selectedShift?.startTime}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    type="time"
                    label={t('shifts:form.endTime')}
                    defaultValue={selectedShift?.endTime}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    select
                    label={t('shifts:form.status')}
                    defaultValue={selectedShift?.status || 'scheduled'}
                    required
                  >
                    <MenuItem value="scheduled">{t('shifts:status.scheduled')}</MenuItem>
                    <MenuItem value="in-progress">{t('shifts:status.in-progress')}</MenuItem>
                    <MenuItem value="completed">{t('shifts:status.completed')}</MenuItem>
                    <MenuItem value="cancelled">{t('shifts:status.cancelled')}</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{t('common:cancel')}</Button>
              <Button type="submit" variant="contained">{t('common:save')}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ShiftManagement; 