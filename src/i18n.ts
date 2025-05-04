import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enReports from './locales/en/reports.json';
import enSupport from './locales/en/support.json';
import enSalesHistory from './locales/en/salesHistory.json';
import enRefunds from './locales/en/refunds.json';
import enOrders from './locales/en/orders.json';
import enProducts from './locales/en/products.json';
import enInventory from './locales/en/inventory.json';
import enCustomers from './locales/en/customers.json';
import enLoyalty from './locales/en/loyalty.json';
import enFeedback from './locales/en/feedback.json';
import enEmployees from './locales/en/employees.json';
import enShifts from './locales/en/shifts.json';
import enRoles from './locales/en/roles.json';
import enSuppliers from './locales/en/suppliers.json';
import enSecurity from './locales/en/security.json';

// Import Sinhala translations
import siCommon from './locales/si/common.json';
import siReports from './locales/si/reports.json';
import siSalesHistory from './locales/si/salesHistory.json';
import siRefunds from './locales/si/refunds.json';
import siOrders from './locales/si/orders.json';
import siProducts from './locales/si/products.json';
import siInventory from './locales/si/inventory.json';
import siCustomers from './locales/si/customers.json';
import siLoyalty from './locales/si/loyalty.json';
import siFeedback from './locales/si/feedback.json';
import siEmployees from './locales/si/employees.json';
import siShifts from './locales/si/shifts.json';
import siRoles from './locales/si/roles.json';
import siSuppliers from './locales/si/suppliers.json';
import siSecurity from './locales/si/security.json';

// Import Tamil translations
import taCommon from './locales/ta/common.json';
import taReports from './locales/ta/reports.json';
import taSalesHistory from './locales/ta/salesHistory.json';
import taRefunds from './locales/ta/refunds.json';
import taOrders from './locales/ta/orders.json';
import taProducts from './locales/ta/products.json';
import taInventory from './locales/ta/inventory.json';
import taCustomers from './locales/ta/customers.json';
import taLoyalty from './locales/ta/loyalty.json';
import taFeedback from './locales/ta/feedback.json';
import taEmployees from './locales/ta/employees.json';
import taShifts from './locales/ta/shifts.json';
import taRoles from './locales/ta/roles.json';
import taSuppliers from './locales/ta/suppliers.json';
import taSecurity from './locales/ta/security.json';

const resources = {
  en: {
    common: enCommon,
    reports: enReports,
    support: enSupport,
    salesHistory: enSalesHistory,
    refunds: enRefunds,
    orders: enOrders,
    products: enProducts,
    inventory: enInventory,
    customers: enCustomers,
    loyalty: enLoyalty,
    feedback: enFeedback,
    employees: enEmployees,
    shifts: enShifts,
    roles: enRoles,
    suppliers: enSuppliers,
    security: enSecurity
  },
  si: {
    common: siCommon,
    reports: siReports,
    salesHistory: siSalesHistory,
    refunds: siRefunds,
    orders: siOrders,
    products: siProducts,
    inventory: siInventory,
    customers: siCustomers,
    loyalty: siLoyalty,
    feedback: siFeedback,
    employees: siEmployees,
    shifts: siShifts,
    roles: siRoles,
    suppliers: siSuppliers,
    security: siSecurity
  },
  ta: {
    common: taCommon,
    reports: taReports,
    salesHistory: taSalesHistory,
    refunds: taRefunds,
    orders: taOrders,
    products: taProducts,
    inventory: taInventory,
    customers: taCustomers,
    loyalty: taLoyalty,
    feedback: taFeedback,
    employees: taEmployees,
    shifts: taShifts,
    roles: taRoles,
    suppliers: taSuppliers,
    security: taSecurity
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    defaultNS: 'common',
    ns: ['common', 'reports', 'support', 'salesHistory', 'refunds', 'orders', 'products', 'inventory', 'customers', 'loyalty', 'feedback', 'employees', 'shifts', 'roles', 'suppliers', 'security'],
    
    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false
    }
  });

export default i18n; 