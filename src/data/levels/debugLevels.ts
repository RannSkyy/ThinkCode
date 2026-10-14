import { DebugLevelData } from '../../types';

export const DEBUG_LEVELS: DebugLevelData[] = [
  // EASY 1-3
  {
    levelNumber: 1,
    difficulty: 'easy',
    title: 'Arah Belok Tertukar',
    story: 'Robot Kiko ingin belok ke KIRI menuju pintu keluar, tetapi di baris ke-2 kodenya malah belok ke KANAN dan menabrak lemari!',
    goalDescription: 'Perbaiki arah belok di baris ke-2 agar robot tidak menabrak tembok.',
    buggyCode: [
      { id: 'l1', text: 'Maju 2 langkah', action: 'MOVE_2' },
      { id: 'l2', text: 'Belok Kanan', action: 'TURN_RIGHT' }, // BUG
      { id: 'l3', text: 'Maju 1 langkah', action: 'MOVE_1' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_left', text: 'Belok Kiri', action: 'TURN_LEFT' },
        { id: 'fix_jump', text: 'Lompat di tempat', action: 'JUMP' },
        { id: 'fix_sleep', text: 'Tidur 5 menit', action: 'SLEEP' },
      ],
      correctReplacementId: 'fix_left',
    },
    explanation: 'Hebat! Mengganti "Belok Kanan" menjadi "Belok Kiri" meluruskan jalur robot ke pintu keluar.',
    hint: 'Pintu keluar berada di sebelah kiri robot saat robot berhenti melangkah.',
  },
  {
    levelNumber: 2,
    difficulty: 'easy',
    title: 'Langkah Kurang Satu (Langkah Pendek)',
    story: 'Kiko berhenti 1 langkah sebelum kotak permata emas karena jumlah langkah majunya kurang.',
    goalDescription: 'Ganti jumlah langkah pada baris pertama agar sampai persis di atas permata.',
    buggyCode: [
      { id: 'l1', text: 'Maju 1 langkah', action: 'MOVE_1' }, // BUG: Seharusnya 2
      { id: 'l2', text: 'Ambil Permata Emas', action: 'PICK_GEM' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 0,
      options: [
        { id: 'fix_move2', text: 'Maju 2 langkah', action: 'MOVE_2' },
        { id: 'fix_back', text: 'Mundur 1 langkah', action: 'BACK_1' },
        { id: 'fix_turn', text: 'Putar balik', action: 'TURN_BACK' },
      ],
      correctReplacementId: 'fix_move2',
    },
    explanation: 'Tepat sekali! Permata berjarak 2 ubin dari titik awal robot.',
    hint: 'Hitung kotak antara robot dan permata: ada 2 kotak.',
  },
  {
    levelNumber: 3,
    difficulty: 'easy',
    title: 'Sepatu Sebelum Kaus Kaki',
    story: 'Robot asisten rumah tangga melakukan urutan yang terbalik saat menyiapkan seragam sekolah!',
    goalDescription: 'Perbaiki baris ke-2 agar kaus kaki dipakai sebelum sepatu.',
    buggyCode: [
      { id: 'l1', text: 'Pakai Celana Panjang', action: 'PANTS' },
      { id: 'l2', text: 'Pakai Sepatu Sekolah', action: 'SHOES' }, // BUG
      { id: 'l3', text: 'Pakai Kaus Kaki Katun', action: 'SOCKS' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_socks', text: 'Pakai Kaus Kaki Katun', action: 'SOCKS' },
        { id: 'fix_hat', text: 'Pakai Topi Renang', action: 'HAT' },
        { id: 'fix_tie', text: 'Pakai Jam Tangan', action: 'WATCH' },
      ],
      correctReplacementId: 'fix_socks',
    },
    explanation: 'Keren! Kaus kaki harus dipakai terlebih dahulu sebelum memakai sepatu.',
    hint: 'Apa yang harus masuk ke kaki sebelum sepatu dipasang?',
  },

  // MEDIUM 4-6
  {
    levelNumber: 4,
    difficulty: 'medium',
    title: 'Hitungan Loop Terlalu Sedikit',
    story: 'Ada 4 pot bunga yang layu, tetapi robot pemelihara taman hanya menyiram 2 kali sehingga 2 tanaman lainnya masih kering!',
    goalDescription: 'Perbaiki jumlah pengulangan agar seluruh 4 pot tersiram air.',
    buggyCode: [
      { id: 'l1', text: 'Isi Ember dengan Air Bersih', action: 'FILL_BUCKET' },
      { id: 'l2', text: 'ULANGI 2 KALI { Maju & Siram Pot }', action: 'REPEAT_2' }, // BUG
      { id: 'l3', text: 'Simpan Ember di Gudang', action: 'STORE_BUCKET' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_repeat4', text: 'ULANGI 4 KALI { Maju & Siram Pot }', action: 'REPEAT_4' },
        { id: 'fix_repeat1', text: 'ULANGI 1 KALI { Maju & Siram Pot }', action: 'REPEAT_1' },
        { id: 'fix_repeat0', text: 'Jangan Disiram Sama Sekali', action: 'REPEAT_0' },
      ],
      correctReplacementId: 'fix_repeat4',
    },
    explanation: 'Mantap! Ada 4 pot bunga, jadi loop harus dijalankan 4 kali.',
    hint: 'Sesuaikan angka pengulangan dengan total pot bunga (4).',
  },
  {
    levelNumber: 5,
    difficulty: 'medium',
    title: 'Kunci Pintu Salah Gembok',
    story: 'Kiko menggunakan "Kunci Perak" pada gembok yang membutuhkan "Kunci Emas", akibatnya gerbang tidak mau terbuka.',
    goalDescription: 'Ganti kunci yang dipakai dengan Kunci Emas.',
    buggyCode: [
      { id: 'l1', text: 'Berjalan Menuju Gerbang Emas', action: 'WALK_GATE' },
      { id: 'l2', text: 'Gunakan Kunci Perak Tua', action: 'KEY_SILVER' }, // BUG
      { id: 'l3', text: 'Dorong Gerbang Terbuka', action: 'PUSH_GATE' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_gold_key', text: 'Gunakan Kunci Emas Berkilau', action: 'KEY_GOLD' },
        { id: 'fix_hammer', text: 'Pukul Menggunakan Palu Besi', action: 'HAMMER' },
        { id: 'fix_whistle', text: 'Tiup Peluit Keras-keras', action: 'WHISTLE' },
      ],
      correctReplacementId: 'fix_gold_key',
    },
    explanation: 'Bagus! Gerbang Emas memerlukan Kunci Emas yang cocok.',
    hint: 'Kunci harus sama warnanya dengan gerbang.',
  },
  {
    levelNumber: 6,
    difficulty: 'medium',
    title: 'Kondisi Lampu Merah Terbalik',
    story: 'Mobil autopilot diprogram berhenti saat lampu Hijau dan berjalan saat lampu Merah! Sangat berbahaya di jalan raya.',
    goalDescription: 'Perbaiki aturan lampu lalu lintas agar mobil berhenti saat Merah.',
    buggyCode: [
      { id: 'l1', text: 'Sensor Kamera Mendeteksi Lampu Merah', action: 'DETECT_RED' },
      { id: 'l2', text: 'INJAK PEDAL GAS MAJU KENCANG', action: 'GAS' }, // BUG
      { id: 'l3', text: 'Nyalakan Radio Musik', action: 'RADIO' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_brake', text: 'INJAK REM & BERHENTI SEMPURNA', action: 'BRAKE' },
        { id: 'fix_horn', text: 'Klakson Sepanjang Jalan', action: 'HORN' },
        { id: 'fix_reverse', text: 'Mundur Menabrak Trotoar', action: 'REVERSE' },
      ],
      correctReplacementId: 'fix_brake',
    },
    explanation: 'Hebat! Ketika lampu menyala Merah, kendaraan wajib menginjak rem dan berhenti.',
    hint: 'Apa yang harus dilakukan pengemudi saat lampu merah?',
  },

  // HARD 7-9
  {
    levelNumber: 7,
    difficulty: 'hard',
    title: 'Off-By-One Error (Kelebihan 1 Langkah)',
    story: 'Robot pengantar paket berjalan 6 langkah di jembatan yang panjangnya hanya 5 meter, sehingga ia tercebur ke sungai!',
    goalDescription: 'Perbaiki jarak maju agar berhenti tepat di ujung jembatan.',
    buggyCode: [
      { id: 'l1', text: 'Periksa Beban Paket', action: 'CHECK_LOAD' },
      { id: 'l2', text: 'Maju 6 meter di Jembatan (Panjang 5m)', action: 'WALK_6M' }, // BUG
      { id: 'l3', text: 'Letakkan Paket di Rumah Pak Budi', action: 'DELIVER' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_walk5', text: 'Maju 5 meter tepat di Jembatan', action: 'WALK_5M' },
        { id: 'fix_walk10', text: 'Maju 10 meter sekencang mungkin', action: 'WALK_10M' },
        { id: 'fix_swim', text: 'Berenang menyeberangi buaya', action: 'SWIM' },
      ],
      correctReplacementId: 'fix_walk5',
    },
    explanation: 'Hebat! Kesalahan "Off-by-one" (kelebihan 1) adalah bug paling sering dialami programmer profesional.',
    hint: 'Panjang jembatan adalah 5 meter, sesuaikan dengan angka tersebut.',
  },
  {
    levelNumber: 8,
    difficulty: 'hard',
    title: 'Urutan Logika Keamanan ATM Bank',
    story: 'Mesin ATM mengeluarkan uang tunai sebelum kartu nasabah dimasukkan dan PIN diverifikasi!',
    goalDescription: 'Pastikan kartu dan PIN diverifikasi sebelum uang tunai keluar.',
    buggyCode: [
      { id: 'l1', text: 'Keluarkan Uang Tunai Rp 500.000', action: 'DISPENSE_CASH' }, // BUG
      { id: 'l2', text: 'Minta Nasabah Masukkan Kartu & PIN', action: 'INPUT_PIN' },
      { id: 'l3', text: 'Cetak Struk Transaksi', action: 'PRINT_RECEIPT' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 0,
      options: [
        { id: 'fix_verify', text: 'Periksa Kartu & Validasi Kode PIN', action: 'VALIDATE_PIN' },
        { id: 'fix_alarm', text: 'Bunyikan Sirine Darurat Bank', action: 'ALARM' },
        { id: 'fix_gift', text: 'Bagi-bagi Uang Gratis ke Semua Orang', action: 'FREE_MONEY' },
      ],
      correctReplacementId: 'fix_verify',
    },
    explanation: 'Keamanan terjaga! ATM harus memverifikasi kepemilikan kartu & PIN sebelum uang boleh dikeluarkan.',
    hint: 'Apa yang harus dilakukan pertama kali saat berada di mesin ATM?',
  },
  {
    levelNumber: 9,
    difficulty: 'hard',
    title: 'Infinite Loop (Loop Tanpa Henti)',
    story: 'Robot pembersih lantai terus mengepel ruangan yang sama selamanya karena variabel kondisi selesai tidak pernah diubah ke TRUE!',
    goalDescription: 'Perbaiki loop agar berhenti saat lantai sudah kering dan bersih.',
    buggyCode: [
      { id: 'l1', text: 'Mulai Mengepel Lantai', action: 'START_MOP' },
      { id: 'l2', text: 'ULANGI SELAMANYA TANPA BATAS WAKTU', action: 'LOOP_FOREVER' }, // BUG
      { id: 'l3', text: 'Keringkan Kain Pel di Gantungan', action: 'DRY_MOP' },
    ],
    possibleFixes: {
      type: 'replace',
      buggyLineIndex: 1,
      options: [
        { id: 'fix_while', text: 'ULANGI SAMPAI seluruh lantai bersih dan kering', action: 'LOOP_UNTIL_CLEAN' },
        { id: 'fix_faster', text: 'Mengepel 100x lebih cepat sampai berasap', action: 'SMOKE' },
        { id: 'fix_water', text: 'Banjiri seluruh lantai dengan sabun', action: 'FLOOD' },
      ],
      correctReplacementId: 'fix_while',
    },
    explanation: 'Luar biasa! Infinite loop dapat membuat komputer macet (hang). Loop wajib memiliki batas henti.',
    hint: 'Loop harus memiliki batas sampai tugas selesai, bukan selamanya.',
  },
];
