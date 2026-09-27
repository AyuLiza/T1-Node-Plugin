// Tugas 1 PWL - Node.js Plugins (chalk, cowsay, figlet)
// Ayu Liza Putri Wiwaha - F1D02310003

import chalk from 'chalk';
import * as cowsay from 'cowsay';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import dayjs from 'dayjs';

// palet warna
const warna1 = '#7BA05B';
const warna2 = '#A3C585';
const warna3 = '#D4E4BC';
const warna4 = '#F5EBDD';
const aksen = '#C8A27A';

const gradasi = gradient([warna1, warna2, warna3, warna4]);

// ambil input dari terminal, formatnya "Nama - NIM" "YYYY-MM-DD"
// kalo ga diisi, otomatis pake data yang tersedia
const input = process.argv[2] ?? 'Ayu Liza Putri Wiwaha - F1D02310003';
const [nama, nim = '-'] = input.split(' - ');
const tanggalLahir = process.argv[3] ?? '2005-11-08';

// hitung umur pake dayjs
// dicek dulu formatnya harus YYYY-MM-DD dan tanggalnya valid
const formatBenar = /^\d{4}-\d{2}-\d{2}$/.test(tanggalLahir);
const lahir = dayjs(tanggalLahir);
const umur = formatBenar && lahir.isValid()
    ? `${dayjs().diff(lahir, 'year')} tahun`
    : 'format tanggal salah (YYYY-MM-DD)';

// nama lengkap jadi ascii art pake figlet
// dikasih width biar kalo kepanjangan turun ke bawah per kata
const judul = figlet.textSync(nama, {
    font: 'Small',
    width: 60,
    whitespaceBreak: true,
});
console.log();
console.log(gradasi.multiline(judul));

// nama, nim, umur dalam kotak, warnanya pake chalk
const identitas =
    chalk.bold.hex(warna1)('Nama : ') + chalk.bold.hex(warna4)(nama) + '\n' +
    chalk.bold.hex(warna1)('NIM  : ') + chalk.hex(warna3)(nim) + '\n' +
    chalk.bold.hex(warna1)('Umur : ') + chalk.hex(aksen).underline(umur);

console.log(boxen(identitas, {
    padding: 1,
    margin: { left: 2 },
    borderStyle: 'round',
    borderColor: warna2,
    title: 'Identitas Mahasiswa',
    titleAlignment: 'center',
}));

// motivasi sama hewannya dipilih random tiap kali dijalanin
const motivasi = [
    'Love yourself, trust yourself, keep going.',
    'Dream big, even when the road feels long.',
    'Your story is still being written.',
    'One day, you will be proud you kept going.',
    'Your next chapter is waiting. Make it yours.',
];
const hewanLucu = ['bunny', 'kitten', 'hedgehog', 'owl', 'fox', 'hiyoko', 'happy-whale'];
const acak = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

console.log(gradient([warna2, warna4]).multiline(
    cowsay.say({ text: acak(motivasi), f: acak(hewanLucu) })
));