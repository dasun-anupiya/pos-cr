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
  Add as AddIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Redeem as RedeemIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import '../styles/customer-management.css';

interface LoyaltyTier {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
}

interface Customer {
  id: string;
  name: string;
  loyaltyPoints: number;
  tier: string;
  lastActivity: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  available: boolean;
}

const LoyaltyProgram: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  // Dummy data for demonstration
  const loyaltyTiers: LoyaltyTier[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      benefits: ['5% discount on all purchases', 'Birthday bonus points'],
      color: '#CD7F32',
    },
    {
      name: 'Silver',
      minPoints: 1000,
      benefits: ['10% discount on all purchases', 'Double points on weekends', 'Free delivery'],
      color: '#C0C0C0',
    },
    {
      name: 'Gold',
      minPoints: 5000,
      benefits: ['15% discount on all purchases', 'Triple points on weekends', 'Priority support', 'Exclusive events'],
      color: '#FFD700',
    },
  ];

  const [customers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Doe',
      loyaltyPoints: 1500,
      tier: 'Silver',
      lastActivity: '2024-03-15',
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      loyaltyPoints: 6000,
      tier: 'Gold',
      lastActivity: '2024-03-20',
    },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: 'REW-001',
      name: 'Free Coffee',
      description: 'Get a free coffee with your next purchase',
      pointsCost: 500,
      available: true,
    },
    {
      id: 'REW-002',
      name: '$50 Discount',
      description: 'Get $50 off on your next purchase',
      pointsCost: 2000,
      available: true,
    },
    {
      id: 'REW-003',
      name: 'VIP Shopping Experience',
      description: 'Exclusive after-hours shopping experience',
      pointsCost: 5000,
      available: true,
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const handleRedeemReward = (reward: Reward) => {
    setSelectedReward(reward);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Typography variant="h5" gutterBottom>
          {t('loyalty:tiers.title')}
        </Typography>

        <div className="loyalty-tiers">
          {loyaltyTiers.map((tier) => (
            <div key={tier.name} className="loyalty-tier-card">
              <div className="loyalty-tier-header">
                <StarIcon sx={{ color: tier.color }} />
                <Typography variant="h6">{tier.name}</Typography>
              </div>
              <Typography color="text.secondary" gutterBottom>
                {t('loyalty:tiers.minPoints', { points: tier.minPoints })}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                {t('loyalty:tiers.benefits')}:
              </Typography>
              <ul className="loyalty-tier-benefits">
                {tier.benefits.map((benefit, index) => (
                  <li key={index}>
                    <Typography variant="body2">{benefit}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Typography variant="h5" gutterBottom>
          {t('loyalty:rewards.title')}
        </Typography>

        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div key={reward.id} className="reward-card">
              <Typography variant="h6" gutterBottom>
                {reward.name}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {reward.description}
              </Typography>
              <div className="reward-card-footer">
                <Chip
                  label={`${reward.pointsCost} ${t('loyalty:rewards.points')}`}
                  color="primary"
                />
                <Button
                  variant="contained"
                  startIcon={<RedeemIcon />}
                  onClick={() => handleRedeemReward(reward)}
                  disabled={!reward.available}
                >
                  {t('loyalty:rewards.redeem')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Typography variant="h5" gutterBottom>
          {t('loyalty:topCustomers.title')}
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('loyalty:table.customer')}</TableCell>
                <TableCell>{t('loyalty:table.points')}</TableCell>
                <TableCell>{t('loyalty:table.tier')}</TableCell>
                <TableCell>{t('loyalty:table.lastActivity')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.loyaltyPoints}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<StarIcon />}
                      label={customer.tier}
                      sx={{
                        backgroundColor: loyaltyTiers.find(t => t.name === customer.tier)?.color,
                        color: 'white',
                      }}
                    />
                  </TableCell>
                  <TableCell>{customer.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={!!selectedReward}
          onClose={() => setSelectedReward(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('loyalty:rewards.confirmRedeem')}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {t('loyalty:rewards.confirmMessage', {
                name: selectedReward?.name,
                points: selectedReward?.pointsCost,
              })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedReward(null)}>
              {t('common:cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Handle reward redemption
                setSelectedReward(null);
              }}
            >
              {t('loyalty:rewards.confirm')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LoyaltyProgram; 