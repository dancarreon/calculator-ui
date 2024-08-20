import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Calculator', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'history', title: 'History', href: paths.dashboard.history, icon: 'users' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
