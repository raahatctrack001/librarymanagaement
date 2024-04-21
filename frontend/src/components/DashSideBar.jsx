import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiUpload,
  HiSearch,
  HiBookmarkAlt,
  HiDocumentAdd,
  HiFolderAdd,
  HiReceiptRefund,
  HiUsers,
  HiBookOpen,
} from 'react-icons/hi';
import { FaBook, FaBookAtlas, FaBookSkull, FaPeopleLine, FaResolving } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaPeopleArrows } from 'react-icons/fa';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className=''>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=add-book'>
              <Sidebar.Item
                active={tab === 'add-book'}
                icon={HiDocumentAdd}
                as='div'
              >
                Add Book
              </Sidebar.Item>
            </Link>
          
              <Link to='/dashboard?tab=update-book'>
                <Sidebar.Item
                  active={tab === 'update-book'}
                  icon={HiUpload}
                  as='div'
                >
                  Update Book
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=delete-book'>
                <Sidebar.Item
                  active={tab === 'delete-book'}
                  icon={HiUpload}
                  as='div'
                >
                  delete Book
                </Sidebar.Item>
              </Link>
              
              <Link to='/dashboard?tab=reserve-book'>
                <Sidebar.Item
                  active={tab === 'reserve-book'}
                  icon={HiFolderAdd}
                  as='div'
                >
                  Reserve Book
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=return-book'>
                <Sidebar.Item
                  active={tab === 'return-book'}
                  icon={HiReceiptRefund}
                  as='div'
                >
                  Return Book
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=loaned-user'>
                <Sidebar.Item
                  active={tab === 'loaned-user'}
                  icon={HiUsers}
                  as='div'
                >
                  loaned-users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=loaned-book'>
                <Sidebar.Item
                  active={tab === 'loaned-book'}
                  icon={FaResolving}
                  as='div'
                >
                  loaned books
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=all-users'>
                <Sidebar.Item
                  active={tab === 'all-users'}
                  icon={FaPeopleLine}
                  as='div'
                >
                  All Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=over-due-users'>
                <Sidebar.Item
                  active={tab === 'over-due-users'}
                  icon={FaPeopleLine}
                  as='div'
                >
                 Over Due Users
                </Sidebar.Item>
              </Link>
              
            </>
          )}
          <Link to='/dashboard?tab=all-books'>
                <Sidebar.Item
                  active={tab === 'all-books'}
                  icon={FaBookAtlas}
                  as='div'
                >
                  All Books
                </Sidebar.Item>
              </Link>
          <Link to='/dashboard?tab=available-books'>
                <Sidebar.Item
                  active={tab === 'available-books'}
                  icon={HiSearch}
                  as='div'
                >
                  Available Books
                </Sidebar.Item>
              </Link>
            
            
          <Link to='/dashboard?tab=book-bank'>
            <Sidebar.Item
              active={tab === 'book-bank'}
              icon={HiBookOpen}
              as='div'
            >
              Current Loans
            </Sidebar.Item>
          </Link>
             
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}