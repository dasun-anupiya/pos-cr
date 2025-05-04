import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  ArrowBack,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

const AddEmployee: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  const roles = [
    'Manager',
    'Cashier',
    'Sales Representative',
    'Inventory Manager',
    'Store Clerk',
  ];

  const departments = [
    'Sales',
    'Operations',
    'Inventory',
    'Customer Service',
    'Administration',
  ];

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

  const handleInputChange = (field: keyof EmployeeFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof EmployeeFormData) => (
    event: SelectChangeEvent
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically make an API call to save the employee
    console.log('Saving employee:', formData);
    navigate('/employees');
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t('employees:addEmployee')}
          </Typography>
        </Toolbar>
      </AppBar>

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
        <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/employees')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5">
              {t('employees:addEmployee')}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label={t('employees:form.name')}
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label={t('employees:form.email')}
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label={t('employees:form.phone')}
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees:form.role')}</InputLabel>
                  <Select
                    value={formData.role}
                    label={t('employees:form.role')}
                    onChange={handleSelectChange('role')}
                  >
                    <MenuItem value="Manager">{t('employees:roles.manager')}</MenuItem>
                    <MenuItem value="Cashier">{t('employees:roles.cashier')}</MenuItem>
                    <MenuItem value="Sales">{t('employees:roles.sales')}</MenuItem>
                    <MenuItem value="Inventory">{t('employees:roles.inventory')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees:form.department')}</InputLabel>
                  <Select
                    value={formData.department}
                    label={t('employees:form.department')}
                    onChange={handleSelectChange('department')}
                  >
                    <MenuItem value="Sales">{t('employees:departments.sales')}</MenuItem>
                    <MenuItem value="Operations">{t('employees:departments.operations')}</MenuItem>
                    <MenuItem value="Finance">{t('employees:departments.finance')}</MenuItem>
                    <MenuItem value="HR">{t('employees:departments.hr')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  type="date"
                  label={t('employees:form.joinDate')}
                  value={formData.joinDate}
                  onChange={handleInputChange('joinDate')}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees:form.status')}</InputLabel>
                  <Select
                    value={formData.status}
                    label={t('employees:form.status')}
                    onChange={handleSelectChange('status')}
                  >
                    <MenuItem value="active">{t('employees:status.active')}</MenuItem>
                    <MenuItem value="inactive">{t('employees:status.inactive')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '16px'
            }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/employees')}
              >
                {t('common:cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {t('common:save')}
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddEmployee; 