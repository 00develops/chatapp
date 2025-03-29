import { 
    getFirestore, collection, addDoc, query, orderBy, onSnapshot 
  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyCF35vHGuRAuGlj5HsJuO3KpzVnRBSS4",
    authDomain: "healthhub-a6cf7.firebaseapp.com",
    databaseURL: "https://healthhub-a6cf7-default-rtdb.firebaseio.com",
    projectId: "healthhub-a6cf7",
    storageBucket: "healthhub-a6cf7.firebasestorage.app",
    messagingSenderId: "638795518527",
    appId: "1:638795518527:web:11bcc89421ef3e490a5e8a",
    measurementId: "G-YB94K9MX85"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  let roomId = "";
  
  // Join Room
  window.joinRoom = () => {
    roomId = document.getElementById('room-id').value.trim();
    if (roomId) {
      document.getElementById('room-screen').style.display = 'none';
      document.getElementById('chat-container').style.display = 'block';
      document.getElementById('room-label').textContent = roomId;
  
      loadMessages();
    } else {
      alert("Please enter a valid Room ID.");
    }
  };
  
  // Leave Room
  window.leaveRoom = () => {
    roomId = "";
    location.reload();
  };
  
  // Send Message
  window.sendMessage = async () => {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();
  
    if (messageText && roomId) {
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        text: messageText,
        timestamp: new Date()
      });
      messageInput.value = "";
    }
  };
  
  // Load Messages in Real-time
  const loadMessages = () => {
    const messagesDiv = document.getElementById('messages');
    const q = query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp"));
  
    onSnapshot(q, (snapshot) => {
      messagesDiv.innerHTML = "";
      snapshot.forEach((doc) => {
        const data = doc.data();
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = data.text;
  
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
    });
  };
  