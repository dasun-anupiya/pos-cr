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

const ProfitLoss: React.FC = () => {
  const { t, i18n } = useTranslation(['reports', 'common']);
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [timeRange, setTimeRange] = useState('monthly');

  // Move profitLossData inside component to use translation function
  const profitLossData = {
    monthly: {
      revenue: 85000,
      costOfGoods: 45000,
      operatingExpenses: 20000,
      profit: 20000,
      details: [
        { category: t('reports:profitLoss.salesRevenue'), amount: 85000 },
        { category: t('reports:profitLoss.costOfGoods'), amount: -45000 },
        { category: t('reports:profitLoss.grossProfit'), amount: 40000 },
        { category: t('reports:profitLoss.operatingExpenses'), amount: -20000 },
        { category: t('reports:profitLoss.netProfit'), amount: 20000 },
      ],
    },
  };

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    switch (subTitle) {
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
            {t('reports:profitLoss.title')}
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
              <React.Fragment key={item.title}>
                <ListItemButton onClick={() => handleMenuClick(item.title)}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={t(`common:menu.${item.translationKey}.title`)} />
                  {item.subItems && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                {item.subItems && (
                  <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.title}
                          sx={{ pl: 4 }}
                          onClick={() => handleSubItemClick(item.title, subItem.title)}
                        >
                          <ListItemIcon>
                            <subItem.icon />
                          </ListItemIcon>
                          <ListItemText primary={t(`common:menu.${item.translationKey}.${subItem.translationKey}`)} />
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
            {t('reports.profitLoss.title')}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>{t('reports:timeRange')}</InputLabel>
              <Select
                value={timeRange}
                label={t('reports:timeRange')}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="monthly">{t('reports:monthly')}</MenuItem>
                <MenuItem value="quarterly">{t('reports:quarterly')}</MenuItem>
                <MenuItem value="yearly">{t('reports:yearly')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('reports:profitLoss.summary.title')}
            </Typography>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>{t('reports:profitLoss.category')}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('reports:profitLoss.amount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {profitLossData.monthly.details.map((item, index) => (
                    <tr 
                      key={item.category} 
                      style={{ 
                        borderBottom: '1px solid #e0e0e0',
                        backgroundColor: item.category.includes('Profit') ? '#f5f5f5' : 'transparent',
                        fontWeight: item.category.includes('Profit') ? 'bold' : 'normal'
                      }}
                    >
                      <td style={{ padding: '12px 16px' }}>{item.category}</td>
                      <td style={{ 
                        padding: '12px 16px', 
                        textAlign: 'right',
                        color: item.amount < 0 ? '#d32f2f' : item.amount > 0 ? '#2e7d32' : 'inherit'
                      }}>
                        ${Math.abs(item.amount).toLocaleString()}
                        {item.amount < 0 ? ' (-)' : ''}
                      </td>
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

export default ProfitLoss; 