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
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';

interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  supplier: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface StockAdjustment {
  type: 'increase' | 'decrease';
  quantity: number;
  reason: string;
}

const StockManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [adjustmentDialog, setAdjustmentDialog] = useState(false);
  const [adjustment, setAdjustment] = useState<StockAdjustment>({
    type: 'increase',
    quantity: 0,
    reason: '',
  });
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);

  // Dummy data for demonstration
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 'P001',
      name: 'Product A',
      currentStock: 50,
      reorderPoint: 10,
      supplier: 'Supplier A',
      lastUpdated: '2024-04-01',
      status: 'in-stock',
    },
    {
      id: 'P002',
      name: 'Product B',
      currentStock: 5,
      reorderPoint: 15,
      supplier: 'Supplier B',
      lastUpdated: '2024-04-01',
      status: 'low-stock',
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAdjustStock = (item: StockItem) => {
    setSelectedItem(item);
    setAdjustmentDialog(true);
  };

  const handleAdjustmentSubmit = () => {
    if (selectedItem && adjustment.quantity > 0) {
      setStockItems(prevItems =>
        prevItems.map(item =>
          item.id === selectedItem.id
            ? {
                ...item,
                currentStock:
                  adjustment.type === 'increase'
                    ? item.currentStock + adjustment.quantity
                    : Math.max(0, item.currentStock - adjustment.quantity),
                lastUpdated: new Date().toISOString().split('T')[0],
                status: getUpdatedStatus(
                  adjustment.type === 'increase'
                    ? item.currentStock + adjustment.quantity
                    : Math.max(0, item.currentStock - adjustment.quantity),
                  item.reorderPoint
                ),
              }
            : item
        )
      );
      setAdjustmentDialog(false);
      setAdjustment({ type: 'increase', quantity: 0, reason: '' });
      setSelectedItem(null);
    }
  };

  const getUpdatedStatus = (currentStock: number, reorderPoint: number): StockItem['status'] => {
    if (currentStock === 0) return 'out-of-stock';
    if (currentStock <= reorderPoint) return 'low-stock';
    return 'in-stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'success';
      case 'low-stock':
        return 'warning';
      case 'out-of-stock':
        return 'error';
      default:
        return 'default';
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

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {t('menu.products.stockManagement')}
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
        <Paper sx={{ p: 2 }}>
          <div className="table-toolbar">
            <div className="table-toolbar-left">
              <TextField
                size="small"
                placeholder={t('inventory:searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ width: 300 }}
              />
            </div>
          </div>

          <div className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('inventory:table.id')}</TableCell>
                  <TableCell>{t('inventory:table.name')}</TableCell>
                  <TableCell align="right">{t('inventory:table.currentStock')}</TableCell>
                  <TableCell align="right">{t('inventory:table.reorderPoint')}</TableCell>
                  <TableCell>{t('inventory:table.supplier')}</TableCell>
                  <TableCell>{t('inventory:table.lastUpdated')}</TableCell>
                  <TableCell>{t('inventory:table.status')}</TableCell>
                  <TableCell>{t('inventory:table.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.currentStock}</TableCell>
                    <TableCell align="right">{item.reorderPoint}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`inventory:status.${item.status}`)}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="table-actions">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleAdjustStock(item)}
                        >
                          {t('inventory:actions.adjustStock')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Box>

      <Dialog
        open={adjustmentDialog}
        onClose={() => setAdjustmentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t('inventory:adjustStock.title')} - {selectedItem?.name}
        </DialogTitle>
        <DialogContent>
          <div className="form-grid">
            <div className="form-item full-width">
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={adjustment.type === 'increase' ? 'contained' : 'outlined'}
                  startIcon={<AddIcon />}
                  onClick={() => setAdjustment(prev => ({ ...prev, type: 'increase' }))}
                >
                  {t('inventory:adjustStock.increase')}
                </Button>
                <Button
                  variant={adjustment.type === 'decrease' ? 'contained' : 'outlined'}
                  startIcon={<RemoveIcon />}
                  onClick={() => setAdjustment(prev => ({ ...prev, type: 'decrease' }))}
                >
                  {t('inventory:adjustStock.decrease')}
                </Button>
              </Box>
            </div>
            <div className="form-item full-width">
              <TextField
                type="number"
                label={t('inventory:adjustStock.quantity')}
                value={adjustment.quantity}
                onChange={(e) => setAdjustment(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                inputProps={{ min: 0 }}
                fullWidth
              />
            </div>
            <div className="form-item full-width">
              <TextField
                label={t('inventory:adjustStock.reason')}
                value={adjustment.reason}
                onChange={(e) => setAdjustment(prev => ({ ...prev, reason: e.target.value }))}
                multiline
                rows={2}
                fullWidth
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdjustmentDialog(false)}>
            {t('common:cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleAdjustmentSubmit}
            disabled={adjustment.quantity <= 0}
          >
            {t('common:save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockManagement; 