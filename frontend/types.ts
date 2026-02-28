export type authFormTypes = {
  name?: string;
  email: string;
  password: string;
};

export type blogDataTypes = {
  _id?: string;
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  commentCount?: number;
  author: {
    _id: string;
    name: string;
    imageUrl: string;
  };
};

export type RouteParams = {
  blogId: string;
};

export type userDataTypes = {
  name: string;
  email: string;
  bio: string;
  linkedin: string;
};
