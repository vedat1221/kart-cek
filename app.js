// app.js

const express = require('express');
const app = express();
const path = require('path'); // Yeni eklenen satır

const port = 3000;

// Public klasörünü statik içerik olarak kullan
app.use(express.static(path.join(__dirname, 'public')));

// Ana dizin rotası (root route)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzerinde çalışıyor`);
});
