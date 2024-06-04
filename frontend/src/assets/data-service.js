export default class dataService{
    static readMovies() {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `{ movies { id name created image description feedback authors { id name} } }`
            }),
        })
            .then(r => r.json())
            .then(res => res.data.movies)
    }
    static readMovieById(id) {
        return {
            id: 'guide-1',
            name: "Пчеловод",
            created: "01-01-2023",
            description: "test",
            authors: [
                {
                    id: "test",
                    name: "Jack Daniels"
                }
            ]
        }
    }
    static createAuthor(values) {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `mutation { createAuthor( name: "${values.name}", birthday: "${values.birthday}", image: "${values.image}") { id } }`
            }),
        })
            .then(r => r.json())
            .then(data => console.log("data returned:", data))
    }
    static readAuthors() {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `{ authors { id name birthday image } }`
            }),
        })
            .then(r => r.json())
            .then(res => res.data.authors)
    }
    static updateAuthor(values) {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `mutation { 
                        updateAuthor ( 
                            id: "${values.id}",
                            name: "${values.name}",
                            birthday: "${values.birthday}",
                            image: "${values.image}"
                        ) { id } }`
            }),
        })
            .then(r => r.json())
            .then(data => console.log("data returned:", data))
    }
    static updateMovie(values) {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `mutation { 
                        updateMovie ( 
                            id: "${values.id}",
                            name: "${values.name}",
                            created: "${values.created}",
                            authors: [${(values.authors || []).map(item => `"${item.id}"`)}],
                            feedback: "${values.feedback}"
                            description: "${values.description}"
                            image: "${values.image}"
                        ) { id } }`
            }),
        })
            .then(r => r.json())
            .then(data => console.log("data returned:", data))
    }
    static createMovie(values) {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `mutation { createMovie ( 
                        name: "${values.name}",
                        created: "${values.created}",
                        authors: [${(values.authors || []).map(item => `"${item.id}"`)}],
                        feedback: "${values.feedback}",
                        description: "${values.description}",
                        image: "${values.image}",
                    ) { id } }`
            }),
        })
            .then(r => r.json())
            .then(data => data.data.createMovie)
    }
    static readBindMovies(authorId) {
        return fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query:
                    `mutation { readBindMovies ( 
                        authorId: "${authorId}"
                    ) { id name } }`
            }),
        })
            .then(r => r.json())
            .then(data => data.data.readBindMovies)
    }
}