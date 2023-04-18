export interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
  password?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: [string];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

export type FetchArticle = Pick<Article, 'title' | 'description' | 'body' | 'tagList'> & { slug?: string };

export interface MyKnownError {
  body: [string];
}

export type AuthResponseError = {
  errors: MyKnownError;
};
