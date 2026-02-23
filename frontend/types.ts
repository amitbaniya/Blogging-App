export type authFormTypes = {
  name?: string;
  email: string;
  password: string;
};

export type blogDataTypes = {
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    name: string;
  };
};

export type RouteParams = {
  blogId: string;
};
