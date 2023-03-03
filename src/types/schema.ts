export interface User {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isAdmin: boolean;
  role: string;
  plan: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  desc: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Follow {
  id: number;
  userId: number;
  followId: number;
}

export interface Comment {
  id: number;
  comment: string;
  postId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: number;
  userId: number;
  blockedId: number;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
}

export interface View {
  id: number;
  userId: number;
  viewId: number;
}

export interface JWT {
  userId: number;
}
