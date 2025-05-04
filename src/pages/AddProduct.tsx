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
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface ProductForm {
  name: string;
  category: string;
  price: string;
  initialStock: string;
  reorderPoint: string;
  supplier: string;
  description: string;
}

const AddProduct: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    category: '',
    price: '',
    initialStock: '',
    reorderPoint: '',
    supplier: '',
    description: '',
  });

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
      default:
        if (mainTitle === 'Dashboard') {
          navigate('/dashboard');
        }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement product creation logic here
    console.log('Form submitted:', formData);
    navigate('/product-list');
  };

  const handleCancel = () => {
    navigate('/product-list');
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
            {t('menu.products.addNewProduct')}
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
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('products:form.title')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-item">
                <TextField
                  required
                  fullWidth
                  label={t('products:form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item">
                <FormControl fullWidth required>
                  <InputLabel>{t('products:form.category')}</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label={t('products:form.category')}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="category1">{t('products:categories.category1')}</MenuItem>
                    <MenuItem value="category2">{t('products:categories.category2')}</MenuItem>
                    <MenuItem value="category3">{t('products:categories.category3')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="form-item">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products:form.price')}
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </div>
              <div className="form-item">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products:form.initialStock')}
                  name="initialStock"
                  value={formData.initialStock}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                />
              </div>
              <div className="form-item">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products:form.reorderPoint')}
                  name="reorderPoint"
                  value={formData.reorderPoint}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                />
              </div>
              <div className="form-item">
                <FormControl fullWidth required>
                  <InputLabel>{t('products:form.supplier')}</InputLabel>
                  <Select
                    name="supplier"
                    value={formData.supplier}
                    label={t('products:form.supplier')}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="supplier1">{t('products:suppliers.supplier1')}</MenuItem>
                    <MenuItem value="supplier2">{t('products:suppliers.supplier2')}</MenuItem>
                    <MenuItem value="supplier3">{t('products:suppliers.supplier3')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="form-item full-width">
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('products:form.description')}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions full-width">
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                >
                  {t('common:cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {t('common:save')}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddProduct; 