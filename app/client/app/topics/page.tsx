'use client';
import withAuth from '@/hoc/withAuth';
import { Gallery } from '../../components/Gallery';

function ThemesPage() {
  return (
    <Gallery />
  );
}

export default withAuth(ThemesPage, ['admin', 'Creador', 'Lector']);