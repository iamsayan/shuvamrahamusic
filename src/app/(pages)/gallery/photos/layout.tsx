import JsonLd from '@/components/json-ld';
import { SCHEMA } from '@/lib/schema';

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={[SCHEMA.breadcrumb('/gallery/photos')]} />
      {children}
    </>
  );
}
