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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Delete as DeleteIcon,
  ShoppingCart,
  Inventory,
  Receipt,
  Person,
  People,
  Assessment,
  Security,
  Help,
  ExpandLess,
  ExpandMore,
  Store,
  LocalShipping,
  Category,
  Group,
  Badge,
  BarChart,
  Factory,
  Lock,
  Support,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface Refund {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

const RefundsAndReturns: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [newRefund, setNewRefund] = useState({
    orderId: '',
    customerName: '',
    amount: 0,
    reason: '',
    items: [{ productId: '', productName: '', quantity: 1, price: 0 }],
  });
  const [refunds, setRefunds] = useState<Refund[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      amount: 150.00,
      date: '2024-04-01',
      status: 'Pending',
      reason: 'Product damaged',
      items: [
        {
          productId: 'P001',
          productName: 'Product A',
          quantity: 2,
          price: 75.00,
        },
      ],
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
      default:
        if (mainTitle === 'Dashboard') {
          navigate('/dashboard');
        }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRefund({
      orderId: '',
      customerName: '',
      amount: 0,
      reason: '',
      items: [{ productId: '', productName: '', quantity: 1, price: 0 }],
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNewRefundChange = (field: string, value: string | number) => {
    setNewRefund(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddItem = () => {
    setNewRefund(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', productName: '', quantity: 1, price: 0 }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setNewRefund(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setNewRefund(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmitRefund = () => {
    const newRefundRecord: Refund = {
      id: Date.now().toString(),
      orderId: newRefund.orderId,
      customerName: newRefund.customerName,
      amount: newRefund.amount,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      reason: newRefund.reason,
      items: newRefund.items,
    };

    setRefunds(prev => [...prev, newRefundRecord]);
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
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            placeholder={t('refunds:searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            {t('refunds:newRefund')}
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('refunds:table.orderId')}</TableCell>
                <TableCell>{t('refunds:table.customerName')}</TableCell>
                <TableCell>{t('refunds:table.amount')}</TableCell>
                <TableCell>{t('refunds:table.date')}</TableCell>
                <TableCell>{t('refunds:table.status')}</TableCell>
                <TableCell>{t('refunds:table.reason')}</TableCell>
                <TableCell>{t('refunds:table.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell>{refund.orderId}</TableCell>
                  <TableCell>{refund.customerName}</TableCell>
                  <TableCell>${refund.amount.toFixed(2)}</TableCell>
                  <TableCell>{refund.date}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor:
                          refund.status === 'Approved'
                            ? 'success.light'
                            : refund.status === 'Rejected'
                            ? 'error.light'
                            : 'warning.light',
                        color: 'white',
                      }}
                    >
                      {t(`refunds:status.${refund.status.toLowerCase()}`)}
                    </Box>
                  </TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        // Handle view details
                      }}
                    >
                      {t('refunds:table.viewDetails')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{t('refunds:dialog.title')}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label={t('refunds:dialog.orderId')}
                value={newRefund.orderId}
                onChange={(e) => handleNewRefundChange('orderId', e.target.value)}
                fullWidth
              />
              <TextField
                label={t('refunds:dialog.customerName')}
                value={newRefund.customerName}
                onChange={(e) => handleNewRefundChange('customerName', e.target.value)}
                fullWidth
              />
              <TextField
                label={t('refunds:dialog.reason')}
                value={newRefund.reason}
                onChange={(e) => handleNewRefundChange('reason', e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
              <Typography variant="h6">{t('refunds:dialog.items')}</Typography>
              {newRefund.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label={t('refunds:dialog.productId')}
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('refunds:dialog.productName')}
                    value={item.productName}
                    onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('refunds:dialog.quantity')}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    sx={{ width: 100 }}
                  />
                  <TextField
                    label={t('refunds:dialog.price')}
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    sx={{ width: 100 }}
                  />
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddItem}
                sx={{ alignSelf: 'flex-start' }}
              >
                {t('refunds:dialog.addItem')}
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>{t('refunds:dialog.cancel')}</Button>
            <Button onClick={handleSubmitRefund} variant="contained">
              {t('refunds:dialog.submit')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RefundsAndReturns; 