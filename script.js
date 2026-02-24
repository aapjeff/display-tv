// 1. Fungsi Jam Digital
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('clock').innerText = now.toLocaleTimeString('ms-MY', options);
}
setInterval(updateClock, 1000);
updateClock();

// 2. Fungsi Ambil Waktu Solat (Zon Kuching: SWK03)
async function getWaktuSolat() {
    // SWK03 adalah kod zon untuk Kuching, Bau, Lundu, Samarahan, Simunjan, Serian
    const zon = 'SWK03'; 
    const url = `https://mpt.i906.my/api/prayertimes/${zon}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        const times = result.data.times; // Array waktu: [Subuh, Syuruk, Zohor, Asar, Maghrib, Isyak]

        // Fungsi untuk format timestamp ke jam (contoh: 05:45 AM)
        const formatTime = (index) => {
            const date = new Date(times[index] * 1000);
            return date.toLocaleTimeString('ms-MY', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            }).toUpperCase();
        };

        // Masukkan data ke dalam HTML
        document.getElementById('subuh').innerText = formatTime(0);
        document.getElementById('zohor').innerText = formatTime(2);
        document.getElementById('asar').innerText = formatTime(3);
        document.getElementById('maghrib').innerText = formatTime(4);
        document.getElementById('isyak').innerText = formatTime(5);
        
        document.getElementById('location-name').innerText = "Zon: Kuching, Sarawak";
        console.log("Waktu solat Kuching berjaya dikemaskini.");

    } catch (error) {
        console.error("Gagal ambil waktu solat:", error);
        // Kalau internet pejabat down, paparkan mesej ni
        document.getElementById('location-name').innerText = "Tiada sambungan internet";
    }
}

// Jalankan fungsi waktu solat bila page buka
getWaktuSolat();

// Update waktu solat setiap 12 jam supaya sentiasa fresh
setInterval(getWaktuSolat, 43200000);