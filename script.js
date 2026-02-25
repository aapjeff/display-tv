// 1. JAM DIGITAL LIVE
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ms-MY', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    const clockElement = document.getElementById('clock');
    if(clockElement) clockElement.innerText = timeString.toUpperCase();
}
setInterval(updateClock, 1000);
updateClock();

// 2. FUNGSI TUKAR 24 JAM KE 12 JAM
function tkr12Jam(masa) {
    if(!masa) return "-:--";
    let [jam, minit] = masa.split(':');
    jam = parseInt(jam);
    let ampm = jam >= 12 ? 'PM' : 'AM';
    jam = jam % 12;
    jam = jam ? jam : 12; // kalau 0, jadi 12
    return `${jam}:${minit} ${ampm}`;
}

// 3. WAKTU SOLAT LIVE (KUCHING/PADAWAN)
async function getWaktuSolat() {
    const lat = 1.43;
    const lng = 110.33;
    const method = 11; // Method JAKIM

    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network Error');
        
        const result = await response.json();
        const t = result.data.timings;

        // Masukkan data LIVE dengan format 12 jam
        document.getElementById('subuh').innerText = tkr12Jam(t.Fajr);
        document.getElementById('zohor').innerText = tkr12Jam(t.Dhuhr);
        document.getElementById('asar').innerText = tkr12Jam(t.Asr);
        document.getElementById('maghrib').innerText = tkr12Jam(t.Maghrib);
        document.getElementById('isyak').innerText = tkr12Jam(t.Isha);
        
        document.getElementById('location-name').innerText = "Zon: Kuching (LIVE)";

    } catch (error) {
        console.error("Gagal tarik API:", error);
        document.getElementById('location-name').innerText = "MENYAMBUNG SEMULA...";
        
        // Cuba panggil balik setiap 10 saat kalau gagal
        setTimeout(getWaktuSolat, 10000);
    }
}

// Jalankan fungsi
getWaktuSolat();
