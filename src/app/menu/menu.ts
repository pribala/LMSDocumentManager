import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
 
// Main menu
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'files',
    title: 'Files',
    translate: 'MENU.FILES',
    type: 'item',
    icon: 'file',
    url: 'files'
  },
  {
    id: 'settings',
    title: 'Settings',
    translate: 'MENU.SETTINGS',
    type: 'item',
    icon: 'settings',
    url: 'settings'
  }
];
