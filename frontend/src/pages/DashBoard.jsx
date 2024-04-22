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
import DeleteBook from '../components/DeleteBook';
import LoanedUsers from '../components/LoanedUsers';
import LoanedBooks from '../components/LoanedBooks';
import AllUsers from '../components/AllUsers';
import OverDueUsers from '../components/OverDueUsers';
// import AllBook from '../components/AllBooks';
import AllBooks from '../components/AllBooks';
import DashOutput from '../components/DashOutput';
import OverDueBooks from '../components/OverDueBooks';















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
      <div className='w-1/4 h-screen'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className='flex-grow flex items-center justify-center'>
          {(!tab || tab === 'dash') && <DashOutput />}
          {tab === 'profile' && <Profile />}
          {tab === 'add-book' && <AddBook />}
          {/* {tab === 'update-book' && <UpdateBook />} */}
          {/* {tab === 'delete-book' && <DeleteBook />}
          {tab === 'reserve-book' && <ReserveBook/>} */}
          {/* {tab === 'return-book' && <ReturnBook/>} */}
          {tab === 'loaned-user' && <LoanedUsers />}
          {tab === 'loaned-book' && <LoanedBooks />}
          {tab === 'all-users' && <AllUsers />}
          {tab === 'all-books' && <AllBooks />}
          {tab === 'over-due-users' && <OverDueUsers />}
          {tab === 'available-books' && <AvailableBooks />}
          {tab === 'book-bank' && <BookBank />}
          {tab === 'over-due-books' && <OverDueBooks />}
      </div> 
    </div>
  );
}