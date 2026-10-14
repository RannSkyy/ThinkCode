import { IfElseLevelData } from '../../types';

export const IFELSE_LEVELS: IfElseLevelData[] = [
  // EASY 1-3
  {
    levelNumber: 1,
    difficulty: 'easy',
    title: 'Kondisi Cuaca: Hujan atau Cerah',
    scenario: 'Robot Kiko hendak berangkat ke sekolah. Cuaca di luar sedang HUJAN deras!',
    weatherOrState: { label: 'Cuaca Saat Ini: HUJAN', conditionValue: true, icon: '🌧️' },
    conditions: {
      questionText: 'JIKA (Cuaca == Hujan), apa yang harus dilakukan Kiko?',
      expectedCondition: 'Cuaca == Hujan',
      options: [
        {
          id: 'opt_umbrella',
          ifAction: 'Buka Payung & Pakai Jas Hujan',
          elseAction: 'Pakai Kacamata Hitam Santai',
          label: 'IF: Pakai Jas Hujan | ELSE: Pakai Kacamata Hitam',
        },
        {
          id: 'opt_wrong_1',
          ifAction: 'Tidur di Lapangan Terbuka',
          elseAction: 'Menangis',
          label: 'IF: Tidur di Lapangan | ELSE: Menangis',
        },
        {
          id: 'opt_wrong_2',
          ifAction: 'Buka Semua Jendela Rumah',
          elseAction: 'Siram Air ke Lantai',
          label: 'IF: Buka Jendela | ELSE: Siram Lantai',
        },
      ],
      correctOptionId: 'opt_umbrella',
    },
    explanation: 'Tepat sekali! Karena cuaca hujan bernilai BENAR (True), robot membuka payung dan memakai jas hujan.',
    hint: 'Bila hujan turun, kita membutuhkan perlengkapan agar tidak basah.',
  },
  {
    levelNumber: 2,
    difficulty: 'easy',
    title: 'Rintangan Batu Besar di Depan',
    scenario: 'Robot sedang berjalan lurus dan mendeteksi ada BATU BESAR menghalangi jalan di depannya.',
    weatherOrState: { label: 'Sensor Jalur: ADA BATU BESAR', conditionValue: true, icon: '🪨' },
    conditions: {
      questionText: 'JIKA (Ada Batu), apa aksi yang tepat untuk robot?',
      expectedCondition: 'Ada Batu Menghalangi',
      options: [
        {
          id: 'opt_jump_rock',
          ifAction: 'Lompat / Belok Menghindar',
          elseAction: 'Terus Melangkah Lurus',
          label: 'IF: Lompat Menghindar | ELSE: Jalan Lurus',
        },
        {
          id: 'opt_crash',
          ifAction: 'Tabrak Batu Sekencang Mungkin',
          elseAction: 'Menyerah',
          label: 'IF: Tabrak Batu | ELSE: Menyerah',
        },
        {
          id: 'opt_sit',
          ifAction: 'Duduk Melipat Tangan',
          elseAction: 'Menari',
          label: 'IF: Duduk Diam | ELSE: Menari',
        },
      ],
      correctOptionId: 'opt_jump_rock',
    },
    explanation: 'Hebat! Jika ada batu, hindari agar tidak tabrakan. Jika tidak ada batu, baru jalan lurus.',
    hint: 'Batu adalah rintangan yang harus dihindari.',
  },
  {
    levelNumber: 3,
    difficulty: 'easy',
    title: 'Lampu Lalu Lintas Menyeberang',
    scenario: 'Lampu penyeberangan pejalan kaki menyala HIJAU.',
    weatherOrState: { label: 'Lampu: HIJAU', conditionValue: true, icon: '🟢' },
    conditions: {
      questionText: 'JIKA (Lampu == Hijau), apa instruksi menyeberang jalan?',
      expectedCondition: 'Lampu == Hijau',
      options: [
        {
          id: 'opt_cross_safely',
          ifAction: 'Menyeberang Jalan di Zebra Cross',
          elseAction: 'Berhenti dan Menunggu di Trotoar',
          label: 'IF: Menyeberang Tertib | ELSE: Tunggu di Trotoar',
        },
        {
          id: 'opt_sleep_road',
          ifAction: 'Tiduran di Tengah Jalan Raya',
          elseAction: 'Menyeberang',
          label: 'IF: Rebahan di Jalan | ELSE: Menyeberang',
        },
        {
          id: 'opt_blind_run',
          ifAction: 'Lari Tutup Mata',
          elseAction: 'Tutup Telinga',
          label: 'IF: Lari Tutup Mata | ELSE: Tutup Telinga',
        },
      ],
      correctOptionId: 'opt_cross_safely',
    },
    explanation: 'Hebat! Lampu hijau untuk pejalan kaki berarti aman untuk menyeberang jalan.',
    hint: 'Lampu hijau mengizinkan kita melangkah menyeberang.',
  },

  // MEDIUM 4-6
  {
    levelNumber: 4,
    difficulty: 'medium',
    title: 'Termostat: Suhu Ruangan Terlalu Panas',
    scenario: 'Sensor suhu ruangan membaca 34°C (Batas nyaman adalah 24°C).',
    weatherOrState: { label: 'Suhu Ruangan: 34°C (PANAS)', conditionValue: true, icon: '🌡️' },
    conditions: {
      questionText: 'JIKA (Suhu > 28°C), bagaimana AC pendingin harus merespons?',
      expectedCondition: 'Suhu > 28',
      options: [
        {
          id: 'opt_ac_cool',
          ifAction: 'Nyalakan AC Mode Sejuk (Cool)',
          elseAction: 'Nyalakan Pemanas Ruangan',
          label: 'IF: Nyalakan AC Sejuk | ELSE: Nyalakan Pemanas',
        },
        {
          id: 'opt_ac_heat',
          ifAction: 'Nyalakan Pemanas Suhu 50°C',
          elseAction: 'Matikan Semua Kipas',
          label: 'IF: Tambah Pemanas | ELSE: Matikan Kipas',
        },
        {
          id: 'opt_fire',
          ifAction: 'Bakar Api Unggun di Kamar',
          elseAction: 'Buka Kulkas',
          label: 'IF: Nyalakan Api Unggun | ELSE: Buka Kulkas',
        },
      ],
      correctOptionId: 'opt_ac_cool',
    },
    explanation: 'Benar! Suhu 34°C lebih besar dari 28°C, sehingga blok IF dieksekusi: AC mendinginkan ruangan.',
    hint: 'Saat ruangan terasa panas, AC harus menurunkan suhu ruangan.',
  },
  {
    levelNumber: 5,
    difficulty: 'medium',
    title: 'Pemeriksaan Tiket Bioskop',
    scenario: 'Penonton datang ke pintu teater tanpa membawa tiket bioskop (Tiket == Tidak Ada).',
    weatherOrState: { label: 'Status Penonton: TIDAK PUNYA TIKET', conditionValue: false, icon: '🎟️' },
    conditions: {
      questionText: 'JIKA (Punya Tiket), bolehkan masuk; ELSE apa yang terjadi?',
      expectedCondition: 'Punya Tiket',
      options: [
        {
          id: 'opt_ticket_check',
          ifAction: 'Silakan Masuk ke Studio Bioskop',
          elseAction: 'Arahkan ke Loket Pembelian Tiket Terlebih Dahulu',
          label: 'IF: Boleh Masuk | ELSE: Beli Tiket di Loket Dulu',
        },
        {
          id: 'opt_let_all',
          ifAction: 'Boleh Masuk',
          elseAction: 'Boleh Masuk Gratis dan Dapat Popcorn',
          label: 'IF: Boleh Masuk | ELSE: Masuk Gratis',
        },
        {
          id: 'opt_arrest',
          ifAction: 'Tangkap Masuk Penjara',
          elseAction: 'Usir ke Luar Kota',
          label: 'IF: Penjara | ELSE: Usir ke Luar Kota',
        },
      ],
      correctOptionId: 'opt_ticket_check',
    },
    explanation: 'Tepat sekali! Karena kondisi "Punya Tiket" bernilai FALSE, sistem menjalankan ELSE: membeli tiket dulu di loket.',
    hint: 'Kondisi salah (False) akan mengeksekusi blok ELSE.',
  },
  {
    levelNumber: 6,
    difficulty: 'medium',
    title: 'Mesin Penjual Minuman Otomatis',
    scenario: 'Harga jus kotak Rp 5.000. Pembeli memasukkan uang koin senilai Rp 10.000.',
    weatherOrState: { label: 'Uang Masuk: Rp 10.000 (Lebih dari Harga)', conditionValue: true, icon: '🪙' },
    conditions: {
      questionText: 'JIKA (Uang Masuk >= Harga Minuman), apa yang dilakukan mesin?',
      expectedCondition: 'Uang >= Harga',
      options: [
        {
          id: 'opt_vending_success',
          ifAction: 'Keluarkan Minuman Jus & Berikan Kembalian Rp 5.000',
          elseAction: 'Tampilkan Pesan "Uang Anda Kurang"',
          label: 'IF: Keluarkan Jus & Kembalian | ELSE: Tolak & Uang Kurang',
        },
        {
          id: 'opt_swallow',
          ifAction: 'Telan Uangnya Tanpa Kasih Jus',
          elseAction: 'Keluarkan Jus Gratis',
          label: 'IF: Telan Uang | ELSE: Jus Gratis',
        },
        {
          id: 'opt_error_vend',
          ifAction: 'Keluarkan Air Panas Mendidih',
          elseAction: 'Kembalian Rp 100.000',
          label: 'IF: Air Mendidih | ELSE: Bonus Rp 100rb',
        },
      ],
      correctOptionId: 'opt_vending_success',
    },
    explanation: 'Hebat! Uang Rp 10.000 cukup, minuman keluar dan uang kembalian Rp 5.000 dihitung otomatis.',
    hint: 'Uang yang dimasukkan melebihi harga, jadi pembeli berhak atas minuman dan kembalian.',
  },

  // HARD 7-9
  {
    levelNumber: 7,
    difficulty: 'hard',
    title: 'Kombinasi Logika AND: Kunci DAN Kode Sandi',
    scenario: 'Robot memegang Kunci Gerbang, TETAPI lupa memasukkan Kode Sandi PIN 4 digit.',
    weatherOrState: { label: 'Kunci: ADA (True) | PIN: SALAH (False)', conditionValue: false, icon: '🔐' },
    conditions: {
      questionText: 'JIKA (Punya Kunci AND PIN Benar), apakah pintu brankas boleh terbuka?',
      expectedCondition: 'Kunci AND PIN_Valid',
      options: [
        {
          id: 'opt_and_strict',
          ifAction: 'Buka Brankas Rahasia',
          elseAction: 'Kunci Tetap Rapat & Minta Verifikasi Ulang PIN',
          label: 'IF: Buka Brankas | ELSE: Tetap Terkunci (Periksa PIN)',
        },
        {
          id: 'opt_ignore_pin',
          ifAction: 'Buka Saja Tanpa Peduli PIN',
          elseAction: 'Kunci Selamanya',
          label: 'IF: Buka Walau PIN Salah | ELSE: Kunci Selamanya',
        },
        {
          id: 'opt_destroy_safe',
          ifAction: 'Ledakkan Brankas',
          elseAction: 'Bagi-bagi Uang',
          label: 'IF: Ledakkan | ELSE: Bagi-bagi Uang',
        },
      ],
      correctOptionId: 'opt_and_strict',
    },
    explanation: 'Luar biasa! Dalam logika "AND", KEDUA syarat harus bernilai Benar. Karena PIN salah, pintu tetap terkunci (ELSE).',
    hint: 'Syarat "AND" memerlukan kedua kondisi terpenuhi sekaligus.',
  },
  {
    levelNumber: 8,
    difficulty: 'hard',
    title: 'Kombinasi Logika OR: Naik Busway atau Kereta',
    scenario: 'Jalur busway macet parah (False), TETAPI jalur kereta api lancar bebas hambatan (True).',
    weatherOrState: { label: 'Busway Lancar: False | Kereta Lancar: True', conditionValue: true, icon: '🚆' },
    conditions: {
      questionText: 'JIKA (Busway Lancar OR Kereta Lancar), apakah penumpang bisa sampai tepat waktu?',
      expectedCondition: 'Bus Lancar OR Kereta Lancar',
      options: [
        {
          id: 'opt_or_logic',
          ifAction: 'Gunakan Kereta Api Cepat & Berangkat Sekarang',
          elseAction: 'Batalkan Perjalanan dan Pulang ke Rumah',
          label: 'IF: Naik Kereta Api Lancar | ELSE: Batalkan Perjalanan',
        },
        {
          id: 'opt_walk_rain',
          ifAction: 'Jalan Kaki Menyeberangi Laut',
          elseAction: 'Tidur di Halte Bus',
          label: 'IF: Jalan di Laut | ELSE: Tidur di Halte',
        },
        {
          id: 'opt_stay_stuck',
          ifAction: 'Tetap Naik Bus Macet Berjam-jam',
          elseAction: 'Menunggu 3 Hari',
          label: 'IF: Tetap di Jalur Macet | ELSE: Tunggu 3 Hari',
        },
      ],
      correctOptionId: 'opt_or_logic',
    },
    explanation: 'Hebat! Dalam logika "OR", jika SALAH SATU pilihan bernilai Benar, maka rencana perjalanan tetap berhasil!',
    hint: 'Logika OR hanya membutuhkan salah satu jalur yang lancar.',
  },
  {
    levelNumber: 9,
    difficulty: 'hard',
    title: 'Penilaian Ujian Bertingkat (Nested If-Else)',
    scenario: 'Siswa mendapat nilai 95 pada ujian informatika.',
    weatherOrState: { label: 'Nilai Ujian Siswa: 95', conditionValue: true, icon: '🏆' },
    conditions: {
      questionText: 'JIKA (Nilai >= 90) dapat Predikat A, ELSE JIKA (Nilai >= 80) Predikat B, ELSE Predikat C. Predikat apa yang diraih?',
      expectedCondition: 'Nilai >= 90',
      options: [
        {
          id: 'opt_grade_a',
          ifAction: 'Berikan Predikat "A (Sangat Memuaskan)" + Bintang Emas',
          elseAction: 'Periksa Syarat Nilai Selanjutnya (B atau C)',
          label: 'IF: Predikat "A (Istimewa)" | ELSE: Periksa Nilai Berikutnya',
        },
        {
          id: 'opt_grade_c',
          ifAction: 'Berikan Predikat "C"',
          elseAction: 'Berikan Predikat "A"',
          label: 'IF: Predikat C | ELSE: Predikat A',
        },
        {
          id: 'opt_fail',
          ifAction: 'Nyatakan Tidak Lulus',
          elseAction: 'Hadiah Sepeda Motor',
          label: 'IF: Tidak Lulus | ELSE: Hadiah Motor',
        },
      ],
      correctOptionId: 'opt_grade_a',
    },
    explanation: 'Sempurna! Nilai 95 memenuhi syarat pertama (Nilai >= 90), jadi siswa berhak meraih Predikat A!',
    hint: '95 lebih tinggi dari 90, maka kondisi pertama langsung tercapai.',
  },
];
