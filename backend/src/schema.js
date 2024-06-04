import { buildSchema } from "graphql"

const schema = buildSchema(`
  type Query {
    movies: [Movie],
    authors: [Author],
  }
  type Movie {
    id: String,
    name: String
    created: String,
    authors: [Author],
    image: String,
    description: String,
    feedback: String
  }

  type Author {
    id: String,
    name: String,
    birthday: String,
    image: String,
  }

  
  type Mutation {
    getMovies: [Movie],
    createAuthor(name: String, birthday: String, image: String): Author,
    updateAuthor(id: String, name: String, birthday: String, image: String): Author,
    createMovie(name: String, created: String, authors: [String], image: String, description: String, feedback: String): Movie,
    updateMovie(id: String, name: String, created: String, authors: [String], image: String, description: String, feedback: String): Movie,
    readBindMovies(authorId: String): [Movie],
  }
`)

export default schema;