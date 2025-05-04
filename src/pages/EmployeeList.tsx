import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  Badge,
  Security,
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

const EmployeeList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Dummy data for demonstration
  const [employees] = useState<Employee[]>([
    {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+94 77 123 4567',
      role: 'Manager',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-01-15',
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+94 77 234 5678',
      role: 'Cashier',
      department: 'Operations',
      status: 'active',
      joinDate: '2023-03-20',
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+94 77 345 6789',
      role: 'Sales Representative',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-02-10',
    },
    {
      id: 'EMP004',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+94 77 456 7890',
      role: 'Inventory Manager',
      department: 'Operations',
      status: 'inactive',
      joinDate: '2022-11-05',
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddEmployee = () => {
    navigate('/employee/add');
  };

  const handleEditEmployee = (employee: Employee) => {
    navigate(`/employee/edit/${employee.id}`);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle employee deletion here
    console.log('Deleting employee:', selectedEmployee?.id);
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="page-header">
          <Typography variant="h5" gutterBottom>
            {t('employees:title')}
          </Typography>
          <div className="header-actions">
            <TextField
              placeholder={t('employees:searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearch}
              className="search-field"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/shifts')}
                startIcon={<Badge />}
              >
                {t('employees:actions.manageShifts')}
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
                onClick={handleAddEmployee}
              >
                {t('employees:actions.addEmployee')}
              </Button>
            </Box>
          </div>
        </div>

        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <div className="employee-card-header">
                <div className="employee-info-header">
                  <Typography variant="h6" className="employee-name">
                    {employee.name}
                  </Typography>
                  <Typography variant="subtitle2" className="employee-role">
                    {t(`employees:roles.${employee.role.toLowerCase()}`)}
                  </Typography>
                </div>
                <div className="employee-actions">
                  <IconButton
                    size="small"
                    onClick={() => handleEditEmployee(employee)}
                    className="edit-button"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(employee)}
                    className="delete-button"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              
              <div className="employee-card-content">
                <div className="employee-details">
                  <div className="detail-item">
                    <Typography variant="body2" className="detail-label">
                      {t('employees:labels.email')}:
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {employee.email}
                    </Typography>
                  </div>
                  <div className="detail-item">
                    <Typography variant="body2" className="detail-label">
                      {t('employees:labels.phone')}:
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {employee.phone}
                    </Typography>
                  </div>
                  <div className="detail-item">
                    <Typography variant="body2" className="detail-label">
                      {t('employees:labels.department')}:
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {t(`employees:departments.${employee.department.toLowerCase()}`)}
                    </Typography>
                  </div>
                  <div className="detail-item">
                    <Typography variant="body2" className="detail-label">
                      {t('employees:labels.joinDate')}:
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {employee.joinDate}
                    </Typography>
                  </div>
                </div>
                <div className="employee-status">
                  <Chip
                    label={t(`employees:status.${employee.status}`)}
                    color={employee.status === 'active' ? 'success' : 'default'}
                    size="small"
                    className={`status-chip ${employee.status}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          className="delete-dialog"
        >
          <DialogTitle>
            {t('employees:deleteConfirmation.title')}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {t('employees:deleteConfirmation.message', { name: selectedEmployee?.name })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              {t('common:cancel')}
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              {t('common:delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default EmployeeList; 