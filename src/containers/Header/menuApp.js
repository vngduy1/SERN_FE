export const adminMenu = [
  //Quan ly user
  {
    //hệ thống
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-crud",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      // {
      //   name: "menu.admin.manage-patient",
      //   link: "/system/user-redux",
      // },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
    // subMenus: [
    //   {
    //     name: "menu.system.system-administrator.user-manage",
    //     link: "/system/user-manage",
    //   },
    //   {
    //     name: "menu.system.system-administrator.user-redux",
    //     link: "/system/user-redux",
    // },
    // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    // ],
  },
  //Quan ly Phong kham
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  //Quan ly Chuyen khoa
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  //Quan ly Cam nang
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  //Quản lý kế hoạch khám bệnh bác sĩ
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
