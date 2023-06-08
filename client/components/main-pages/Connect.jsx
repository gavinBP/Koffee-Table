import React, { useState, useContext } from 'react';

function Connect({
  setConnected,
  connected,
  setBrokers,
  setTopics,
  userInfo,
  setUserInfo,
}) {
  //state for keeping track of input field and feedback message display
  const [clientId, setclientId] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [port, setPort] = useState(null);
  const [conStatus, setConStatus] = useState('none');

  const sendClusterData = (clientId, hostName, port) => {
    setConStatus('none');
    fetch('/getCluster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientId,
        hostName: hostName,
        port: port,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //check to make sure an error object is not sent back
        if (!data.err) {
          setBrokers(data.brokers);

          //populate topics state
          setTopics(data.topics.topics);

          //populate user info without touching username
          setUserInfo({
            clientId,
            hostName,
            port,
          });
          setConnected(true);
        } else {
          //set state of feedback message (connection failed)
          setConStatus('block');
          setConnected(false);
        }
      })

      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className="clusterWrapper">
      {!connected ? (
        <div className="connectCluster">
          <h1>Connect to Kafka Cluster</h1>
          <input
            placeholder="Client ID"
            className="input ClientId"
            onKeyUp={(v) => setclientId(v.target.value)}
          ></input>
          <input
            placeholder="Host Name"
            className="input hostName"
            onKeyUp={(v) => setHostName(v.target.value)}
          ></input>
          <input
            placeholder="Port"
            className="input Port"
            onKeyUp={(v) => setPort(v.target.value)}
          ></input>
          <button
            className="btn btnx sendClusterButton"
            onClick={() => sendClusterData(clientId, hostName, port)}
          >
            Submit
          </button>
          {/* checks if user info is defined in state */}
          {userInfo.length ? (
            <button
              className="btn btnx sendUserClusterButton"
              onClick={() =>
                sendClusterData(
                  userInfo.clientId,
                  userInfo.hostName,
                  userInfo.port
                )
              }
            >
              Connect with User Information
            </button>
          ) : null}
          <p id="connectionStatus" style={{ display: conStatus }}>
            Connection Failed
          </p>
        </div>
      ) : (
        <div className="form-wrapper" id="connectionSuccess">
          Connected
        </div>
      )}
    </div>
  );
}

export default Connect;
