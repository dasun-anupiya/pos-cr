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
  FormControlLabel,
  Checkbox,
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
  People,
  Badge,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import '../styles/customer-management.css';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

const RoleManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Dummy data for demonstration
  const [permissions] = useState<Permission[]>([
    {
      id: 'PERM001',
      name: 'View Products',
      description: 'Can view product list and details',
      module: 'Products',
    },
    {
      id: 'PERM002',
      name: 'Edit Products',
      description: 'Can create and edit products',
      module: 'Products',
    },
    {
      id: 'PERM003',
      name: 'View Sales',
      description: 'Can view sales reports',
      module: 'Sales',
    },
    {
      id: 'PERM004',
      name: 'Process Sales',
      description: 'Can process sales transactions',
      module: 'Sales',
    },
    {
      id: 'PERM005',
      name: 'Manage Employees',
      description: 'Can manage employee accounts',
      module: 'HR',
    },
    {
      id: 'PERM006',
      name: 'View Reports',
      description: 'Can view system reports',
      module: 'Reports',
    },
    {
      id: 'PERM007',
      name: 'Manage Inventory',
      description: 'Can manage product inventory',
      module: 'Products',
    },
    {
      id: 'PERM008',
      name: 'Manage Roles',
      description: 'Can manage user roles and permissions',
      module: 'HR',
    },
  ]);

  const [roles] = useState<Role[]>([
    {
      id: 'ROLE001',
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['PERM001', 'PERM002', 'PERM003', 'PERM004', 'PERM005', 'PERM006', 'PERM007', 'PERM008'],
      status: 'active',
    },
    {
      id: 'ROLE002',
      name: 'Store Manager',
      description: 'Store operations management',
      permissions: ['PERM001', 'PERM002', 'PERM003', 'PERM004', 'PERM006', 'PERM007'],
      status: 'active',
    },
    {
      id: 'ROLE003',
      name: 'Cashier',
      description: 'Sales and basic product access',
      permissions: ['PERM001', 'PERM003', 'PERM004'],
      status: 'active',
    },
    {
      id: 'ROLE004',
      name: 'Inventory Manager',
      description: 'Product and inventory management',
      permissions: ['PERM001', 'PERM002', 'PERM007'],
      status: 'active',
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

  const handleAddRole = () => {
    setSelectedRole({
      id: '',
      name: '',
      description: '',
      permissions: [],
      status: 'active',
    });
    setEditDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle role deletion here
    console.log('Deleting role:', selectedRole?.id);
    setDeleteDialogOpen(false);
    setSelectedRole(null);
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;

    // Handle role save/update here
    console.log('Saving role:', selectedRole);
    setEditDialogOpen(false);
    setSelectedRole(null);
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (!selectedRole) return;

    setSelectedRole(prev => {
      if (!prev) return prev;

      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId];

      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as { [key: string]: Permission[] });

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
            {t('roles:title')}
          </Typography>
          <div className="header-actions">
            <TextField
              placeholder={t('roles:searchPlaceholder')}
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
                onClick={() => navigate('/employees')}
                startIcon={<People />}
              >
                {t('employees:title')}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/shifts')}
                startIcon={<Badge />}
              >
                {t('shifts:title')}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRole}
                className="add-button"
              >
                {t('roles:addRole')}
              </Button>
            </Box>
          </div>
        </div>

        <div className="role-grid">
          {filteredRoles.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-card-header">
                <div className="role-info-header">
                  <Typography variant="h6" className="role-name">
                    {role.name}
                  </Typography>
                  <Typography variant="subtitle2" className="role-description">
                    {role.description}
                  </Typography>
                </div>
                <div className="role-actions">
                  <IconButton
                    size="small"
                    onClick={() => handleEditRole(role)}
                    className="edit-button"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(role)}
                    className="delete-button"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              
              <div className="role-card-content">
                <Typography variant="subtitle2" gutterBottom className="permissions-title">
                  {t('roles:permissions')}:
                </Typography>
                <div className="permission-chips">
                  {permissions
                    .filter(permission => role.permissions.includes(permission.id))
                    .map(permission => (
                      <Chip
                        key={permission.id}
                        label={permission.name}
                        size="small"
                        className="permission-chip"
                      />
                    ))}
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
            {t('roles:deleteConfirmation.title')}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {t('roles:deleteConfirmation.message', { name: selectedRole?.name })}
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

        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="md"
          fullWidth
          className="edit-dialog"
        >
          <DialogTitle>
            {selectedRole?.id ? t('roles:editRole') : t('roles:addRole')}
          </DialogTitle>
          <DialogContent>
            <div className="role-form">
              <TextField
                fullWidth
                label={t('roles:form.name')}
                value={selectedRole?.name || ''}
                onChange={(e) => setSelectedRole(prev => prev ? { ...prev, name: e.target.value } : null)}
                margin="normal"
                className="form-field"
              />
              <TextField
                fullWidth
                label={t('roles:form.description')}
                value={selectedRole?.description || ''}
                onChange={(e) => setSelectedRole(prev => prev ? { ...prev, description: e.target.value } : null)}
                margin="normal"
                multiline
                rows={2}
                className="form-field"
              />
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }} className="permissions-section-title">
                {t('roles:form.permissions')}
              </Typography>
              <div className="permissions-grid">
                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                  <div key={module} className="permission-module">
                    <Typography variant="subtitle2" className="module-title">
                      {module}
                    </Typography>
                    {modulePermissions.map((permission) => (
                      <FormControlLabel
                        key={permission.id}
                        control={
                          <Checkbox
                            checked={selectedRole?.permissions.includes(permission.id) || false}
                            onChange={() => handlePermissionToggle(permission.id)}
                          />
                        }
                        label={
                          <div className="permission-label">
                            <Typography variant="body2" className="permission-name">
                              {permission.name}
                            </Typography>
                            <Typography variant="caption" className="permission-description">
                              {permission.description}
                            </Typography>
                          </div>
                        }
                        className="permission-control"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>
              {t('common:cancel')}
            </Button>
            <Button
              onClick={handleSaveRole}
              variant="contained"
              disabled={!selectedRole?.name}
            >
              {t('common:save')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RoleManagement; 