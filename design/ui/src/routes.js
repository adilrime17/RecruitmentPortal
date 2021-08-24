import MainComponent from "views/admin/MainComponent";

var routes = [
  //>> Medical routes :
  {
    path: "/medical-eligibility",
    name: "Eligibility Check",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'medical'
  },
  {
    path: "/initial-medical",
    name: "Initial Medical",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'medical'
  },
  {
    path: "/final-medical",
    name: "Final Medical",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'medical'
  },

  //>> Data Entry Routes :
  {
    path: "/personal-information",
    name: "Personal Information",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/education",
    name: "Education",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/woa-wos",
    name: "WOA/WOS",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/tests-to-appear",
    name: "Test to Appear",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/print-slip",
    name: "Print Slip",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },
  {
    path: "/summary",
    name: "Summary",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'data'
  },

  // >> Marks Entry Routes :

  {
    path: "/intelligence-test",
    name: "Intelligence Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/personality-test",
    name: "Personality Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/written-test-matric",
    name: "Written Test (Matric)",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/written-test-u-matric",
    name: "Written Test (U/Matric)",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/clk-test",
    name: "CLK Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/tech-test",
    name: "Tech Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/cptr-diploma-test",
    name: "Cptr Diploma Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  
  {
    path: "/driving-test",
    name: "Driving Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  
  {
    path: "/hafiz-test",
    name: "Hafiz Test",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/PET",
    name: "PET",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  {
    path: "/summary-marks",
    name: "Summary Marks",
    // icon: Tv,
    // iconColor: "Primary",
    component: MainComponent,
    layout: "/admin",
    key: 'marks'
  },
  // {
  //   path: "/view-print-nominal-rolls",
  //   name: "View/Print Nominal Rolls",
  //   // icon: Tv,
  //   // iconColor: "Primary",
  //   component: MainComponent,
  //   layout: "/admin",
  //   key: 'marks'
  // }
];
export default routes;
