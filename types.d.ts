type Tags = {
  id: string;
  title: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  emailVerified: null;
  image: null;
  userType: string;
};
type LoginResponse = {
  accessToken: string,
  message: string,
  status: number,
  user: User,
};
type LoginParameters = {
  name: string,
  password: string,
  email: string,
};

type Post = {
  Image: string,
  tags?:Array,
  author: {
    id: number, name: string, email: string, password?: string, emailVerified: boolean | null, userType: string
  },
  authorId: number
  content: string,
  created_at: string,
  id: number,
  published: boolean,
  title: string
}

type Comments = {
  id: string
  content:string
  created_at:string
  dislikes:number
  likes:number
  postId:number
  published:boolean
  replies:Array
  user:User
  userId:number
  

}

type vote = {
  id: string
  userName:string
}