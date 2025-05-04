import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
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
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Menu as MenuIcon,
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
  Logout as LogoutIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Clock from '../components/Clock';
import { menuItems } from './Dashboard'; // Import menuItems from Dashboard

interface Product {
  id: number;
  productNumber: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  amount: number;
}

const POSTerminal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [barcodeInput, setBarcodeInput] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Focus barcode input on mount and after each scan
  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, [products]);

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
      // Reports & Analytics
      case 'Sales Reports':
        navigate('/sales-reports');
        break;
      case 'Inventory Reports':
        navigate('/inventory-reports');
        break;
      case 'Profit & Loss':
        navigate('/profit-loss');
        break;
      case 'Tax Reports':
        navigate('/tax-reports');
        break;
      // Sales
      case 'New Sale (POS Terminal)':
        navigate('/pos-terminal');
        break;
      case 'Sales History':
        navigate('/sales-history');
        break;
      case 'Refunds & Returns':
        navigate('/refunds-returns');
        break;
      // Orders
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
      // Products & Inventory
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
      // Customers
      case 'Customer List':
        navigate('/customer-list');
        break;
      case 'Loyalty Program':
        navigate('/loyalty-program');
        break;
      case 'Customer Feedback':
        navigate('/customer-feedback');
        break;
      // Employees & Roles
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

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch product details from the database
    // For now, we'll add a dummy product
    if (barcodeInput) {
      const newProduct: Product = {
        id: Date.now(),
        productNumber: barcodeInput,
        name: `Product ${barcodeInput}`,
        price: 100.00,
        quantity: 1,
        discount: 0,
        amount: 100.00,
      };
      setProducts([...products, newProduct]);
      setBarcodeInput('');
    }
  };

  const handleQuantityChange = (id: number, change: number) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = Math.max(1, product.quantity + change);
        return {
          ...product,
          quantity: newQuantity,
          amount: product.price * newQuantity - product.discount,
        };
      }
      return product;
    }));
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = products.reduce((sum, product) => sum + product.amount, 0);
    const totalDiscount = products.reduce((sum, product) => sum + product.discount, 0);
    return {
      subtotal,
      totalDiscount,
      total: subtotal - totalDiscount,
    };
  };

  const handlePrint = () => {
    setIsPrintDialogOpen(true);
  };

  const printBill = () => {
    if (printRef.current) {
      const printContent = printRef.current;
      const printWindow = window.open('', '', 'width=600,height=600');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Bill</title>
              <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; text-align: left; }
                .header { text-align: center; margin-bottom: 20px; }
                .footer { margin-top: 20px; text-align: right; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
        setIsPrintDialogOpen(false);
      }
    }
  };

  const totals = calculateTotals();

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
            alt="Your Business Logo"
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.title}>
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
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleBarcodeSubmit}>
            <TextField
              fullWidth
              label={t('pos.scanBarcode')}
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              inputRef={barcodeInputRef}
              autoFocus
            />
          </form>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('pos.productNumber')}</TableCell>
                <TableCell>{t('pos.name')}</TableCell>
                <TableCell align="right">{t('pos.price')}</TableCell>
                <TableCell align="center">{t('pos.quantity')}</TableCell>
                <TableCell align="right">{t('pos.discount')}</TableCell>
                <TableCell align="right">{t('pos.amount')}</TableCell>
                <TableCell align="center">{t('pos.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.productNumber}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{product.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">${product.discount.toFixed(2)}</TableCell>
                  <TableCell align="right">${product.amount.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">
              {t('pos.totalAmount')}: ${totals.total.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('pos.totalDiscount')}: ${totals.totalDiscount.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            disabled={products.length === 0}
          >
            {t('pos.printBill')}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Box ref={printRef}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <img
                src="/src/img/app-icon.png"
                alt="Your Business Logo"
                style={{ width: 100, height: 'auto' }}
              />
              <Typography variant="h6">Your Business Zone</Typography>
              <Typography variant="body2">Contact: 071 234 5678</Typography>
              <Typography variant="body2">Email: Your Businesszone@gmail.com</Typography>
              <Typography variant="body2">
                Date: {new Date().toLocaleDateString()}
              </Typography>
            </Box>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">${product.discount.toFixed(2)}</TableCell>
                    <TableCell align="right">${product.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography>Total Amount: ${totals.total.toFixed(2)}</Typography>
              <Typography>Total Discount: ${totals.totalDiscount.toFixed(2)}</Typography>
              <Typography>Amount Paid: ${totals.total.toFixed(2)}</Typography>
              <Typography>Balance: $0.00</Typography>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img
                src="/img/logo-icon-color.png"
                alt="CRYPSYS Logo"
                style={{ width: 30, height: 'auto' }}
              />
              <Typography variant="body2">Powered by CRYPSYS</Typography>
              <Typography variant="caption">© CRYPSYS 2024</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setIsPrintDialogOpen(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={printBill}>
              Print
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default POSTerminal; 