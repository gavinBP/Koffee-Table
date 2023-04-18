import React from 'react';

function SignUp() {
  const signUp = () => {

    const feedback = document.querySelectorAll('.feedback')
    const [username, password, clientID, hostName, port] = document.querySelectorAll('.signUp');
    
    feedback.forEach(fb => fb.style.opacity = 0)


    if(username.value === ""|| password.value === "") {
    feedback[2].style.opacity = 1;
    return;
    };

    fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        clientID: clientID.value,
        hostName: hostName.value,
        port: port.value,
      }),
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      if(data === null) {feedback[1].style.opacity = 1; return}
      if(!data.err) feedback[0].style.opacity = 1 ;
    })
    .catch((err)=>{
      console.log('error in Login', err)
    })

    username.value = ""
    password.value = ""
    clientID.value = ""
    hostName.value = ""
    port.value = ""
  };

  return (
    <div id="loginPage">
      <h1>Sign here!</h1>
      <input 
      id="usernameField" 
      className="login signUp" 
      placeholder="username" 
      />
      <input 
      id="passwordField" 
      className="login signUp" 
      placeholder="password" 
      />
      <input
        id="clientIDField"
        className="signupUserData signUp"
        placeholder="Client ID - optional"
      />
      <input
        id="hostNameFlied"
        className="signupUserData signUp"
        placeholder="Host Name - optional"
      />
      <input
        id="portField"
        className="signupUserData signUp"
        placeholder="Port - optional"
      />
      <button id="loginButton" className="login signUp" onClick={signUp}>Login</button>
      <div>
        <div id="success" className='feedback'>User created!</div>
        <div id="fail" className='feedback'>User already exists!</div>
        <div id="partial" className='feedback'>Finish the form please!</div>
      </div>
    </div>
  );
}

export default SignUp;