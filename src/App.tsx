import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import LoadingScreen from './components/LoadingScreen';
import POSTerminal from './pages/POSTerminal';
import SalesHistory from './pages/SalesHistory';
import RefundsAndReturns from './pages/RefundsAndReturns';
import CustomerOrders from './pages/CustomerOrders';
import PendingOrders from './pages/PendingOrders';
import CompletedOrders from './pages/CompletedOrders';
import CanceledOrders from './pages/CanceledOrders';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import StockManagement from './pages/StockManagement';
import LowStockAlerts from './pages/LowStockAlerts';
import CustomerList from './pages/CustomerList';
import LoyaltyProgram from './pages/LoyaltyProgram';
import CustomerFeedback from './pages/CustomerFeedback';
import EditProduct from './pages/EditProduct';
import EmployeeList from './pages/EmployeeList';
import RoleManagement from './pages/RoleManagement';
import ShiftManagement from './pages/ShiftManagement';
import AddEmployee from './pages/AddEmployee';
import SalesReports from './pages/SalesReports';
import InventoryReports from './pages/InventoryReports';
import ProfitLoss from './pages/ProfitLoss';
import TaxReports from './pages/TaxReports';
import SupplierList from './pages/SupplierList';
import PurchaseOrders from './pages/PurchaseOrders';
import IncomingStock from './pages/IncomingStock';
import UserActivityLogs from './pages/UserActivityLogs';
import BackupRestore from './pages/BackupRestore';
import Support from './pages/Support';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
      },
    },
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              !isAuthenticated ? (
                <ForgotPassword />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onThemeToggle={toggleTheme} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/pos"
            element={
              isAuthenticated ? (
                <POSTerminal />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/pos-terminal"
            element={
              isAuthenticated ? (
                <POSTerminal />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/sales-history"
            element={
              isAuthenticated ? (
                <SalesHistory />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/refunds-returns"
            element={
              isAuthenticated ? (
                <RefundsAndReturns />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/customer-orders"
            element={
              isAuthenticated ? (
                <CustomerOrders />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/pending-orders"
            element={
              isAuthenticated ? (
                <PendingOrders />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/completed-orders"
            element={
              isAuthenticated ? (
                <CompletedOrders />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/canceled-orders"
            element={
              isAuthenticated ? (
                <CanceledOrders />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Product Management Routes */}
          <Route
            path="/product-list"
            element={
              isAuthenticated ? (
                <ProductList />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/add-product"
            element={
              isAuthenticated ? (
                <AddProduct />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              isAuthenticated ? (
                <EditProduct />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Inventory Management Routes */}
          <Route
            path="/stock-management"
            element={
              isAuthenticated ? (
                <StockManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/low-stock-alerts"
            element={
              isAuthenticated ? (
                <LowStockAlerts />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Customer Management Routes */}
          <Route
            path="/customer-list"
            element={
              isAuthenticated ? (
                <CustomerList />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/loyalty-program"
            element={
              isAuthenticated ? (
                <LoyaltyProgram />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/customer-feedback"
            element={
              isAuthenticated ? (
                <CustomerFeedback />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Employee Management Routes */}
          <Route
            path="/employees"
            element={
              isAuthenticated ? (
                <EmployeeList />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/employee/add"
            element={
              isAuthenticated ? (
                <AddEmployee />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/shift-management"
            element={
              isAuthenticated ? (
                <ShiftManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/roles"
            element={
              isAuthenticated ? (
                <RoleManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Report Routes */}
          <Route
            path="/sales-reports"
            element={
              isAuthenticated ? (
                <SalesReports />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/inventory-reports"
            element={
              isAuthenticated ? (
                <InventoryReports />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profit-loss"
            element={
              isAuthenticated ? (
                <ProfitLoss />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/tax-reports"
            element={
              isAuthenticated ? (
                <TaxReports />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Supplier Routes */}
          <Route
            path="/suppliers"
            element={
              isAuthenticated ? (
                <SupplierList />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/purchase-orders"
            element={
              isAuthenticated ? (
                <PurchaseOrders />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/incoming-stock"
            element={
              isAuthenticated ? (
                <IncomingStock />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Security Routes */}
          <Route
            path="/user-activity-logs"
            element={
              isAuthenticated ? (
                <UserActivityLogs />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/backup-restore"
            element={
              isAuthenticated ? (
                <BackupRestore />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/support"
            element={
              isAuthenticated ? (
                <Support />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
