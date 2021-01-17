import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
const fetch = require('node-fetch');

// this is the main part of app

// initial setup of netlify identity
netlifyIdentity.init();

const Section = () => {

  const handleLogin = () => {
    // for login/ signup pop up 
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => console.log('welcome', user)
    // window.location.reload(true);
    
    );
  }

  const user = netlifyIdentity.currentUser();
  let token='';
  if (user){
     console.log(user);
  const email = user.email;
  const id = user.id;
  const roles = user.app_metadata.roles[0];
  const fullname = user.user_metadata.full_name;
  token = user.token.access_token;
  
  console.log(email);
  console.log(id);
  console.log(fullname);
  console.log(token);
  console.log(roles);
  
  }

  async function getLink(){
    const link = await fetch('.netlify/functions/create-manage-link', {
      method: "POST",
      // mode: "no-cors",
      headers: {
        // 'Access-Control-Allow-Origin' : "*",
        'Authorization': `Bearer ${token}`
      },
    }).then((res) => res.json())
    .then((link) => {
      console.log(link);
  });
  
    console.log(link);

  }

  getLink();
 
 
  return (
    <div>
      <h1>Coding Sikho</h1>
      <h3> Welcome to new era of Learning</h3>
      <button onClick={handleLogin}>{user ? 'logout': 'login'}</button>
      <h1>{user && `welcome ${user.user_metadata.full_name}`} </h1>
      <h3>{user && `you have as ${user.app_metadata.roles[0]}`} </h3>
      
    </div>
  )
}

export default Section
