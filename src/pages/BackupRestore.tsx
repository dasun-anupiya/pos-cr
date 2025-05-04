import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  Schedule as ScheduleIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import './BackupRestore.css';

interface BackupSchedule {
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  enabled: boolean;
  retentionDays: number;
  lastBackup: string;
  nextBackup: string;
}

interface BackupInfo {
  id: string;
  timestamp: string;
  size: number;
  status: 'completed' | 'inProgress' | 'failed';
  filename: string;
  createdBy: string;
}

const BackupRestore: React.FC = () => {
  const { t, i18n } = useTranslation(['security', 'common']);
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [backupSchedule, setBackupSchedule] = useState<BackupSchedule>({
    frequency: 'daily',
    time: '00:00',
    enabled: false,
    retentionDays: 30,
    lastBackup: '2024-03-20 00:00:00',
    nextBackup: '2024-03-21 00:00:00'
  });

  // Sample data - replace with actual data from your backend
  const [backups] = useState<BackupInfo[]>([
    {
      id: 'BKP-001',
      timestamp: '2024-03-15 10:00:00',
      size: 268435456, // 256MB in bytes
      status: 'completed',
      filename: 'backup_20240315_100000.zip',
      createdBy: 'system',
    },
    {
      id: 'BKP-002',
      timestamp: '2024-03-14 10:00:00',
      size: 267386880, // 255MB in bytes
      status: 'completed',
      filename: 'backup_20240314_100000.zip',
      createdBy: 'admin',
    },
  ]);

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
      case 'User Activity Logs':
        navigate('/user-activity-logs');
        break;
      case 'Backup & Restore':
        navigate('/backup-restore');
        break;
      default:
        if (mainTitle === 'Dashboard') {
          navigate('/dashboard');
        }
    }
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

  const getStatusColor = (status: BackupInfo['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'inProgress':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleBackup = () => {
    // Implement backup logic
    console.log('Creating backup...');
  };

  const handleRestore = (backupId: string) => {
    // Implement restore logic
    console.log('Restoring from backup:', backupId);
  };

  const handleDelete = (backupId: string) => {
    // Implement delete logic
    console.log('Deleting backup:', backupId);
  };

  const handleScheduleChange = (event: any) => {
    setBackupSchedule({
      ...backupSchedule,
      [event.target.name]: event.target.value,
    });
  };

  const formatSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
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
            {t('title', { ns: 'security' })}
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
        <div className="backup-restore-container">
          <div className="header-section">
            <Typography variant="h4" className="page-title">
              {t('title', { ns: 'security' })}
            </Typography>
            <div className="action-buttons">
              <Button
                variant="contained"
                color="primary"
                startIcon={<BackupIcon />}
                onClick={handleBackup}
                className="action-button"
              >
                {t('backup.create', { ns: 'security' })}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ScheduleIcon />}
                onClick={() => setScheduleDialogOpen(true)}
                className="action-button"
              >
                {t('backup.schedule', { ns: 'security' })}
              </Button>
            </div>
          </div>

          <div className="content-section">
            <div className="cards-container">
              {/* Backup Card */}
              <Card className="card">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BackupIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {t('backup.title', { ns: 'security' })}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('backup.description', { ns: 'security' })}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {t('backup.lastBackup', { ns: 'security' })}: {backupSchedule.lastBackup}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<BackupIcon />}
                    onClick={handleBackup}
                  >
                    {t('backup.create', { ns: 'security' })}
                  </Button>
                </CardActions>
              </Card>

              {/* Restore Card */}
              <Card className="card">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RestoreIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {t('restore.title', { ns: 'security' })}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('restore.description', { ns: 'security' })}
                  </Typography>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    {t('restore.warning', { ns: 'security' })}
                  </Alert>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<CloudUploadIcon />}
                    component="label"
                  >
                    {t('restore.button', { ns: 'security' })}
                    <input
                      type="file"
                      hidden
                      accept=".zip"
                      onChange={(e) => {/* Implement restore backup logic */}}
                    />
                  </Button>
                </CardActions>
              </Card>
            </div>

            {/* Backup Schedule */}
            <Card className="schedule-card">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ScheduleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {t('schedule.title', { ns: 'security' })}
                  </Typography>
                </Box>
                <div className="schedule-form-container">
                  <div className="schedule-form-item">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={backupSchedule.enabled}
                          onChange={(e) => setBackupSchedule({ ...backupSchedule, enabled: e.target.checked })}
                        />
                      }
                      label={t('schedule.autoBackup', { ns: 'security' })}
                    />
                  </div>
                  <div className="schedule-form-item">
                    <FormControl fullWidth>
                      <InputLabel>{t('schedule.frequency', { ns: 'security' })}</InputLabel>
                      <Select
                        value={backupSchedule.frequency}
                        label={t('schedule.frequency', { ns: 'security' })}
                        onChange={handleScheduleChange}
                        name="frequency"
                      >
                        <MenuItem value="daily">{t('schedule.daily', { ns: 'security' })}</MenuItem>
                        <MenuItem value="weekly">{t('schedule.weekly', { ns: 'security' })}</MenuItem>
                        <MenuItem value="monthly">{t('schedule.monthly', { ns: 'security' })}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="schedule-form-item">
                    <FormControl fullWidth>
                      <InputLabel>{t('schedule.time', { ns: 'security' })}</InputLabel>
                      <input
                        type="time"
                        name="time"
                        value={backupSchedule.time}
                        onChange={handleScheduleChange}
                        className="time-input"
                      />
                    </FormControl>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup History */}
            <Card className="history-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('history.title', { ns: 'security' })}
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('history.id', { ns: 'security' })}</TableCell>
                        <TableCell>{t('history.timestamp', { ns: 'security' })}</TableCell>
                        <TableCell>{t('history.size', { ns: 'security' })}</TableCell>
                        <TableCell>{t('history.createdBy', { ns: 'security' })}</TableCell>
                        <TableCell>{t('history.status', { ns: 'security' })}</TableCell>
                        <TableCell>{t('history.actions', { ns: 'security' })}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {backups.map((backup) => (
                        <TableRow key={backup.id}>
                          <TableCell>{backup.id}</TableCell>
                          <TableCell>{backup.timestamp}</TableCell>
                          <TableCell>{formatSize(backup.size)}</TableCell>
                          <TableCell>{backup.createdBy}</TableCell>
                          <TableCell>
                            <Chip
                              label={t(`status.${backup.status}`, { ns: 'security' })}
                              color={getStatusColor(backup.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="backup-actions">
                              <IconButton
                                color="primary"
                                onClick={() => handleRestore(backup.id)}
                                title={t('restore.button', { ns: 'security' })}
                              >
                                <RestoreIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDelete(backup.id)}
                                title={t('delete', { ns: 'security' })}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </Box>

      <Dialog open={scheduleDialogOpen} onClose={() => setScheduleDialogOpen(false)}>
        <DialogTitle>{t('schedule.title', { ns: 'security' })}</DialogTitle>
        <DialogContent>
          <div className="schedule-form">
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('schedule.autoBackup', { ns: 'security' })}</InputLabel>
              <Switch
                checked={backupSchedule.enabled}
                onChange={(e) => setBackupSchedule({ ...backupSchedule, enabled: e.target.checked })}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('schedule.frequency', { ns: 'security' })}</InputLabel>
              <Select
                value={backupSchedule.frequency}
                label={t('schedule.frequency', { ns: 'security' })}
                onChange={handleScheduleChange}
                name="frequency"
              >
                <MenuItem value="daily">{t('schedule.daily', { ns: 'security' })}</MenuItem>
                <MenuItem value="weekly">{t('schedule.weekly', { ns: 'security' })}</MenuItem>
                <MenuItem value="monthly">{t('schedule.monthly', { ns: 'security' })}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('schedule.time', { ns: 'security' })}</InputLabel>
              <input
                type="time"
                name="time"
                value={backupSchedule.time}
                onChange={handleScheduleChange}
                className="time-input"
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)}>
            {t('cancel', { ns: 'common' })}
          </Button>
          <Button variant="contained" color="primary" onClick={() => setScheduleDialogOpen(false)}>
            {t('save', { ns: 'common' })}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BackupRestore; 