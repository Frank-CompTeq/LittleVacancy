// ============================================
// Site Configuration
// ============================================

import { SiteConfig, NavigationItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'LittleVacancy',
  tagline: 'Short Getaways in North America',
  description: 'Discover perfect weekend getaways and short trips across North America. Expert guides for families and couples seeking memorable 2-4 day escapes.',
  url: 'https://littlevacancy.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/littlevacancy',
    instagram: 'https://instagram.com/littlevacancy',
    pinterest: 'https://pinterest.com/littlevacancy',
    facebook: 'https://facebook.com/littlevacancy',
  },
};

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'Southeast', href: '/region/southeast' },
      { label: 'Southwest', href: '/region/southwest' },
      { label: 'Northeast', href: '/region/northeast' },
      { label: 'West Coast', href: '/region/west-coast' },
      { label: 'Mountain', href: '/region/mountain' },
      { label: 'Canada', href: '/region/canada' },
      { label: 'Mexico', href: '/region/mexico' },
    ],
  },
  {
    label: 'Categories',
    href: '/categories',
    children: [
      { label: 'Weekend Getaways', href: '/category/weekend-getaways' },
      { label: 'Long Weekends', href: '/category/long-weekends' },
      { label: 'Family Escapes', href: '/category/family-escapes' },
      { label: 'Couples Retreats', href: '/category/couples-retreats' },
      { label: 'Practical Guides', href: '/category/practical-guides' },
    ],
  },
  {
    label: 'From Your City',
    href: '/from',
    children: [
      { label: 'Houston', href: '/from/houston' },
      { label: 'Dallas', href: '/from/dallas' },
      { label: 'Atlanta', href: '/from/atlanta' },
      { label: 'Chicago', href: '/from/chicago' },
      { label: 'New York', href: '/from/new-york' },
      { label: 'Los Angeles', href: '/from/los-angeles' },
      { label: 'Denver', href: '/from/denver' },
      { label: 'View All', href: '/from' },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
];

export const footerNavigation = {
  explore: [
    { label: 'All Destinations', href: '/destinations' },
    { label: 'Weekend Getaways', href: '/category/weekend-getaways' },
    { label: 'Family Trips', href: '/category/family-escapes' },
    { label: 'Couples Retreats', href: '/category/couples-retreats' },
  ],
  resources: [
    { label: 'Packing Guides', href: '/category/practical-guides' },
    { label: 'Travel Tips', href: '/tips' },
    { label: 'Newsletter', href: '/newsletter' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const categories = [
  {
    id: '1',
    name: 'Weekend Getaways',
    slug: 'weekend-getaways',
    description: 'Perfect 2-day escapes for a quick refresh',
    icon: '🌅',
  },
  {
    id: '2',
    name: 'Long Weekends',
    slug: 'long-weekends',
    description: '3-4 day trips to make the most of your time off',
    icon: '🏖️',
  },
  {
    id: '3',
    name: 'Family Escapes',
    slug: 'family-escapes',
    description: 'Kid-friendly adventures the whole family will love',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: '4',
    name: 'Couples Retreats',
    slug: 'couples-retreats',
    description: 'Romantic getaways for quality time together',
    icon: '💑',
  },
  {
    id: '5',
    name: 'Practical Guides',
    slug: 'practical-guides',
    description: 'Tips, packing lists, and travel advice',
    icon: '📋',
  },
];
