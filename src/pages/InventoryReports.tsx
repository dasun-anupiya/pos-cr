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
  Chip,
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

const InventoryReports: React.FC = () => {
  const { t, i18n } = useTranslation(['reports', 'common']);
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [timeRange, setTimeRange] = useState('daily');

  // Define inventory data inside component to use translation function
  const inventoryData = {
    stockLevels: [
      { 
        category: t('common:categories.electronics'), 
        total: 450, 
        low: 50, 
        outOfStock: 10 
      },
      { 
        category: t('common:categories.clothing'), 
        total: 800, 
        low: 75, 
        outOfStock: 15 
      },
      { 
        category: t('common:categories.foodBeverage'), 
        total: 300, 
        low: 40, 
        outOfStock: 5 
      },
      { 
        category: t('common:categories.homeGarden'), 
        total: 600, 
        low: 60, 
        outOfStock: 8 
      },
      { 
        category: t('common:categories.sportsOutdoors'), 
        total: 250, 
        low: 30, 
        outOfStock: 3 
      },
    ],
    recentMovements: [
      { 
        id: 1, 
        product: t('common:products.laptop'), 
        type: 'in', 
        quantity: 50, 
        date: '2024-03-15' 
      },
      { 
        id: 2, 
        product: t('common:products.tshirt'), 
        type: 'out', 
        quantity: 25, 
        date: '2024-03-14' 
      },
      { 
        id: 3, 
        product: t('common:products.coffeeBeans'), 
        type: 'in', 
        quantity: 100, 
        date: '2024-03-13' 
      },
      { 
        id: 4, 
        product: t('common:products.gardenTools'), 
        type: 'out', 
        quantity: 15, 
        date: '2024-03-12' 
      },
      { 
        id: 5, 
        product: t('common:products.tennisRacket'), 
        type: 'in', 
        quantity: 20, 
        date: '2024-03-11' 
      },
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
            src="/img/mks.jpeg"
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
            {t('reports:inventory.title')}
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
            {t('reports:inventory.title')}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>{t('reports:timeRange')}</InputLabel>
              <Select
                value={timeRange}
                label={t('reports:timeRange')}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="weekly">{t('reports:weekly')}</MenuItem>
                <MenuItem value="monthly">{t('reports:monthly')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('reports:inventory.stockLevels')}
            </Typography>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:inventory.category')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:inventory.totalItems')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:inventory.lowStock')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:inventory.outOfStock')}</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.stockLevels.map((category) => (
                    <tr key={category.category} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px 16px' }}>{category.category}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>{category.total}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <Chip 
                          label={category.low}
                          color="warning"
                          size="small"
                        />
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <Chip 
                          label={category.outOfStock}
                          color="error"
                          size="small"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t('reports:inventory.recentMovements')}
            </Typography>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:inventory.product')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:inventory.type')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:inventory.quantity')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:inventory.date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.recentMovements.map((movement) => (
                    <tr key={movement.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px 16px' }}>{movement.product}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Chip 
                          label={movement.type === 'in' ? t('reports:inventory.stockIn') : t('reports:inventory.stockOut')}
                          color={movement.type === 'in' ? 'success' : 'error'}
                          size="small"
                        />
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>{movement.quantity}</td>
                      <td style={{ padding: '12px 16px' }}>{movement.date}</td>
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

export default InventoryReports; 