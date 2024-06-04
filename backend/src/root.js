import {v4 as uuidv4 } from 'uuid';


const arrayMovies = [
    {
        id: '1',
        name: "Sex in the city",
        created: null,
        authors: []
    }
];
const arrayAuthors = [];
const arrayFeedbacks = []

// The root provides a resolver function for each API endpoint
const root = {
    createAuthor({name, birthday, image}) {
        const author = {
            id: uuidv4(),
            name,
            birthday,
            image
        }
        arrayAuthors.push(author);

        return author;
    },
    updateAuthor({id, name, birthday, image}) {

        const index = arrayAuthors.findIndex(item => item.id === id);
        if (index === -1) return ;

        arrayAuthors[index] = {
            ...arrayAuthors[index],
            name,
            birthday,
            image
        }

        return arrayAuthors[index];
    },
    createMovie({name, created, authors, image,  description, feedback}) {
        const movie = {
            id: uuidv4(),
            created,
            name,
            authors,
            image,
            description, feedback
        };
        arrayMovies.push(movie);
        return movie;
    },
    updateMovie({name, created, authors, image, id, description, feedback}) {
        const index = arrayMovies.findIndex(item => item.id === id);
        if (index === -1) return ;

        arrayMovies[index] = {
            ...arrayMovies[index],
            name,
            created,
            image,
            authors,
            description, feedback
        }

        return arrayMovies[index];
    },

    authors() {
        return arrayAuthors;
    },
    movies() {
        const allAuthors = this.authors()
        return arrayMovies.map(item => {
            return {
                ...item,
                authors: (item.authors || []).map(authorId => allAuthors.find(author => author.id === authorId)),
            }
        });
    },
    readBindMovies({authorId}) {
        return this.movies()
            .filter(movie => movie.authors.find(author => author.id === authorId))
    },

}

export default root