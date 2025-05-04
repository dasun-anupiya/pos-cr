import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  SelectChangeEvent,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  ArrowBack,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import '../styles/customer-management.css';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const EditEmployee: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const [employee, setEmployee] = useState<Employee>({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (id) {
      // Fetch employee data for editing
      // This is a placeholder for demonstration
      const dummyEmployee: Employee = {
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+94 77 123 4567',
        role: 'Manager',
        department: 'Sales',
        status: 'active',
        joinDate: '2023-01-15',
      };
      setEmployee(dummyEmployee);
    }
  }, [id]);

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
      case 'New Sale (POS Terminal)':
        navigate('/pos-terminal');
        break;
      case 'Sales History':
        navigate('/sales-history');
        break;
      case 'Refunds & Returns':
        navigate('/refunds-returns');
        break;
      case 'Customer Orders':
        navigate('/customer-orders');
        break;
      case 'Pending Orders':
        navigate('/pending-orders');
        break;
      case 'Completed Orders':
        navigate('/completed-orders');
        break;
      case 'Canceled Orders':
        navigate('/canceled-orders');
        break;
      case 'Product List':
        navigate('/product-list');
        break;
      case 'Add New Product':
        navigate('/add-product');
        break;
      case 'Stock Management':
        navigate('/stock-management');
        break;
      case 'Low Stock Alerts':
        navigate('/low-stock-alerts');
        break;
      case 'Customer List':
        navigate('/customer-list');
        break;
      case 'Loyalty Program':
        navigate('/loyalty-program');
        break;
      case 'Customer Feedback':
        navigate('/customer-feedback');
        break;
      case 'Employee List':
        navigate('/employee-list');
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

  const handleTextFieldChange = (field: keyof Employee) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmployee(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof Employee) => (
    event: SelectChangeEvent
  ) => {
    setEmployee(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle employee save/update
    console.log('Save employee:', employee);
    navigate('/employee-list');
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
            {t('app.title')}
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar />
        <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/employees')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5">
              {t('employees.editEmployee')}
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
                  label={t('employees.form.name')}
                  value={employee.name}
                  onChange={handleTextFieldChange('name')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label={t('employees.form.email')}
                  type="email"
                  value={employee.email}
                  onChange={handleTextFieldChange('email')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label={t('employees.form.phone')}
                  value={employee.phone}
                  onChange={handleTextFieldChange('phone')}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees.form.role')}</InputLabel>
                  <Select
                    value={employee.role}
                    label={t('employees.form.role')}
                    onChange={handleSelectChange('role')}
                  >
                    <MenuItem value="Manager">{t('employees.roles.manager')}</MenuItem>
                    <MenuItem value="Cashier">{t('employees.roles.cashier')}</MenuItem>
                    <MenuItem value="Sales">{t('employees.roles.sales')}</MenuItem>
                    <MenuItem value="Inventory">{t('employees.roles.inventory')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees.form.department')}</InputLabel>
                  <Select
                    value={employee.department}
                    label={t('employees.form.department')}
                    onChange={handleSelectChange('department')}
                  >
                    <MenuItem value="Sales">{t('employees.departments.sales')}</MenuItem>
                    <MenuItem value="Operations">{t('employees.departments.operations')}</MenuItem>
                    <MenuItem value="Finance">{t('employees.departments.finance')}</MenuItem>
                    <MenuItem value="HR">{t('employees.departments.hr')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <TextField
                  fullWidth
                  type="date"
                  label={t('employees.form.joinDate')}
                  value={employee.joinDate}
                  onChange={handleTextFieldChange('joinDate')}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </div>
              <div style={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                <FormControl fullWidth required>
                  <InputLabel>{t('employees.form.status')}</InputLabel>
                  <Select
                    value={employee.status}
                    label={t('employees.form.status')}
                    onChange={handleSelectChange('status')}
                  >
                    <MenuItem value="active">{t('employees.status.active')}</MenuItem>
                    <MenuItem value="inactive">{t('employees.status.inactive')}</MenuItem>
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
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {t('common.save')}
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditEmployee; 