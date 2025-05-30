"use client";
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import DrawerComponent from './admin-dashboard/_components/DrawerComponent';
import { Book, Category, Comment, Dashboard, Group, PeopleOutlined, Receipt, TabletMac } from '@mui/icons-material';
import { Box } from '@mui/material';

const AdminDashboardArrayList = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin-dashboard" },
  { text: "Posts Table", icon: <Book/>, path: "/admin-dashboard/posts" },
  { text: "Users Table", icon: <Group />, path: "/admin-dashboard/users" },
  { text: "Categories Table", icon: <Category />, path: "/admin-dashboard/categories" },
  { text: "Comments Table", icon: <Comment />, path: "/admin-dashboard/comments" },

];

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo.email || !userInfo.isAccountVerified || userInfo.role !== "admin") {
      return router.push("/");
    }
  }, [router, userInfo.email, userInfo.isAccountVerified, userInfo.role]);

  return (
    <Box sx={{ display: 'flex' , gap : 0 }}>
      <DrawerComponent drawerOptions={AdminDashboardArrayList} />
        {children}
    </Box>
  );
};

export default AdminDashboardLayout;