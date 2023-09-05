import { express } from "express";
import {mongoClient} from "mongodb";
import dotenv from "dotenv";

import { getMovies, postMovie, filterById, deleteMovieById } from "./helper.js"; // inde we have to import and export in .js files 
dotenv.config();
console.log(process.env)
const app = express();
const PORT = process.env.PORT; 

const movies=[
    {
        "id": "102",
        "name": "Jai Bhim",
        "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
        "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
        "rating": 8.8,
        "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
        "language": "tamil"
        },
        {
        "id": "103",
        "name": "The Avengers",
        "rating": 8,
        "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
        "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
        "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
        "language": "english"
        },
        
        {
        "id": "105",
        "name": "Baahubali",
        "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
        "rating": 8,
        "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
        "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
        "language": "telugu"
        }
]

const MONGO_URL =process.env.MONGO_URL; 
async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("mongo is connected");
    return client;
}

export const client = await createConnection();


app.use(express.json()); 

app.get("/", (request, response)=>{
    response.send("Hello World, Happy new Year")
});



app.get("/movies", async (request, response)=>{

    if(request.query.rating){
        request.query.rating = +request.query.rating;
    }
    console.log(request.query);
    const movie = await getMovies(request); // to convert from cursor to array to load the data.
    response.send(movie); 
}); 


app.post("/movies", async (request, response)=>{ //`we need to use express.json as a middle ware to tell the postman it's a jason data that is inserted in the above creteConnection
    const newMovies = request.body;
    console.log(newMovies);
    const result = await postMovie(newMovies);
    response.send(result); 
});


app.get("/movies/:id", async (request, response)=>{
    const {id} = request.params;
    console.log(id);

    const movie = await filterById(id);

    console.log(request.params); 
    movie 
    ? response.send(movie) 
    : response.status(404).send({message: "No movies found"});

}); 

app.delete("/movies/:id", async (request, response)=>{
    const {id} = request.params;
    console.log(id);

    const movie = await deleteMovieById(id);

    console.log(request.params); 
    response.send(movie);

}); 

app.listen(PORT, ()=>console.log(`Server Started : localhost:${PORT}
                                  Movies Port     : localhost:${PORT}/movies`)); 