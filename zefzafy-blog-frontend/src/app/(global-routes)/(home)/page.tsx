"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PostCard from "./_componens/PostCard";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/slices/api/categoryApiSlice";
import { useGetPostsQuery } from "@/redux/slices/api/postApiSlice";
import { ChangeEvent, useState } from "react";
import PaginationComponent from "@/app/components/PaginationComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createSearchKeywordAction } from "@/redux/slices/searchSlice";

// Styled components defined outside the Home component to prevent re-creation on render
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "30%",
  },
}));




const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchKeyWord } = useAppSelector((state) => state.search);
  const [searchWord, setSearchWord] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  console.log(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { data: postsResponse , refetch } = useGetPostsQuery(
    `?search=${searchKeyWord || ""}&page=${currentPage}&category=${category}`
  );
  console.log(postsResponse);

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };


  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Search sx={{ my: 1, border: "1px solid gray" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              dispatch(createSearchKeywordAction(e.target.value));
              setSearchWord(e.target.value);
            }}
            value={searchWord}
          />
        </Search>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoWidth
          >
            <MenuItem value={""}>All categories</MenuItem>
            {categories?.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {/* hero  section  */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 200, md: 400 },
          "& img": {
            objectFit: { xs: "cover", md: "fill" }, // "cover" on small screens, "fill" on medium+
          },
        }}
      >
        <Image
          alt="hero"
          src="/hero_image.jpg"
          width={1920}
          height={1080}
          quality={100}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

<Box sx={{ py: 2, px: 8  , display : "flex" , justifyContent : {xs : "center" , md : "flex-start"}} }>
        <Button
          variant="contained"
          size="medium"
          sx={{ width: "250px", textTransform: "capitalize" , }}
          onClick={()=> router.push("/post/add-post")}
        >
          Add Post
        </Button>
        </Box>


      {/* post sections  */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {postsResponse?.posts?.map((post) => (
          <PostCard key={post.id} post={post} refetchPosts={refetch} />
        ))}
      </Box>

      {postsResponse?.pagination && postsResponse.pagination.pagesCount > 1 && (
        <PaginationComponent
          count={postsResponse.pagination.pagesCount}
          currentPage={postsResponse.pagination.page}
          handlePageChange={handlePageChange}
        />
      )}
    </Stack>
  );
}
