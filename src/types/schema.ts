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
  userId: number;
  blockedId: number;
}

export interface Like {
  userId: number;
  postId: number;
}

export interface View {
  userId: number;
  viewId: number;
}
