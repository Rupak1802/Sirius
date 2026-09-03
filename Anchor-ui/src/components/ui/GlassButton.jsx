export default function GlassButton({ children, className = '', variant = 'primary', ...props }) {
  const baseStyle = "glass-panel px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "hover:bg-white/20 text-white",
    success: "hover:bg-green-500/20 text-green-300 border-green-500/30",
    danger: "hover:bg-red-500/20 text-red-300 border-red-500/30"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
