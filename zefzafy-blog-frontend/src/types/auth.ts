export interface UserRegister {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  }
export interface UserLogin {
    email: string,
    password: string,
  }


  export interface IUserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: CloudinaryObject;
    isAccountVerified: boolean;
    verificationCode: number | null;
    role: string;
  
    // posts: PostEntity[];
  
    // likedPosts: PostEntity[];
  
    // comments: CommentEntity[];
  
    createdAt: string;
  
    updatedAt: string;

  }

  export type CloudinaryObject = {
    url: string;
    public_id: string | null;
  };