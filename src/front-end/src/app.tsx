import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Books</h1>
      <div>
        {data.getBooks.map((book: { id: string; name: string }) => (
          <div key={`book-${book.id}`}>
            <p>{book.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
