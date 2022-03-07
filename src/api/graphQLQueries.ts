import { gql } from 'apollo-boost';

//#region QUERIES



//#endregion

//#region MUTATIONS

export const LOGIN = gql`
  mutation login($loginInput: LoginUserInput!){
    login(loginInput: $loginInput)
    {
      access_token, 
      user
      { 
        createdAt,email,firstname,id,lastname,avatar,updatedAt,username
      }
    }
  }
  `

//#endregion