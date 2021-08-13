// core components
// import Dashboard from "views/admin/Dashboard.js";
import Temp from "views/admin/Temp.js";
// import Icons from "views/admin/Icons.js";
// import Login from "views/auth/Login.js";
// import Maps from "views/admin/Maps.js";
// import Profile from "views/admin/Profile.js";
// import Register from "views/auth/Register.js";
// import Tables from "views/admin/Tables.js";
// @material-ui/icons components
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Dns from "@material-ui/icons/Dns";
// import FlashOn from "@material-ui/icons/FlashOn";
// import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// import Grain from "@material-ui/icons/Grain";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Palette from "@material-ui/icons/Palette";
// import Person from "@material-ui/icons/Person";
// import Tv from "@material-ui/icons/Tv";
// import VpnKey from "@material-ui/icons/VpnKey";

var routes = [
  //>> Medical routes :
  {
    path: "/medical-eligibility",
    name: "Eligibility Check",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'medical'
  },
  {
    path: "/initial-medical",
    name: "Initial Medical",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'medical'
  },
  {
    path: "/final-medical",
    name: "Final Medical",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'medical'
  },

  //>> Data Entry Routes :
  {
    path: "/personal-information",
    name: "Personal Information",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/education",
    name: "Education",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/woa-wos",
    name: "WOA/WOS",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/tests-to-appear",
    name: "Test to Appear",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/print-slip",
    name: "Print Slip",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/summary",
    name: "Summary",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'data'
  },

  // >> Marks Entry Routes :

  {
    path: "/intelligence-test",
    name: "Intelligence Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/personality-test",
    name: "Personality Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/written-test-matric",
    name: "Written Test (Matric)",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/written-test-u-matric",
    name: "Written Test (U/Matric)",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/clk-test",
    name: "CLK Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/tech-test",
    name: "Tech Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/cptr-diploma-test",
    name: "Cptr Diploma Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  
  {
    path: "/driving-test",
    name: "Driving Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  
  {
    path: "/hafiz-test",
    name: "Hafiz Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/PET",
    name: "PET",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/summary-marks",
    name: "Summary Marks",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/view-print-nominal-rolls",
    name: "View/Print Nominal Rolls",
    // icon: Tv,
    // iconColor: "Primary",
    component: Temp,
    layout: "/admin",
    key: 'marks'
  },


  // {
  //   path: "/temp",
  //   name: "Temp",
  //   // icon: Tv,
  //   iconColor: "Primary",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   href: "#pablo",
  //   name: "Upgrade to pro",
  //   icon: FlashOn,
  //   upgradeToPro: true,
  // },
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: Tv,
  //   iconColor: "Primary",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: Grain,
  //   iconColor: "Primary",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   iconColor: "Warning",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   // icon: Person,
  //   iconColor: "WarningLight",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: FormatListBulleted,
  //   iconColor: "Error",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: VpnKey,
  //   iconColor: "Info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: AccountCircle,
  //   iconColor: "ErrorLight",
  //   component: Register,
  //   layout: "/auth",
  // },
  // {
  //   divider: true,
  // },
  // {
  //   title: "Documentation",
  // },
  // {
  //   href:
  //     "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Getting started",
  //   icon: FlashOn,
  // },
  // {
  //   href:
  //     "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Foundation",
  //   icon: Palette,
  // },
  // {
  //   href:
  //     "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Components",
  //   icon: Dns,
  // },
];
export default routes;
