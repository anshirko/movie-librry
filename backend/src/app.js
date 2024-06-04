import express from "express";
import { createHandler } from "graphql-http/lib/use/express"
import schema from "./schema.js";

import { ruruHTML } from "ruru/server";
import root from "./root.js";


const app = express();
const port = process.env.PORT || 3000;


// Create and use the GraphQL handler.
app.all(
    "/api/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/api/graphql" }))
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
})