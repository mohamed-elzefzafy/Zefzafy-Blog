"use client";
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import DrawerComponent from './admin-dashboard/_components/DrawerComponent';
import { Book, Category, Comment, Dashboard, Group, PeopleOutlined, Receipt, TabletMac } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';



const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const t = useTranslations("Admin-Dashboard");
  const { userInfo } = useAppSelector((state) => state.auth);

  const AdminDashboardArrayList = [
  { text:t("dashboard"), icon: <Dashboard />, path: "/admin-dashboard" },
  { text: t("posts-table"), icon: <Book/>, path: "/admin-dashboard/posts" },
  { text: t("users-table"), icon: <Group />, path: "/admin-dashboard/users" },
  { text: t("categories-table"), icon: <Category />, path: "/admin-dashboard/categories" },
  { text: t("comments-table"), icon: <Comment />, path: "/admin-dashboard/comments" },

];
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