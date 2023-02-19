import app from './server.js'
import mongodb from 'mongodb'
require("dotenv").config({ path: resolve(__dirname, ".env") });
const { resolve } = require("path");
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'


async function main() {
    dotenv.config()

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI,

        )
        const port = process.env.PORT || 8000

        try {
            await client.connect()
            await MoviesDAO.injectDB(client)
            await ReviewsDAO.injectDB(client)
            // app.listen(port, () =>{
            //     console.log('server is running on PORT:' +port)
            // })

            app.listen(process.env.PORT || 3000, function(){
                console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
              });
        } catch (e) {
            console.error(e);
            process.exit(1);
        }

}
main().catch(console.error)