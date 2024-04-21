import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
// import DashProfile from '../components/DashProfile';
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';
import AddBook from '../components/AddBook';
import BookBank from '../components/BookBank';
import UpdateBook from '../components/UpdateBook';
import AvailableBooks from '../components/AvailableBooks';
import ReserveBook from '../components/ReserveBook';
import DashSidebar from '../components/DashSideBar';
import ReturnBook from '../components/ReturnBook';
import Profile from './ProfilePage';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {tab === 'profile' && <Profile />}
      {tab === 'add-book' && <AddBook />}
      {tab === 'book-bank' && <BookBank />}
      {tab === 'update-book' && <UpdateBook />}
      {tab === 'available-books' && <AvailableBooks />}
      {tab === 'reserve-book' && <ReserveBook/>}
      {tab === 'return-book' && <ReturnBook/>}
    
    
    </div>
  );
}