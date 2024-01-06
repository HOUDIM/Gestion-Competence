import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Acceuil',
    url: '/home',
    iconComponent: { name: 'cil-home' },
    badge: {
      color: 'info',
      text: '',
    },
  },
  {
    name: 'Employes',
    url: '/employees',
    iconComponent: { name: 'cil-user' },
    badge: {
      color: 'info',
      text: '',
    },
  },
  {
    name: 'Ressources Humaines',
    url: '/rh',
    iconComponent: { name: 'cil-user-female' },
    badge: {
      color: 'info',
      text: '',
    },
  },
  {
    name: 'Compétences',
    url: '/skills',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: '',
    },
  },
  // {
  //   title: true,
  //   name: 'Theme',
  // },
  {
    name: 'Formations',
    url: '/formations',
    iconComponent: { name: 'cil-calendar' },
  },
  {
    name: 'Evaluations',
    url: '/evaluations',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-bookmark' },
  },
  // {
  //   name: 'Modéles',
  //   title: true,
  // },
  {
    name: 'Modéles',
    url: '/models',
    iconComponent: { name: 'cil-puzzle' },
    children: [],
  },

];
