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
  InputAdornment,
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
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import '../styles/customer-management.css';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  supplier: string;
  barcode: string;
  status: 'active' | 'inactive';
}

const EditProduct: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    cost: 0,
    stockQuantity: 0,
    supplier: '',
    barcode: '',
    status: 'active',
  });

  useEffect(() => {
    // Fetch product data based on ID
    // This is a placeholder for demonstration
    const fetchProduct = async () => {
      // Simulated API call
      const dummyProduct: Product = {
        id: id || '',
        name: 'Sample Product',
        description: 'Sample product description',
        category: 'Electronics',
        price: 99.99,
        cost: 75.00,
        stockQuantity: 50,
        supplier: 'Sample Supplier',
        barcode: '123456789',
        status: 'active',
      };
      setProduct(dummyProduct);
    };

    if (id) {
      fetchProduct();
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
      case 'Customer List':
        navigate('/customer-list');
        break;
      case 'Loyalty Program':
        navigate('/loyalty-program');
        break;
      case 'Customer Feedback':
        navigate('/customer-feedback');
        break;
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

  const handleTextFieldChange = (field: keyof Product) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setProduct(prev => ({
      ...prev,
      [field]: field === 'price' || field === 'cost' || field === 'stockQuantity'
        ? Number(value)
        : value,
    }));
  };

  const handleSelectChange = (field: keyof Product) => (
    event: SelectChangeEvent
  ) => {
    setProduct(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle product update
    // This is a placeholder for demonstration
    console.log('Updated product:', product);
    navigate('/product-list');
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
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {t('products.edit.title')}
          </Typography>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-field half-width">
                <TextField
                  required
                  fullWidth
                  label={t('products.form.name')}
                  value={product.name}
                  onChange={handleTextFieldChange('name')}
                />
              </div>
              <div className="form-field half-width">
                <TextField
                  required
                  fullWidth
                  label={t('products.form.barcode')}
                  value={product.barcode}
                  onChange={handleTextFieldChange('barcode')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field full-width">
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('products.form.description')}
                  value={product.description}
                  onChange={handleTextFieldChange('description')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field half-width">
                <FormControl fullWidth>
                  <InputLabel>{t('products.form.category')}</InputLabel>
                  <Select
                    value={product.category}
                    label={t('products.form.category')}
                    onChange={handleSelectChange('category')}
                  >
                    <MenuItem value="Electronics">{t('products.categories.electronics')}</MenuItem>
                    <MenuItem value="Clothing">{t('products.categories.clothing')}</MenuItem>
                    <MenuItem value="Food">{t('products.categories.food')}</MenuItem>
                    <MenuItem value="Other">{t('products.categories.other')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="form-field half-width">
                <FormControl fullWidth>
                  <InputLabel>{t('products.form.supplier')}</InputLabel>
                  <Select
                    value={product.supplier}
                    label={t('products.form.supplier')}
                    onChange={handleSelectChange('supplier')}
                  >
                    <MenuItem value="Sample Supplier">Sample Supplier</MenuItem>
                    <MenuItem value="Other Supplier">Other Supplier</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field third-width">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products.form.price')}
                  value={product.price}
                  onChange={handleTextFieldChange('price')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </div>
              <div className="form-field third-width">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products.form.cost')}
                  value={product.cost}
                  onChange={handleTextFieldChange('cost')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </div>
              <div className="form-field third-width">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label={t('products.form.stockQuantity')}
                  value={product.stockQuantity}
                  onChange={handleTextFieldChange('stockQuantity')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field half-width">
                <FormControl fullWidth>
                  <InputLabel>{t('products.form.status')}</InputLabel>
                  <Select
                    value={product.status}
                    label={t('products.form.status')}
                    onChange={handleSelectChange('status')}
                  >
                    <MenuItem value="active">{t('products.status.active')}</MenuItem>
                    <MenuItem value="inactive">{t('products.status.inactive')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="form-actions">
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => navigate('/product-list')}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
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

export default EditProduct; 