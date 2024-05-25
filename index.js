import fetch from "node-fetch";
import readlineSync from 'readline-sync';

const cek_Login = (token) => new Promise((resolve, reject) => {
    const currentTime = Date.now();
    fetch(`https://api.mobapay.com/account/gift_code_list?country=ID&language=en&_t=${currentTime}`, {
        method: 'GET',
        headers: {
            'host': 'api.mobapay.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
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
        let jumlah = item.title.replace('MLBB Diamond', '').trim();
        // Mengubah string menjadi angka
        return parseInt(jumlah, 10);
      }).reduce((sum, nilai) => sum + nilai, 0); // Menjumlahkan semua angka
      console.log(`Total diamond Unused = ${jumlahDiamond}`); // 
})()
