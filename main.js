// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoeVFzyWoRKpNSY8SmjoCHZcag8hPG6Gk",
    authDomain: "iotmemes.firebaseapp.com",
    databaseURL: "https://iotmemes-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iotmemes",
    storageBucket: "iotmemes.appspot.com",
    messagingSenderId: "38087200914",
    appId: "1:38087200914:web:6b0562bc020be4d21dd64b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const dbRef = firebase.database().ref();
  
  // Sidebar Toggle
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hide');
    content.classList.toggle('shrink');
  });
  
  // Fetch data from Firebase
  dbRef.on('value', (snapshot) => {
    const data = snapshot.val();
  
    // Access the sensor data
    const suhu = data.Suhu;
    const humidity = data.Humidity;
    const jarak = data.Jarak;
    const gempa = data.Gempa;
  
    // Display the data in HTML
    document.getElementById('suhu').innerText = suhu;
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('jarak').innerText = jarak;
    document.getElementById('gempa').innerText = gempa ? 'Detected' : 'Not Detected';
  
    // Update charts with fetched data
    updateChartJarak(jarak);
    updateChartSuhuKelembapan(suhu, humidity);
  });
  
  // Function to update Jarak chart
  function updateChartJarak(jarak) {
    chartJarak.data.labels.push('');  // Adding empty label for new point
    chartJarak.data.datasets[0].data.push(jarak); // Adding jarak to dataset
    chartJarak.update(); // Update the chart
  }
  
  // Function to update Suhu and Humidity chart
  function updateChartSuhuKelembapan(suhu, humidity) {
    chartSuhuKelembapan.data.labels.push('');  // Adding empty label for new point
    chartSuhuKelembapan.data.datasets[0].data.push(suhu); // Adding suhu to dataset
    chartSuhuKelembapan.data.datasets[1].data.push(humidity); // Adding humidity to dataset
    chartSuhuKelembapan.update(); // Update the chart
  }
  
  // Initialize Chart.js for Jarak
  const ctxJarak = document.getElementById('chartJarak').getContext('2d');
  const chartJarak = new Chart(ctxJarak, {
    type: 'line',
    data: {
      labels: [], // Initially empty, will be populated dynamically
      datasets: [{
        label: 'Jarak Air (cm)',
        data: [], // Data will be pushed dynamically
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      scales: {
        x: { display: true },
        y: { beginAtZero: true }
      }
    }
  });
  
  // Initialize Chart.js for Suhu and Humidity
  const ctxSuhuKelembapan = document.getElementById('chartSuhuKelembapan').getContext('2d');
  const chartSuhuKelembapan = new Chart(ctxSuhuKelembapan, {
    type: 'line',
    data: {
      labels: [], // Initially empty, will be populated dynamically
      datasets: [
        {
          label: 'Suhu (°C)',
          data: [], // Data will be pushed dynamically
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Kelembapan (%)',
          data: [], // Data will be pushed dynamically
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        }
      ]
    },
    options: {
      scales: {
        x: { display: true },
        y: { beginAtZero: true }
      }
    }
  });
  