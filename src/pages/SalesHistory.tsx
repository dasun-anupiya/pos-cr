import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
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
  Menu as MenuIcon,
  Visibility as VisibilityIcon,
  Print as PrintIcon,
  Clear as ClearIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface Sale {
  id: number;
  date: Date;
  customerName: string;
  items: number;
  total: number;
  paymentMethod: string;
  status: string;
}

// Dummy data for demonstration
const dummySales: Sale[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  customerName: `Customer ${index + 1}`,
  items: Math.floor(Math.random() * 10) + 1,
  total: Math.floor(Math.random() * 1000) + 50,
  paymentMethod: ['Cash', 'Card', 'Mobile Payment'][Math.floor(Math.random() * 3)],
  status: ['Completed', 'Refunded', 'Canceled'][Math.floor(Math.random() * 3)],
}));

const SalesHistory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setPaymentMethod('');
    setStatus('');
    setSearchTerm('');
  };

  const filteredSales = dummySales.filter(sale => {
    if (startDate && new Date(sale.date) < new Date(startDate)) return false;
    if (endDate && new Date(sale.date) > new Date(endDate)) return false;
    if (paymentMethod && sale.paymentMethod !== paymentMethod) return false;
    if (status && sale.status !== status) return false;
    if (searchTerm && !sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' },
            gap: 2,
            alignItems: 'center'
          }}>
            <Box>
              <TextField
                fullWidth
                type="date"
                label={t('salesHistory:filters.startDate')}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                type="date"
                label={t('salesHistory:filters.endDate')}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>{t('salesHistory:filters.paymentMethod')}</InputLabel>
                <Select
                  value={paymentMethod}
                  label={t('salesHistory:filters.paymentMethod')}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="">{t('salesHistory:filters.all')}</MenuItem>
                  <MenuItem value="Cash">{t('salesHistory:paymentMethods.cash')}</MenuItem>
                  <MenuItem value="Card">{t('salesHistory:paymentMethods.card')}</MenuItem>
                  <MenuItem value="Mobile Payment">{t('salesHistory:paymentMethods.mobilePay')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>{t('salesHistory:filters.status')}</InputLabel>
                <Select
                  value={status}
                  label={t('salesHistory:filters.status')}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">{t('salesHistory:filters.all')}</MenuItem>
                  <MenuItem value="Completed">{t('salesHistory:status.completed')}</MenuItem>
                  <MenuItem value="Refunded">{t('salesHistory:status.refunded')}</MenuItem>
                  <MenuItem value="Canceled">{t('salesHistory:status.canceled')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <TextField
                fullWidth
                label={t('salesHistory:filters.searchCustomer')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
              >
                {t('salesHistory:filters.clearFilters')}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Sales Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('salesHistory:table.saleId')}</TableCell>
                <TableCell>{t('salesHistory:table.date')}</TableCell>
                <TableCell>{t('salesHistory:table.customer')}</TableCell>
                <TableCell align="right">{t('salesHistory:table.items')}</TableCell>
                <TableCell align="right">{t('salesHistory:table.total')}</TableCell>
                <TableCell>{t('salesHistory:table.paymentMethod')}</TableCell>
                <TableCell>{t('salesHistory:table.status')}</TableCell>
                <TableCell align="center">{t('salesHistory:table.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.date.toLocaleDateString()}</TableCell>
                  <TableCell>{sale.customerName}</TableCell>
                  <TableCell align="right">{sale.items}</TableCell>
                  <TableCell align="right">${sale.total.toFixed(2)}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`salesHistory:status.${sale.status.toLowerCase()}`)}
                      color={
                        sale.status === 'Completed'
                          ? 'success'
                          : sale.status === 'Refunded'
                          ? 'warning'
                          : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(sale)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                    >
                      <PrintIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Sale Details Dialog */}
        <Dialog
          open={!!selectedSale}
          onClose={() => setSelectedSale(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {t('salesHistory:details.title')} - #{selectedSale?.id}
          </DialogTitle>
          <DialogContent>
            {selectedSale && (
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2
              }}>
                <Box>
                  <Typography variant="subtitle2">{t('salesHistory:table.date')}</Typography>
                  <Typography>{selectedSale.date.toLocaleDateString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">{t('salesHistory:table.customer')}</Typography>
                  <Typography>{selectedSale.customerName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">{t('salesHistory:table.paymentMethod')}</Typography>
                  <Typography>{selectedSale.paymentMethod}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">{t('salesHistory:table.status')}</Typography>
                  <Chip
                    label={t(`salesHistory:status.${selectedSale.status.toLowerCase()}`)}
                    color={
                      selectedSale.status === 'Completed'
                        ? 'success'
                        : selectedSale.status === 'Refunded'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography variant="subtitle2">{t('salesHistory:details.totalAmount')}</Typography>
                  <Typography variant="h6">${selectedSale.total.toFixed(2)}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SalesHistory; 