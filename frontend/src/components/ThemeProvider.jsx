import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-gray-300 text-gray-800 dark:bg-800 min-h-screen'>
        {children}
      </div>
    </div>
  );
}