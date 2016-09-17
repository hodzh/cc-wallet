export interface MainMenuItem {
  title: string;
  state: string;
  role?: string;
}

export const MAIN_MENU: MainMenuItem[] = [
  {
    title: 'Admin Users',
    state: '/admin/users',
    role: 'admin'
  }
];
