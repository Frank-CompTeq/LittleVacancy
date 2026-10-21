interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    accent: 'bg-accent text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        text-xs font-semibold uppercase tracking-wider
        rounded-full ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
