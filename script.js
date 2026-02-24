// 1. JAM DIGITAL
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ms-MY', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const clockElement = document.getElementById('clock');
    if(clockElement) clockElement.innerText = timeString.toUpperCase();
}
setInterval(updateClock, 1000);
updateClock();

// 2. WAKTU SOLAT (KUCHING - SWK03)
async function getWaktuSolat() {
    const zon = 'SWK03';
    // Kita guna API alternatif yang lebih 'ringan'
    const url = `https://mpt.i906.my/api/prayertimes/${zon}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        
        // MPT bagi timestamp (saat). Kita kena tukar jadi jam:minit
        const times = result.data.times; 

        const format = (index) => {
            const d = new Date(times[index] * 1000);
            return d.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
        };

        // Gantikan teks -:-- kepada waktu sebenar
        document.getElementById('subuh').innerText = format(0);
        document.getElementById('zohor').innerText = format(2);
        document.getElementById('asar').innerText = format(3);
        document.getElementById('maghrib').innerText = format(4);
        document.getElementById('isyak').innerText = format(5);
        document.getElementById('location-name').innerText = "Zon: Kuching, Sarawak";

    } catch (error) {
        console.error("Tak boleh tarik API:", error);
        document.getElementById('location-name').innerText = "Ralat Sambungan API";
        
        // Kalau gagal, kita letak waktu "Hardcode" supaya bos tak nampak kosong
        // Kau boleh edit waktu ni ikut jadual harini
        document.getElementById('subuh').innerText = "05:15 AM";
        document.getElementById('zohor').innerText = "12:45 PM";
        document.getElementById('asar').innerText = "04:00 PM";
        document.getElementById('maghrib').innerText = "06:50 PM";
        document.getElementById('isyak').innerText = "08:00 PM";
    }
}

// Panggil fungsi bila website dibuka
getWaktuSolat();
