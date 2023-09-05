import { client } from "./index.js";

//To get the functions drag and click the bulb to refactor in new module
export function getMovies(request) {
    return client
        .db("b29wd")
        .collection("movies")
        .find(request.query)
        .toArray();
}
export function deleteMovieById(id) {
    return client.db("b29wd")
        .collection("movies")
        .deleteOne({ id: id });
}
export function filterById(id) {
    return client.db("b29wd")
        .collection("movies").
        findOne({ id: id });
}
export function postMovie(newMovies) {
    return client
        .db("b29wd")
        .collection("movies")
        .insertMany(newMovies);
}