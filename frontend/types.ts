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
  ratingCount?: number;
  commentCount?: number;
  author: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  publishedOn?: string;
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

export type commentDataTypes = {
  _id: string;
  author: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  content: string;
  createdAt: string;
};

export enum fetchType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type FetchOptions = {
  revalidate?: number;
  noCache?: boolean;
  tags?: string[];
};
