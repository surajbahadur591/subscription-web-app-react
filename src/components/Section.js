import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'

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

  if (user){
     console.log(user);
  const email = user.email;
  const id = user.id;
  const roles = user.app_metadata.roles[0];
  const fullname = user.user_metadata.full_name;
  const token = user.token.access_token;
  
  console.log(email);
  console.log(id);
  console.log(fullname);
  console.log(token);
  
  console.log(roles);
  
  }
 
  return (
    <div>
      <h1>Coding Sikho</h1>
      <h3> Welcome to new era of Learning</h3>
      <button onClick={handleLogin}>{user ? 'logout': 'login'}</button>
      <h1>{user && `welcome ${user.user_metadata.full_name}`} </h1>
      
    </div>
  )
}

export default Section
