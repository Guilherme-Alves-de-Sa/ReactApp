/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { customScalarDateTime } from "../utils/types";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  createdAt: customScalarDateTime | null;
  email: string;
  firstname: string | null;
  id: string;
  lastname: string | null;
  avatar: string | null;
  updatedAt: customScalarDateTime | null;
  username: string;
}

export interface login_login {
  access_token: string;
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  loginInput: LoginUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LoginUserInput {
  password: string;
  username: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
