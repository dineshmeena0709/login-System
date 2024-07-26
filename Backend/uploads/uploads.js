const fs = require('fs');
const uploadDir = 'D:/Project/login-System/Backend/uploads'; // Adjust path as per your project structure

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
