const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require("multer"); 
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});
const upload = multer({ storage: storage });

let posts = [

        {
            id: uuidv4(),
            username: "aisha",
            content: "Lost in thought, finding clarity. 🌌 Some things don’t need words. #SilentStrength #Introspection #EyesSpeak",
            email: "aisha@gmail.com",
            age: 24,
            address: "101 Maple St",
            education: "Bachelor's in Graphic Design",
            dob: "2000-03-14",
            image: "/uploads/8.jpg"
        },
        {
            id: uuidv4(),
            username: "ryan",
            content: "Moments like these make you realize there’s a whole universe within. 🌠 #InnerWorld #UnchartedMind #StillnessSpeaks",
            email: "ryan@gmail.com",
            age: 26,
            address: "202 Cedar St",
            education: "Bachelor's in Software Engineering",
            dob: "1998-06-10",
            image: "/uploads/1.jpg"
        },
        {
            id: uuidv4(),
            username: "meena",
            content: "Let the eyes do the talking. Sometimes, silence says the most. 💭 #QuietConfidence #Unspoken #MysteryInTheEyes",
            email: "meena@gmail.com",
            age: 29,
            address: "303 Birch St",
            education: "Master's in Public Policy",
            dob: "1995-09-22",
            image: "/uploads/7.jpg"
        },
        {
            id: uuidv4(),
            username: "kumar",
            content: "In a world full of noise, choose to keep your story close. 🌙 #KeepItMysterious #HiddenDepths #SoulfulGaze",
            email: "kumar@gmail.com",
            age: 28,
            address: "404 Walnut St",
            education: "PhD in Computer Science",
            dob: "1996-01-18",
            image: "/uploads/2.jpg"
        },
        {
            id: uuidv4(),
            username: "jess",
            content: "Not every moment is for sharing; some are meant to be felt deeply. 🖤 #PersonalJourney #MomentsUnseen #InnerStrength",
            email: "jess@gmail.com",
            age: 23,
            address: "505 Elm St",
            education: "Bachelor's in Information Systems",
            dob: "2001-04-09",
            image: "/uploads/3.jpg"
        },
        {
            id: uuidv4(),
            username: "leo",
            content: "Eyes that hold a thousand stories, but only a few will ever be told. ✨ #Unwritten #Depth #MysteriousSoul",
            email: "leo@gmail.com",
            age: 27,
            address: "606 Spruce St",
            education: "Master's in Cybersecurity",
            dob: "1997-02-24",
            image: "/uploads/4.jpg"
        },
        {
            id: uuidv4(),
            username: "zara",
            content: "A calm exterior hides a storm within. Some things are better left unsaid. 🌊 #Poised #BeneathTheSurface #ControlledChaos",
            email: "zara@gmail.com",
            age: 25,
            address: "707 Willow St",
            education: "Bachelor's in Computer Engineering",
            dob: "1999-11-05",
            image: "/uploads/9.jpg"
        },
        {
            id: uuidv4(),
            username: "max",
            content: "Beyond the smile, there’s always more. Life’s depth can’t be seen at first glance. 🕶️ #Layers #TrueSelf #MoreThanMeetsTheEye",
            email: "max@gmail.com",
            age: 30,
            address: "808 Ash St",
            education: "PhD in Finance",
            dob: "1994-03-16",
            image: "/uploads/5.jpg"
        },
        {
            id: uuidv4(),
            username: "sophia",
            content: "Caught the golden hour perfectly 🌅✨ #SunsetVibes #PeacefulMoments",
            email: "sophia@gmail.com",
            age: 28,
            address: "909 Cedar St",
            education: "Master's in Data Science",
            dob: "1996-08-02",
            image: "/uploads/10.jpg"
        },
        {
            id: uuidv4(),
            username: "raj",
            content: "Sunday morning hikes 🥾🌲 Nothing like fresh air and quiet trails. #NatureLover",
            email: "raj@gmail.com",
            age: 26,
            address: "1001 Poplar St",
            education: "Bachelor's in Software Development",
            dob: "1998-12-20",
            image: "/uploads/6.jpg"
        },
        {
            id: uuidv4(),
            username: "anaya",
            content: "A weekend well spent with family ❤️ Cherishing every moment. #FamilyTime",
            email: "anaya@gmail.com",
            age: 24,
            address: "1102 Alder St",
            education: "Bachelor's in Industrial Design",
            dob: "2000-05-17",
            image: "/uploads/12.jpg"
        },
        {
            id: uuidv4(),
            username: "omar",
            content: "Sunshine and sandy beaches 🏖️ Already dreaming of my next trip. #BeachBum",
            email: "omar@gmail.com",
            age: 29,
            address: "1203 Fir St",
            education: "PhD in Quantum Computing",
            dob: "1995-07-30",
            image: "/uploads/3.jpg"
        }
    
    
    
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", upload.single("image"), (req, res) => {
    const { username, content, age, address, email, education, dob } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const id = uuidv4();
    posts.push({ id, username, content, age, address, email, education, dob, image });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("see.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", upload.single("image"), (req, res) => {
    const { id } = req.params;
    const { username, content, age, address, email, education, dob } = req.body;
    const post = posts.find((p) => id === p.id);

    post.username = username;
    post.content = content;
    post.age = age;
    post.address = address;
    post.email = email;
    post.education = education;
    post.dob = dob;

    if (req.file) {
        post.image = `/uploads/${req.file.filename}`;
    }

    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
