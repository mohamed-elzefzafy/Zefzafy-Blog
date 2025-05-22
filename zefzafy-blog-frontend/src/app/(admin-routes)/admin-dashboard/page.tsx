import { Box } from "@mui/material"
import AdminDashboardPaper from "./_components/AdminDashboardPaper";


const AdminDasboardPage = () => {
  return (
 <Box sx={{px:6 , py :6 ,  height: {xs : "calc(100vh - 8rem)" , sm : "calc(100vh - 4rem)"}}}>
<AdminDashboardPaper/>
 </Box>
  )
}

export default AdminDasboardPage;