import { notFound } from 'next/navigation';
import DesignSystemClient from './DesignSystemClient';

export const metadata = {
  title: 'Design System | Iveoma Development Network',
  description: 'Institutional UI Standards and Design System for Iveoma Development Network.',
};

export default function DesignSystemPage() {
  // Hide from visitors in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return <DesignSystemClient />;
}
