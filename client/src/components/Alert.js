const Alert = ({ className, children }) => {
  return (
    <div className={`p-3 mb-2 text-sm font-medium border-l-4 ${className}`}>
      <p className='flex items-center'>{children}</p>
    </div>
  );
};

export default Alert;
