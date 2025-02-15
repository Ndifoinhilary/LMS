import app from "./app/app.js"
import http from "http"
import dbConnect from "./config/dbConnect.js"

const  PORT = process.env.PORT || 3000

const server = http.createServer(app)


dbConnect().then(() =>{
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}).catch(err => console.log(err));