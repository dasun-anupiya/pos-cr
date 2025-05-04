import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
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
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

const SalesReports: React.FC = () => {
  const { t, i18n } = useTranslation(['reports', 'common']);
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [timeRange, setTimeRange] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Define salesData inside component to use translation function
  const salesData = {
    daily: {
      labels: [
        t('common:days.mon'),
        t('common:days.tue'),
        t('common:days.wed'),
        t('common:days.thu'),
        t('common:days.fri'),
        t('common:days.sat'),
        t('common:days.sun')
      ],
      values: [1200, 1500, 1300, 1800, 2000, 2500, 1900],
    },
    monthly: {
      labels: [
        t('common:months.jan'),
        t('common:months.feb'),
        t('common:months.mar'),
        t('common:months.apr'),
        t('common:months.may'),
        t('common:months.jun')
      ],
      values: [15000, 18000, 16000, 21000, 24000, 28000],
    },
    topProducts: [
      { name: t('common:products.productA'), sales: 150, revenue: 3000 },
      { name: t('common:products.productB'), sales: 120, revenue: 2400 },
      { name: t('common:products.productC'), sales: 100, revenue: 2000 },
      { name: t('common:products.productD'), sales: 80, revenue: 1600 },
      { name: t('common:products.productE'), sales: 60, revenue: 1200 },
    ],
  };

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
      case t('menu.reports.salesReports'):
        navigate('/sales-reports');
        break;
      case t('menu.reports.inventoryReports'):
        navigate('/inventory-reports');
        break;
      case t('menu.reports.profitLoss'):
        navigate('/profit-loss');
        break;
      case t('menu.reports.taxReports'):
        navigate('/tax-reports');
        break;
      case t('menu.sales.newSale'):
        navigate('/pos-terminal');
        break;
      case t('menu.sales.salesHistory'):
        navigate('/sales-history');
        break;
      case t('menu.sales.refundsReturns'):
        navigate('/refunds-returns');
        break;
      case t('menu.orders.customerOrders'):
        navigate('/customer-orders');
        break;
      case t('menu.orders.pendingOrders'):
        navigate('/pending-orders');
        break;
      case t('menu.orders.completedOrders'):
        navigate('/completed-orders');
        break;
      case t('menu.orders.canceledOrders'):
        navigate('/canceled-orders');
        break;
      case t('menu.products.productList'):
        navigate('/product-list');
        break;
      case t('menu.products.addNewProduct'):
        navigate('/add-product');
        break;
      case t('menu.products.stockManagement'):
        navigate('/stock-management');
        break;
      case t('menu.products.lowStockAlerts'):
        navigate('/low-stock-alerts');
        break;
      case t('menu.customers.customerList'):
        navigate('/customer-list');
        break;
      case t('menu.customers.loyaltyProgram'):
        navigate('/loyalty-program');
        break;
      case t('menu.customers.customerFeedback'):
        navigate('/customer-feedback');
        break;
      case t('menu.employees.employeeList'):
        navigate('/employees');
        break;
      case t('menu.employees.shiftManagement'):
        navigate('/shift-management');
        break;
      case t('menu.employees.roleBasedAccess'):
        navigate('/roles');
        break;
      default:
        if (mainTitle === t('menu.reports.title')) {
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
            alt={t('app.title')}
            sx={{
              width: 30,
              height: 'auto',
              mb: 3,
              marginTop: '15px',
              marginRight: '10px',
            }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t('reports:title')}
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
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
        open={drawerOpen}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.translationKey}>
                <ListItemButton onClick={() => handleMenuClick(item.title)}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={t(`menu.${item.translationKey}.title`)} />
                  {item.subItems && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                {item.subItems && (
                  <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.translationKey}
                          sx={{ pl: 4 }}
                          onClick={() => handleSubItemClick(t(`menu.${item.translationKey}.title`), t(`menu.${item.translationKey}.${subItem.translationKey}`))}
                        >
                          <ListItemIcon>
                            <subItem.icon />
                          </ListItemIcon>
                          <ListItemText primary={t(`menu.${item.translationKey}.${subItem.translationKey}`)} />
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
          <Typography variant="h5" gutterBottom>
            {t('reports:sales.title')}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>{t('reports:timeRange')}</InputLabel>
              <Select
                value={timeRange}
                label={t('reports:timeRange')}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="daily">{t('reports:daily')}</MenuItem>
                <MenuItem value="monthly">{t('reports:monthly')}</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              type="date"
              label={t('reports:startDate')}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ mr: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              type="date"
              label={t('reports:endDate')}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('reports:sales.summary')}
            </Typography>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:sales.period')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:sales.amount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {(timeRange === 'daily' ? salesData.daily : salesData.monthly).labels.map((label, index) => (
                    <tr key={label} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px 16px' }}>{label}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        ${(timeRange === 'daily' ? salesData.daily : salesData.monthly).values[index].toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t('reports:sales.topProducts')}
            </Typography>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:sales.productName')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:sales.unitsSold')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:sales.revenue')}</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.topProducts.map((product) => (
                    <tr key={product.name} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px 16px' }}>{product.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>{product.sales}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SalesReports; 