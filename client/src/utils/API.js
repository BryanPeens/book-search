import { gql } from '@apollo/client';
import { client } from './apolloClient';

// Route to get logged in user's info (needs the token)
export const getMe = async (token) => {
  const GET_ME = gql`
    query Me {
      me {
        _id
        username
        email
        bookCount
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
    const response = await client.query({
      query: GET_ME,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    return response.data.me;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
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
    // Log the response to see if token and user data are received
    console.log('User creation response:', response);

    // Check if response has data and createUser property
    if (response && response.data && response.data.createUser) {
      return response.data.createUser;
    } else {
      // Log error if createUser data is missing in the response
      console.error('User creation response is missing createUser data:', response);
      throw new Error('User creation response is missing createUser data');
    }
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

// Function to make a search to Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
