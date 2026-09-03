export default function GlassCard({ children, className = '', title, ...props }) {
  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`} {...props}>
      {title && <h2 className="text-xl font-semibold mb-4 text-[var(--text-color)]/90 tracking-wide">{title}</h2>}
      <div className="text-[var(--text-color)]/80">
        {children}
      </div>
    </div>
  );
}
