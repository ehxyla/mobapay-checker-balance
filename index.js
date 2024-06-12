import fetch from "node-fetch";
import readlineSync from 'readline-sync';

const cek_Login = (token) => new Promise((resolve, reject) => {
    // const currentTime = Date.now();
    fetch(`https://api.mobapay.com/account/gift_code_list?country=ID&language=en`, {
        method: 'GET',
        headers: {
            'host': 'api.mobapay.com',
            'Accept': 'application/json, text/plain, */*',
            'Sec-Ch-Ua-Mobile': '?0',
            'Origin': 'https://www.mobapay.com',
            'Referer': 'https://www.mobapay.com/',
            'Pragma': 'no-cache',
            'Priority': 'u=1, i',
            'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest':'empty',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'X-Lang': 'en',
            'X-Token': token
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

(async () => {
    const token = readlineSync.question('Masukin tokenmu: ');
    const cekLogin = await cek_Login(token)
    let jumlahDiamond = cekLogin.data.unused.map(item => {
        // Menghapus kata "MLBB Diamond" dan spasi yang tidak perlu
        console.log(item.title)
        const cleanedTitle = item.title.replace('MLBB Diamond', '').trim();
        // Menghapus semua karakter selain angka
        const numericValue = cleanedTitle.replace(/[^\d]/g, '');
        // Mengubah string menjadi angka
        return parseInt(numericValue, 10);
    }).reduce((sum, value) => sum + value, 0); // Menjumlahkan semua angka
      console.log(`Total diamond Unused = ${jumlahDiamond}`); // 
})()
