
 export const handleGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self"); 
}

 export const handleGithub = () => {
    window.open("http://localhost:5000/auth/github", "_self"); 
    console.log("i just pressed the github button")
}
 export const handleTwitter = () => {
     window.open("http://localhost:5000/auth/twitter", "_self");
     console.log("i just pressed the twitter button")
 }
export const handleLogin = (data) => {
   console.log(data); 
}