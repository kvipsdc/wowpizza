
/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import AboutUs from './pages/AboutUs';
import ContactlessDelivery from './pages/ContactlessDelivery';
import Nutrition from './pages/Nutrition';
import Career from './pages/Career';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import StoreLocator from './pages/StoreLocator';
import Feedback from './pages/Feedback';
import Disclosure from './pages/Disclosure';
import Blog from './pages/Blog';
import Franchise from './pages/Franchise';
import OrdersHistory from './pages/OrdersHistory';
import CustomerCare from './pages/CustomerCare';
import PersonalInfo from './pages/PersonalInfo';
import AddressBook from './pages/AddressBook';
import PaymentCards from './pages/PaymentCards';


export const PAGES = {
    "Home": Home,
    "Menu": Menu,
    "Deals": Deals,
    "AboutUs": AboutUs,
    "ContactlessDelivery": ContactlessDelivery,
    "Nutrition": Nutrition,
    "Career": Career,
    "Privacy": Privacy,
    "Terms": Terms,
    "FAQ": FAQ,
    "StoreLocator": StoreLocator,
    "Feedback": Feedback,
    "Disclosure": Disclosure,
    "Blog": Blog,
    "Franchise": Franchise,
    "OrdersHistory": OrdersHistory,
    "CustomerCare": CustomerCare,
    "PersonalInfo": PersonalInfo,
    "AddressBook": AddressBook,
    "PaymentCards": PaymentCards,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};
