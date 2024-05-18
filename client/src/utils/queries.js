import { gql } from '@apollo/client';
import { client } from './apolloClient';

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

// Function to make a search to Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
