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

// jam 24 jadi 12
function tkr12Jam(masa) {
    if(!masa) return "-:--";
    let [jam, minit] = masa.split(':');
    jam = parseInt(jam);
    let ampm = jam >= 12 ? 'PM' : 'AM';
    jam = jam % 12;
    jam = jam ? jam : 12; 
    return `${jam}:${minit} ${ampm}`;
}

// waktu solat live
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

        if(document.getElementById('subuh')) document.getElementById('subuh').innerText = tkr12Jam(t.Fajr);
        if(document.getElementById('zohor')) document.getElementById('zohor').innerText = tkr12Jam(t.Dhuhr);
        if(document.getElementById('asar')) document.getElementById('asar').innerText = tkr12Jam(t.Asr);
        if(document.getElementById('maghrib')) document.getElementById('maghrib').innerText = tkr12Jam(t.Maghrib);
        if(document.getElementById('isyak')) document.getElementById('isyak').innerText = tkr12Jam(t.Isha);
        
        if(document.getElementById('location-name')) document.getElementById('location-name').innerText = "Zon: Kuching (LIVE)";

    } catch (error) {
        console.error("Gagal tarik API:", error);
        if(document.getElementById('location-name')) document.getElementById('location-name').innerText = "MENYAMBUNG SEMULA...";
        
        // Cuba panggil balik setiap 10 saat jika ada sebarang error
        setTimeout(getWaktuSolat, 10000);
    }
}

// Jalankan fungsi waktu solat
getWaktuSolat();

// Slideshow
let indexSlide = 0;

function jalankanSlideshow() {
    const senaraiSlide = document.querySelectorAll('.slide');
    
    // Pastikan gambar wujud dalam HTML baru sistem jalan (elak error)
    if (senaraiSlide.length > 0) {
        // Buang class 'active' daripada gambar semasa
        senaraiSlide[indexSlide].classList.remove('active');

        // Pusing ke gambar seterusnya (pusing balik ke 0 kalau dah habis)
        indexSlide = (indexSlide + 1) % senaraiSlide.length;

        // Tambah class 'active' pada gambar baru
        senaraiSlide[indexSlide].classList.add('active');
    }
}

// Tetapan masa swap gambar: 20000ms = 20 saat sebiji gambar
setInterval(jalankanSlideshow, 20000);
