export function initPomodoro() {
    console.log("Đang khởi tạo Pomodoro Widget...");

    // 1. Cấu hình
    const MODES = {
        focus: 1500,    // 25 phút
        shortBreak: 300 // 5 phút
    };
    let timeLeft = MODES.focus;
    let timerInterval;
    let isRunning = false;
    let currentMode = 'focus';

    // 2. Lấy các phần tử từ HTML (DOM Selectors)
    // Lưu ý: Chúng ta tìm trong document, hoặc giới hạn trong .pomodoro-widget nếu muốn
    const widget = document.querySelector('.pomodoro-widget');
    if (!widget) return; // Nếu không tìm thấy widget thì dừng lại để tránh lỗi

    const minutesEl = widget.querySelector('#minutes');
    const secondsEl = widget.querySelector('#seconds');
    const statusEl = widget.querySelector('#pomo-status');
    const startBtn = widget.querySelector('#btn-start');
    const resetBtn = widget.querySelector('#btn-reset');
    const modeBtns = widget.querySelectorAll('.mode-btn');

    // 3. Hàm hiển thị thời gian
    function updateDisplay() {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        minutesEl.textContent = m < 10 ? '0' + m : m;
        secondsEl.textContent = s < 10 ? '0' + s : s;
        
        // Cập nhật title tab trình duyệt
        document.title = `${minutesEl.textContent}:${secondsEl.textContent} - Focus`;
    }

    // 4. Xử lý logic đếm ngược
    function toggleTimer() {
        if (isRunning) {
            // Đang chạy -> Tạm dừng
            clearInterval(timerInterval);
            startBtn.textContent = "Tiếp tục";
            statusEl.textContent = "Đã tạm dừng";
            isRunning = false;
        } else {
            // Đang dừng -> Chạy
            startBtn.textContent = "Tạm dừng";
            statusEl.textContent = currentMode === 'focus' ? "Đang tập trung..." : "Đang nghỉ ngơi...";
            isRunning = true;
            
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.textContent = "Bắt đầu";
                    alert("Hết giờ rồi!");
                    // Reset về chế độ mặc định nếu muốn
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "Bắt đầu";
        statusEl.textContent = "Sẵn sàng";
        timeLeft = MODES[currentMode];
        updateDisplay();
    }

    function switchMode(e) {
        // Xóa class active ở tất cả nút
        modeBtns.forEach(btn => btn.classList.remove('active'));
        
        // Thêm class active vào nút vừa bấm
        const clickedBtn = e.target;
        clickedBtn.classList.add('active');

        // Lấy chế độ từ thuộc tính data-mode (focus hoặc shortBreak)
        const mode = clickedBtn.getAttribute('data-mode');
        currentMode = mode;
        
        // Cập nhật trạng thái text
        statusEl.textContent = mode === 'focus' ? 'Chế độ Tập trung' : 'Chế độ Nghỉ ngơi';
        
        // Reset đồng hồ
        resetTimer();
    }

    // 5. GẮN SỰ KIỆN (Event Listeners) - Thay thế cho onclick trong HTML
    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Gắn sự kiện cho các nút chuyển chế độ
    modeBtns.forEach(btn => {
        btn.addEventListener('click', switchMode);
    });

    // Chạy lần đầu để hiện số 25:00
    updateDisplay();
}