import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'

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
  const fullname = user.user_metadata.full_name;
  const token = user.token.access_token;
  const userType = user.app_metadata.provider;
  console.log(email);
  console.log(id);
  console.log(fullname);
  console.log(token);
  console.log(userType);
  
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
