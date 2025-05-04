import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
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
  Rating,
  Chip,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Reply as ReplyIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  Logout as LogoutIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { menuItems } from './Dashboard';
import Clock from '../components/Clock';
import '../styles/customer-management.css';

interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  status: 'pending' | 'responded' | 'resolved';
  response?: string;
}

const CustomerFeedback: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [filterRating, setFilterRating] = useState<number | ''>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [responseText, setResponseText] = useState('');

  // Dummy data for demonstration
  const [feedbacks] = useState<Feedback[]>([
    {
      id: 'FB-001',
      customerName: 'John Doe',
      rating: 4,
      comment: 'Great service and friendly staff. The product quality is excellent.',
      date: '2024-03-15',
      category: 'Service',
      status: 'pending',
    },
    {
      id: 'FB-002',
      customerName: 'Jane Smith',
      rating: 5,
      comment: 'Very satisfied with my purchase. Will definitely come back!',
      date: '2024-03-16',
      category: 'Product',
      status: 'responded',
      response: 'Thank you for your positive feedback! We look forward to serving you again.',
    },
    {
      id: 'FB-003',
      customerName: 'Mike Johnson',
      rating: 3,
      comment: 'Product was good but delivery was delayed.',
      date: '2024-03-17',
      category: 'Delivery',
      status: 'resolved',
      response: 'We apologize for the delay. We have improved our delivery process.',
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

  const handleReply = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.response || '');
  };

  const handleSubmitResponse = () => {
    // Handle response submission
    setSelectedFeedback(null);
    setResponseText('');
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (searchTerm && !feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterRating && feedback.rating !== filterRating) {
      return false;
    }
    if (filterCategory !== 'all' && feedback.category !== filterCategory) {
      return false;
    }
    if (filterStatus !== 'all' && feedback.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'responded':
        return 'info';
      case 'resolved':
        return 'success';
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
          <TextField
            placeholder={t('feedback:searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            className="search-field"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>{t('feedback:filters.rating')}</InputLabel>
              <Select
                value={filterRating}
                label={t('feedback:filters.rating')}
                onChange={(e) => setFilterRating(e.target.value as number)}
              >
                <MenuItem value="">{t('feedback:filters.all')}</MenuItem>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating} {t('feedback:filters.stars')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>{t('feedback:filters.category')}</InputLabel>
              <Select
                value={filterCategory}
                label={t('feedback:filters.category')}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="all">{t('feedback:filters.all')}</MenuItem>
                <MenuItem value="Service">{t('feedback:categories.service')}</MenuItem>
                <MenuItem value="Product">{t('feedback:categories.product')}</MenuItem>
                <MenuItem value="Delivery">{t('feedback:categories.delivery')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>{t('feedback:filters.status')}</InputLabel>
              <Select
                value={filterStatus}
                label={t('feedback:filters.status')}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">{t('feedback:filters.all')}</MenuItem>
                <MenuItem value="pending">{t('feedback:status.pending')}</MenuItem>
                <MenuItem value="responded">{t('feedback:status.responded')}</MenuItem>
                <MenuItem value="resolved">{t('feedback:status.resolved')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <div className="feedback-grid">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-header">
                <div>
                  <Typography variant="h6" gutterBottom>
                    {feedback.customerName}
                  </Typography>
                  <div className="feedback-meta">
                    <Rating value={feedback.rating} readOnly />
                    <Typography color="text.secondary">
                      {feedback.date}
                    </Typography>
                    <Chip
                      label={t(`feedback:categories.${feedback.category.toLowerCase()}`)}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={t(`feedback:status.${feedback.status}`)}
                      color={getStatusColor(feedback.status)}
                      size="small"
                    />
                  </div>
                </div>
                {feedback.status === 'pending' && (
                  <Button
                    variant="contained"
                    startIcon={<ReplyIcon />}
                    onClick={() => handleReply(feedback)}
                  >
                    {t('feedback:actions.reply')}
                  </Button>
                )}
              </div>
              <Typography paragraph>
                {feedback.comment}
              </Typography>
              {feedback.response && (
                <div className="feedback-response">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {t('feedback:response')}:
                  </Typography>
                  <Typography>
                    {feedback.response}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>

        <Dialog
          open={!!selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('feedback:dialog.title')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {t('feedback:dialog.customerFeedback')}:
              </Typography>
              <Typography paragraph>
                {selectedFeedback?.comment}
              </Typography>
              <TextField
                label={t('feedback:dialog.response')}
                multiline
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedFeedback(null)}>
              {t('common:cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitResponse}
              disabled={!responseText.trim()}
            >
              {t('feedback:dialog.submit')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CustomerFeedback; 