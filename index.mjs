import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "j1r4n2ztuwm0bhh5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "m97hgpt8y3ucoydw",
    password: "veqtm1daorxmy3px",
    database: "jnjrandpa885d6qp",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', async (req, res) => {
    let author =`SELECT authorId, firstName, lastName
                FROM authors ORDER BY lastName`;
    const [rows] = await pool.query(author);   
    console.log(rows); 

    let quotes = `SELECT DISTINCT category FROM quotes`;
    const[category] = await pool.query(quotes);
    console.log("CATEGORY: ", category);

   res.render('home.ejs', {rows, category});
});

app.get('/searchByAuthor', async (req, res) => {
    let authorId = req.query.authorId;
    let sql = `SELECT *
                FROM authors 
                NATURAL JOIN quotes 
                WHERE authorId LIKE ?`;
    
    const [rows] = await pool.query(sql, authorId)
    console.log(rows);
    res.render('results.ejs', {rows})
});

app.get('/searchByKeyword', async (req, res) => {
    console.log("SEARCH KEYWORD: ", req);
    
    let keyword = req.query.keyword;
    let sql = `SELECT *
                FROM authors
                NATURAL JOIN quotes
                WHERE quote LIKE ?`;
    
    let sqlParams = [`%${keyword}%`];
    const [rows] = await pool.query(sql, sqlParams);
    console.log(rows);
   res.render('results.ejs', {rows: rows})
});

app.get('/searchByCategory', async(req, res) => {
    let category = req.query.category;

    // console.log("SEARCH CATEGORY: ", category);
    let sql = `SELECT *
                FROM authors
                NATURAL JOIN quotes
                WHERE category = ?`;


    const [rows] = await pool.query(sql, category);
    console.log(rows);
    res.render('results.ejs', {rows: rows});
});

app.get('/searchByLikes', async(req, res) => {
    let minLikes = req.query.minLikes;
    let maxLikes = req.query.maxLikes;
    console.log("MIN LIKES", minLikes);
    console.log("MAX LIKES", maxLikes);
    

    let sql = `SELECT *
                FROM authors
                NATURAL JOIN quotes
                WHERE likes BETWEEN ? AND ?`;
    
    let sqlParams = [minLikes, maxLikes];

    const [rows] = await pool.query(sql, sqlParams);
    console.log("ROWSSS",rows);
    res.render('results.ejs', {rows: rows, minLikes: minLikes, maxLikes: maxLikes});
});

//locale API to get all info for a specific author
app.get('/api/authors/:authorId', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT * 
                FROM authors
                WHERE authorId = ?`;
    const [rows] = await pool.query(sql, [authorId]);
    res.send(rows); //local web api means we use send instead of render
});

app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})