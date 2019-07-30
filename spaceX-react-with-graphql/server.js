const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const app = express();

// Allow Cross-Origin
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`now listening for request on port ${PORT}`)
})

