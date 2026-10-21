import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  image,
  imageAlt,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative bg-secondary-light">
      {/* Background Image (if provided) */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
      )}

      <div className={`container mx-auto px-4 md:px-8 py-16 md:py-24 relative ${image ? 'text-white' : ''}`}>
        <div className="max-w-3xl">
          {badge && (
            <p className={`font-semibold text-sm uppercase tracking-wider mb-3 ${image ? 'text-accent-light' : 'text-accent'}`}>
              {badge}
            </p>
          )}
          <h1 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${image ? 'text-white' : 'text-primary'}`}>
            {title}
          </h1>
          {description && (
            <p className={`text-lg md:text-xl ${image ? 'text-gray-200' : 'text-gray-700'}`}>
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
