import User from "../models/User";

export const getJoin = (req,res) =>
 res.render("join", {pageTitle:"Join"});
export const postJoin = async( req, res) => {
    console.log(req.body);
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "Join"
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage:"Password confirmation dose not match.",
        });
    }
    const exists = await User.exists({$or: [{username},{email}]});
    if(exists){
        return res.status(400).render("join", {
        pageTitle, 
        errorMessage:"This username/email is already taken",
        });
    }
    
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
          pageTitle: "Upload Video",
          errorMessage: error._message,
        });
      }
};
export const getLogin = (req,res) =>
 res.render("login", {pageTitle:"Login"});

 export const postLogin = (req,res) =>{
    const{username,password} = req.body;
    //check if account exists
     //check if password correct

    res.end();
 };



export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const logout = (req,res) => res.send("Logout");
export const see = (req,res) => res.send("See User");