import { IPost } from "@/types/post";
import axiosRequest from "@/utils/request";
import PostContent from "./_components/PostContent";

const PostPage = async ({params}: {params: Promise<{ postId: string }>;}) => {
  if (!(await params).postId) return;
  const { data: post } = await axiosRequest.get<IPost>(
    `/api/v1/post/${(await params).postId}`)
  return (
<PostContent post={post}/>
  );
};

export default PostPage;
