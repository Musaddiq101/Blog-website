import express  from "express";
import bodyParser from "body-parser";
import _ from "lodash"


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var posts = []


app.get("/", (req, res) => {
    res.render("home.ejs", {
        homeContent: homeStartingContent,
        blogPosts : posts
    });
    
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        contactContent: contactContent
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        aboutContent: aboutContent
    });
    
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs")
});

app.post("/compose", (req, res) => {
    const blogPost = {
        title: req.body["postTitle"],
        body: req.body["postBody"],
        id : posts.length
    };
    
    posts.push(blogPost);
    res.redirect("/")

});

app.get("/posts/:postName", (req, res) => {
    const requestedTitle = req.params["postName"];
    posts.forEach(post => {
        const storedTitle = post["title"];
        if (_.lowerCase(storedTitle) === _.lowerCase(requestedTitle)) {
            console.log(post["id"])
            res.render("post.ejs",{
                title : storedTitle,
                body : post["body"],
                id : post["id"]
            });
            
        } 
    });

});

app.get("/update/:indexofpost", (req, res) => {
    const idx = req.params["indexofpost"]
    console.log(idx)
    const title = posts[idx]["title"]
    const body = posts[idx]["body"]

    res.render("update.ejs", {
        titleToUpdate: title,
        bodyToUpdate: body,
        idx: idx
    });
});

app.post("/update", (req, res) => {
    const newBlogPost = {
        title: req.body["postTitle"],
        body: req.body["postBody"],
        id : req.body["idx"]
    };
    const idx = newBlogPost["id"]
    posts[idx] = newBlogPost;
    res.redirect("/");
});

app.get("/delete/:indexofpost", (req, res) => {
    const idx = req.params["indexofpost"]
    console.log(idx)
    posts.splice(idx, 1);
    posts.forEach(post => {
        if (post["id"] > 0) {
            post["id"] -= 1
        };
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
