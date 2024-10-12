// Konfigurasi Firebase (Ubah dengan konfigurasi Firebase milikmu)
const firebaseConfig = {
  apiKey: "AIzaSyDoeVFzyWoRKpNSY8SmjoCHZcag8hPG6Gk",
  authDomain: "iotmemes.firebaseapp.com",
  databaseURL:"https://iotmemes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotmemes",
  storageBucket: "iotmemes.appspot.com",
  messagingSenderId: "38087200914",
  appId: "1:38087200914:web:6b0562bc020be4d21dd64b",
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fungsi untuk menambahkan data ke tabel
function addReportToTable(timestamp, Jarak, Suhu, Humidity, Gempa) {
  const table = document
    .getElementById("sensorReportTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);
  cell1.textContent = timestamp;
  cell2.textContent = Jarak + " cm";
  cell3.textContent = Suhu + " °C";
  cell4.textContent = Humidity + " %";
  cell5.textContent = Gempa;
}

const reportsRef = database.ref(); 
reportsRef.on("value", (snapshot) => {
  const data = snapshot.val();
  console.log("Data diterima dari Firebase:", data); // Debugging

  // Menambahkan data ke tabel
  addReportToTable(
    new Date().toLocaleString(),  // Menggunakan timestamp dari waktu saat data diterima
    data.Jarak,
    data.Suhu,
    data.Humidity,
    data["Alert Getaran"]
  );
});

