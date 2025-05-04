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
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  CheckCircle as ReceiveIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface IncomingStockItem {
  id: string;
  poNumber: string;
  supplier: string;
  expectedDate: string;
  items: string;
  status: 'pending' | 'received' | 'delayed';
}

const IncomingStock: React.FC = () => {
  const { t, i18n } = useTranslation(['suppliers', 'common']);
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with actual data from your backend
  const [incomingStock] = useState<IncomingStockItem[]>([
    {
      id: 'IS-001',
      poNumber: 'PO-001',
      supplier: 'ABC Electronics',
      expectedDate: '2024-03-22',
      items: 'Laptops (5), Monitors (10)',
      status: 'pending',
    },
    {
      id: 'IS-002',
      poNumber: 'PO-002',
      supplier: 'XYZ Trading',
      expectedDate: '2024-03-21',
      items: 'Keyboards (20), Mice (20)',
      status: 'delayed',
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
      case 'Supplier List':
        navigate('/suppliers');
        break;
      case 'Purchase Orders':
        navigate('/purchase-orders');
        break;
      case 'Incoming Stock':
        navigate('/incoming-stock');
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
    // Implement logout logic
    navigate('/login');
  };

  const filteredIncomingStock = incomingStock.filter(item =>
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: IncomingStockItem['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'received':
        return 'success';
      case 'delayed':
        return 'error';
      default:
        return 'default';
    }
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
            {t('suppliers:incomingStock.title')}
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
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {t('suppliers:incomingStock.title')}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('suppliers:incomingStock.search')}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('suppliers:incomingStock.table.id')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.poNumber')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.supplier')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.expectedDate')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.items')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.status')}</TableCell>
                  <TableCell>{t('suppliers:incomingStock.table.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredIncomingStock.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.poNumber}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.expectedDate}</TableCell>
                    <TableCell>{item.items}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`suppliers:incomingStock.status.${item.status}`)}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {item.status === 'pending' && (
                        <IconButton
                          size="small"
                          onClick={() => {/* Implement receive stock logic */}}
                        >
                          <ReceiveIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default IncomingStock; 