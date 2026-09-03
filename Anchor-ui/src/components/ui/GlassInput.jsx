export default function GlassInput({ className = '', ...props }) {
  return (
    <input 
      className={`glass-panel w-full px-4 py-3 rounded-xl bg-white/5 outline-none focus:bg-white/10 transition-colors text-[var(--text-color)] placeholder-white/50 ${className}`} 
      {...props} 
    />
  );
}
