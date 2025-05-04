import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
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
  Brightness4,
  Brightness7,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  Business as BusinessIcon,
  ShoppingBasket as ShoppingBasketIcon,
  LocalShipping as LocalShippingIcon,
  Backup as BackupIcon,
  History as HistoryIcon,
  Home,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Clock from '../components/Clock';

interface MenuItem {
  title: string;
  translationKey: string;
  icon: React.ComponentType<any>;
  subItems?: { title: string; translationKey: string; icon: React.ComponentType<any> }[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    translationKey: 'dashboard',
    icon: Home,
    subItems: [],
  },
  {
    title: 'Sales',
    translationKey: 'sales',
    icon: ShoppingCart,
    subItems: [
      { title: 'New Sale (POS Terminal)', translationKey: 'newSale', icon: Store },
      { title: 'Sales History', translationKey: 'salesHistory', icon: Receipt },
      { title: 'Refunds & Returns', translationKey: 'refundsReturns', icon: LocalShipping },
    ],
  },
  {
    title: 'Orders',
    translationKey: 'orders',
    icon: Receipt,
    subItems: [
      { title: 'Customer Orders', translationKey: 'customerOrders', icon: Person },
      { title: 'Pending Orders', translationKey: 'pendingOrders', icon: Receipt },
      { title: 'Completed Orders', translationKey: 'completedOrders', icon: Receipt },
      { title: 'Canceled Orders', translationKey: 'canceledOrders', icon: Receipt },
    ],
  },
  {
    title: 'Products & Inventory',
    translationKey: 'products',
    icon: Category,
    subItems: [
      { title: 'Product List', translationKey: 'productList', icon: Category },
      { title: 'Add New Product', translationKey: 'addProduct', icon: Category },
      { title: 'Stock Management', translationKey: 'stockManagement', icon: Inventory },
      { title: 'Low Stock Alerts', translationKey: 'lowStockAlerts', icon: Inventory },
    ],
  },
  {
    title: 'Reports & Analytics',
    translationKey: 'reports',
    icon: Assessment,
    subItems: [
      { title: 'Sales Reports', translationKey: 'salesReports', icon: BarChart },
      { title: 'Inventory Reports', translationKey: 'inventoryReports', icon: Inventory },
      { title: 'Profit & Loss', translationKey: 'profitLoss', icon: Assessment },
      { title: 'Tax Reports', translationKey: 'taxReports', icon: Receipt },
    ],
  },
  {
    title: 'Suppliers & Purchases',
    translationKey: 'suppliers',
    icon: BusinessIcon,
    subItems: [
      { title: 'Supplier List', translationKey: 'supplierList', icon: BusinessIcon },
      { title: 'Purchase Orders', translationKey: 'purchaseOrders', icon: ShoppingBasketIcon },
      { title: 'Incoming Stock', translationKey: 'incomingStock', icon: LocalShippingIcon },
    ],
  },
  {
    title: 'Customer Management',
    translationKey: 'customers',
    icon: People,
    subItems: [
      { title: 'Customer List', translationKey: 'customerList', icon: People },
      { title: 'Loyalty Program', translationKey: 'loyaltyProgram', icon: People },
      { title: 'Customer Feedback', translationKey: 'customerFeedback', icon: People },
    ],
  },
  {
    title: 'Employee Management',
    translationKey: 'employees',
    icon: Group,
    subItems: [
      { title: 'Employee List', translationKey: 'employeeList', icon: Group },
      { title: 'Shift Management', translationKey: 'shiftManagement', icon: Badge },
      { title: 'Role Management', translationKey: 'roleManagement', icon: Badge },
    ],
  },
  {
    title: 'Security & Logs',
    translationKey: 'security',
    icon: Lock,
    subItems: [
      { title: 'User Activity Logs', translationKey: 'userActivityLogs', icon: HistoryIcon },
      { title: 'Backup & Restore', translationKey: 'backupRestore', icon: BackupIcon },
    ],
  },
  {
    title: 'Support & Help',
    translationKey: 'support',
    icon: Support,
  },
];

interface DashboardProps {
  onThemeToggle: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onThemeToggle }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (title: string) => {
    // Handle direct navigation for menu items without subitems
    if (title === 'Support & Help') {
      navigate('/support');
      return;
    }

    // Toggle submenu for items with subitems
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
      // Suppliers & Purchases
      case 'Supplier List':
        navigate('/suppliers');
        break;
      case 'Purchase Orders':
        navigate('/purchase-orders');
        break;
      case 'Incoming Stock':
        navigate('/incoming-stock');
        break;
      // Customer Management
      case 'Customer List':
        navigate('/customer-list');
        break;
      case 'Loyalty Program':
        navigate('/loyalty-program');
        break;
      case 'Customer Feedback':
        navigate('/customer-feedback');
        break;
      // Employee Management
      case 'Employee List':
        navigate('/employees');
        break;
      case 'Shift Management':
        navigate('/shift-management');
        break;
      case 'Role Management':
        navigate('/roles');
        break;
      // Security & Logs
      case 'User Activity Logs':
        navigate('/user-activity-logs');
        break;
      case 'Backup & Restore':
        navigate('/backup-restore');
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

  const cards = [
    { title: 'Total Sales', value: '$15,890', icon: ShoppingCart, color: theme.palette.primary.main },
    { title: 'Products', value: '245', icon: Inventory, color: theme.palette.secondary.main },
    { title: 'Orders', value: '64', icon: Receipt, color: '#4caf50' },
    { title: 'Customers', value: '156', icon: Person, color: '#ff9800' },
  ];

  const cardSx = { height: '100%' };
  const paperSx = { p: 3, height: '400px' };

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
            alt="Business Logo"
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
            onClick={onThemeToggle}
            sx={{ ml: 2 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleLanguageClick}
            sx={{ ml: 1 }}
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
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
          {cards.map((card, index) => (
            <Card key={card.title} sx={cardSx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: card.color,
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        mr: 2,
                      }}
                    >
                      <card.icon sx={{ color: 'white' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: 'text.secondary' }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4">{card.value}</Typography>
                </CardContent>
              </motion.div>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, mt: 3 }}>
          <Paper sx={paperSx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              {/* Add your transactions table or chart here */}
            </motion.div>
          </Paper>
          <Paper sx={paperSx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Typography variant="h6" gutterBottom>
                Popular Products
              </Typography>
              {/* Add your products list or chart here */}
            </motion.div>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 