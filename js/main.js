// Import hàm initPomodoro từ file widget
import { initPomodoro } from './widgets/pomodoro.js'; 
// Lưu ý: Đường dẫn './widgets/pomodoro.js' phải đúng với thư mục bạn tạo

document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm khởi tạo Pomodoro
    initPomodoro();
    
    console.log("Life OS Main Loaded");
});