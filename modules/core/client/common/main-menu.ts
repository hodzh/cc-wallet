class MainMenu {
  public items = [
    {
      title: 'Admin Users',
      state: '/admin/users',
      role: 'admin'
    }
  ];

  constructor() {
  }
}

export const MAIN_MENU = new MainMenu();
