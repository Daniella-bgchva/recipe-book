export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar?: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
    message: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}

export interface Recipe {
  _id: string;
  title: string;
  recipe: string;
  ingredients: string[];
  image?: string;
  isPublished: boolean;
  user: User | string;
}

export interface RecipeMutation {
  title: string;
  recipe: string;
  ingredients: string[];
  image?: File;
}
