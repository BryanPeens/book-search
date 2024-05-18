import { gql } from '@apollo/client';
import { client } from './apolloClient';

export const createUser = async (userData) => {
  const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: CREATE_USER,
      variables: userData,
    });
    return response.data.createUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: userData,
    });
    return response.data.login;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const saveBook = async (bookData, token) => {
  const SAVE_BOOK = gql`
    mutation SaveBook($bookData: BookInput!) {
      saveBook(bookData: $bookData) {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: SAVE_BOOK,
      variables: { bookData },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    return response.data.saveBook;
  } catch (error) {
    console.error('Error saving book:', error);
    throw error;
  }
};

export const deleteBook = async (bookId, token) => {
  const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
      deleteBook(bookId: $bookId) {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: DELETE_BOOK,
      variables: { bookId },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    return response.data.deleteBook;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
