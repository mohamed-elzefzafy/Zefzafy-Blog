"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/slices/api/categoryApiSlice";
import {
  useDeletePostHomePageMutation,
  useGetPostsQuery,
} from "@/redux/slices/api/postApiSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createSearchKeywordAction } from "@/redux/slices/searchSlice";
import PostsComponent from "./_componens/PostsComponent";
import Grid from "@mui/material/Grid2";
import SearchParamComponent from "../post/[postId]/_components/SearchParamComponent";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import {useTranslations} from 'next-intl';

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
    width: "auto",
    minWidth: "200px",
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
  const searcParam = useSearchParams();
  const searchPramQuery = searcParam.get("CategoryIdfromAdminDashBoard");
  const dispatch = useAppDispatch();
  const { searchKeyWord } = useAppSelector((state) => state.search);
  const [searchWord, setSearchWord] = useState("");
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(searchPramQuery || "");
  const [deletePostHomePage] = useDeletePostHomePageMutation();
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data: postsResponse, refetch } = useGetPostsQuery(
    `?search=${searchKeyWord || ""}&page=${currentPage}&category=${category}`
  );

  const resetFiltersAndSearch = () => {
    setCategory("");
    setSearchWord("");
    setCurrentPage(1);
    dispatch(createSearchKeywordAction(""));
    refetch();
  };
const t = useTranslations("HomePage");
  return (
    <Container>
      <Stack sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "space-between",
            justifyContent: "center",
            mb: 2,
            width: { xs: "100%", sm: "80%", md: "60%" },
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search sx={{ border: "1px solid gray", flexGrow: 1 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={t("search") + "..."}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    dispatch(createSearchKeywordAction(e.target.value));
                    setSearchWord(e.target.value);
                  }}
                  value={searchWord}
                />
              </Search>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "80px",
                  height: "100%",
                  py: 1,
                }}
                onClick={resetFiltersAndSearch}
              >
                {t("reset")}
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>{t("category")}</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value={""}>{t("all-categories")}</MenuItem>
                {categoriesResponse?.categories?.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <SearchParamComponent returnPath="/admin-dashboard/categories" />
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            "& img": {
              objectFit: "cover",
              width: "100%",
              height: "100%",
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
        {userInfo.email && (
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: { xs: "100%", sm: "200px" },
                textTransform: "capitalize",
                maxWidth: "250px",
              }}
              onClick={() => router.push("/add-post")}
            >
              {t("add-Post")}
            </Button>
  
          </Box>
        )}
        {postsResponse && (
          <PostsComponent
            posts={postsResponse.posts}
            pagination={postsResponse.pagination}
            refetchPosts={refetch}
            setCurrentPage={setCurrentPage}
            page={currentPage}
            search={searchKeyWord}
            category={category}
            deletePost={deletePostHomePage}
          />
        )}
      </Stack>
    </Container>
  );
}
