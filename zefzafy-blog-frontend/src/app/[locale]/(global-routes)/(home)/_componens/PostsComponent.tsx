import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import PostCard from "./PostCard";
import { IPost, Pagination } from "@/types/post";
import { ChangeEvent } from "react";
import PaginationComponent from "@/app/[locale]/components/PaginationComponent";

const PostsComponent = ({
  posts,
  pagination,
  refetchPosts,
  setCurrentPage,
  page,
  search,
  category,
  userId,
  deletePost
}: {
  posts: IPost[];
  pagination: Pagination;
  refetchPosts: () => void;
  setCurrentPage: (page: number) => void;
  page: number;
  search?: string;
  category?: string;
  userId ?: number,
  deletePost: (args: { id: number; page?: number; search?: string; category?: string , userId? : number }) => void

}) => {
  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ mt: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="flex-start"
      >
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            refetchPosts={refetchPosts}
            page={page}
            search={search}
            category={category}
            userId={userId}
            deletePost={deletePost}
          />
        ))}
      </Grid>

      {pagination && pagination.pagesCount > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PaginationComponent
            count={pagination.pagesCount}
            currentPage={pagination.page}
            handlePageChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

export default PostsComponent;