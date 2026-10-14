import { LearningMaterial } from '../types';

export const LEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 'algoritma',
    title: 'Apa itu Algoritma?',
    concept: 'Dasar Berpikir Logis',
    readingTimeMinutes: 2,
    summary: 'Algoritma adalah deretan langkah teratur dan terencana untuk menyelesaikan suatu tugas dari awal sampai selesai.',
    illustrationIcon: 'Cpu',
    color: 'blue',
    recommendedGameId: 'maze',
    sections: [
      {
        heading: '1. Resep Rahasia Para Robot',
        content: 'Bayangkan kamu sedang memberi tahu teman cara membuat teh manis hangat. Kamu tidak bisa berkata "Bikin teh ya!", lalu tiba-tiba tehnya jadi. Kamu harus memberikan langkah yang jelas:\n\n1. Ambil cangkir bersih.\n2. Masukkan kantong teh dan 2 sendok gula.\n3. Tuang air hangat.\n4. Aduk sampai gulanya larut.\n\nItulah algoritma! Rangkaian instruksi yang jelas dan teratur.',
        analogy: 'Resep masakan di dapur adalah algoritma! Koki mengikuti langkah 1, 2, 3 agar rasa makanannya selalu lezat.',
        kidTip: 'Komputer itu sangat cepat, tapi mereka tidak bisa menebak pikiranmu! Komputer butuh langkah yang super jelas.',
      },
      {
        heading: '2. Ciri-ciri Algoritma yang Baik',
        content: 'Algoritma yang keren memiliki 3 sifat penting:\n- Runtut (Urutannya masuk akal, tidak melompat-lompat).\n- Jelas (Tidak membuat bingung atau bermakna ganda).\n- Ada Akhirnya (Tugas selesai dan menghasilkan tujuan yang tepat).',
        codeExample: '// Algoritma Sikat Gigi:\nLangkah 1: Basahi sikat gigi\nLangkah 2: Oleskan pasta gigi secukupnya\nLangkah 3: Sikat gigi selama 2 menit\nLangkah 4: Kumur-kumur dengan air bersih\nSelesai: Gigi putih & bersih!',
      },
    ],
    quickQuiz: {
      question: 'Manakah di bawah ini yang merupakan contoh algoritma di kehidupan sehari-hari?',
      options: [
        'Membiarkan kamar tidur berantakan begitu saja',
        'Langkah-langkah mencuci tangan dengan sabun hingga bersih',
        'Menutup mata dan berharap PR selesai sendiri',
        'Bermain bola tanpa aturan sama sekali',
      ],
      correctAnswerIndex: 1,
      explanation: 'Hebat! Langkah mencuci tangan adalah instruksi berurutan yang mengarah ke tujuan bersih dan bebas kuman.',
    },
  },
  {
    id: 'sequence',
    title: 'Sequence (Urutan Langkah)',
    concept: 'Eksekusi Berurutan',
    readingTimeMinutes: 2,
    summary: 'Komputer membaca perintah satu per satu dari atas ke bawah. Urutan sangat menentukan hasil akhir!',
    illustrationIcon: 'ListOrdered',
    color: 'emerald',
    recommendedGameId: 'builder',
    sections: [
      {
        heading: '1. Kenapa Urutan itu Sangat Penting?',
        content: 'Coba bayangkan kalau kamu memakai sepatu DULUAN sebelum memakai kaus kaki! Pasti aneh sekali kan?\n\nDalam dunia pemrograman, hal ini disebut SEQUENCE. Komputer menjalankan instruksi persis sesuai urutan yang kamu berikan, dari baris pertama ke baris berikutnya.',
        analogy: 'Seperti menuruni anak tangga: kamu harus menginjak tangga 1, baru ke tangga 2, lalu ke tangga 3.',
        kidTip: 'Jika hasil programmu aneh, periksa apakah ada langkah yang tertukar urutannya!',
      },
      {
        heading: '2. Urutan yang Benar vs Urutan yang Tertukar',
        content: 'Mari kita lihat contoh memakai seragam sekolah:\n\nUrutan BENAR:\n1. Pakai baju seragam\n2. Pasang dasi\n3. Pakai sepatu\n\nUrutan SALAH (Tertukar):\n1. Pakai sepatu\n2. Pasang celana (pasti tersangkut sepatu!)\n3. Pakai baju seragam',
        codeExample: '// Sequence Robot Pembuat Roti Bakar:\n1. Ambil 2 lembar roti\n2. Olesi selai cokelat di tengahnya\n3. Tutup dan panggang selama 3 menit\n4. Sajikan di atas piring',
      },
    ],
    quickQuiz: {
      question: 'Apa yang terjadi jika kamu membalik urutan: (1) Makan Es Krim, lalu (2) Buka Bungkus Es Krim?',
      options: [
        'Es krim terasa lebih enak',
        'Kamu akan memakan plastiknya karena bungkusnya belum dibuka!',
        'Bungkusnya akan terbuka sendiri secara ajaib',
        'Tidak terjadi apa-apa',
      ],
      correctAnswerIndex: 1,
      explanation: 'Tepat sekali! Urutan (Sequence) harus logis: buka bungkusnya dulu, baru es krimnya bisa dimakan.',
    },
  },
  {
    id: 'loop',
    title: 'Loop (Pengulangan Cerdas)',
    concept: 'Mengulang Tanpa Capek',
    readingTimeMinutes: 3,
    summary: 'Daripada menulis perintah yang sama berulang kali, kita menggunakan LOOP untuk menyuruh komputer mengulang otomatis.',
    illustrationIcon: 'Repeat',
    color: 'amber',
    recommendedGameId: 'loop',
    sections: [
      {
        heading: '1. Jangan Menulis 100 Kali!',
        content: 'Bayangkan kamu disuruh menyiram 10 pot tanaman di taman. Apakah kamu mau menulis perintah begini?\n\n- Siram pot 1\n- Siram pot 2\n- Siram pot 3\n... sampai Siram pot 10 (pegal kan!)\n\nDengan LOOP, kita cukup menulis:\n"ULANGI 10 KALI: Siram pot"',
        analogy: 'Seperti lagu favorit yang diputar berulang-ulang (repeat mode) di pemutar musik!',
        kidTip: 'Loop menghemat waktu dan membuat kodemu jauh lebih rapi dan ringkas.',
      },
      {
        heading: '2. Jenis-jenis Pengulangan',
        content: 'Ada dua jenis loop yang sering dipakai:\n1. Counted Loop (Hitungan Pasti): Mengulang sebanyak angka yang sudah ditentukan, misalnya ulangi 5 kali lompatan.\n2. Conditional Loop (Sampai Kondisi Terpenuhi): Mengulang terus sampai sesuatu terjadi, misalnya "Teruslah mengunyah sampai makanan halus".',
        codeExample: '// Pola Loop Robot Petani:\nULANGI 4 KALI {\n  Langkah maju\n  Tanam benih wortel\n}\n// Hanya butuh 4 baris daripada 8 baris!',
      },
    ],
    quickQuiz: {
      question: 'Jika ingin melompat sebanyak 5 kali, perintah mana yang paling efisien?',
      options: [
        'Lompat, Lompat, Lompat, Lompat, Lompat (ditulis 5 kali)',
        'ULANGI 5 KALI: Lompat',
        'Tidur siang 5 kali',
        'Tulis kata lompat di buku tulis',
      ],
      correctAnswerIndex: 1,
      explanation: 'Benar! Perintah "ULANGI 5 KALI: Lompat" jauh lebih efisien, rapi, dan mudah dibaca oleh siapapun.',
    },
  },
  {
    id: 'ifelse',
    title: 'If - Else (Logika Percabangan)',
    concept: 'Mengambil Keputusan Cerdas',
    readingTimeMinutes: 3,
    summary: 'Bagaimana komputer bisa mengambil keputusan? Menggunakan IF (JIKA) dan ELSE (KALAU TIDAK)!',
    illustrationIcon: 'GitBranch',
    color: 'indigo',
    recommendedGameId: 'ifelse',
    sections: [
      {
        heading: '1. Hidup Penuh Pilihan!',
        content: 'Setiap hari kamu membuat keputusan berdasarkan kondisi di sekitarmu:\n\n- JIKA (IF) hari ini hujan, MAKA bawa payung.\n- KALAU TIDAK (ELSE), pakai topi pelindung matahari.\n\nKomputer juga berpikir seperti itu! Komputer memeriksa apakah suatu kondisi Benar (True) atau Salah (False), lalu memilih tindakan yang tepat.',
        analogy: 'Lampu lalu lintas di jalan: JIKA merah berhenti, JIKA hijau berjalan lancar.',
        kidTip: 'Cabang kondisi memungkinkan robot bertindak cerdas saat menghadapi situasi yang berubah-ubah!',
      },
      {
        heading: '2. Contoh Percabangan Bertingkat',
        content: 'Kita bisa menyusun kondisi yang semakin seru:\n\nJIKA nilai ujianmu 90 ke atas:\n  Dapat hadiah buku komik!\nKALAU TIDAK, JIKA nilai di atas 75:\n  Dapat es krim lezat!\nKALAU TIDAK:\n  Tetap semangat dan belajar lagi bersama teman!',
        codeExample: '// Logika Robot Penjaga Gerbang:\nIF (Tamu punya kartu VIP) {\n  Buka gerbang otomatis\n  Katakan "Selamat datang Tuan!"\n} ELSE {\n  Minta tamu mendaftar dulu di pos satpam\n}',
      },
    ],
    quickQuiz: {
      question: 'JIKA lapar MAKA makan nasi, ELSE makan camilan. Jika saat ini kamu TIDAK lapar, apa yang kamu lakukan?',
      options: [
        'Makan nasi satu piring penuh',
        'Makan camilan',
        'Langsung tidur di lantai',
        'Menangis tersedu-sedu',
      ],
      correctAnswerIndex: 1,
      explanation: 'Pintar! Karena kondisinya TIDAK lapar, maka yang dijalankan adalah blok ELSE yaitu makan camilan.',
    },
  },
  {
    id: 'debugging',
    title: 'Debugging (Mencari & Memperbaiki Bug)',
    concept: 'Detektif Pemrograman',
    readingTimeMinutes: 3,
    summary: 'Bug adalah kesalahan atau kecacatan dalam program. Debugging adalah proses menemukan dan memperbaikinya.',
    illustrationIcon: 'Bug',
    color: 'rose',
    recommendedGameId: 'debug',
    sections: [
      {
        heading: '1. Mengapa Disebut Bug (Serangga)?',
        content: 'Tahukah kamu? Pada tahun 1947, seorang ilmuwan komputer wanita bernama Grace Hopper menemukan komputer raksasanya mendadak rusak. Ternyata ada seekor ngengat (serangga/bug) asli yang tersangkut di mesin!\n\nSejak saat itu, programmer menyebut kesalahan kode sebagai "BUG", dan kegiatan memperbaikinya disebut "DEBUGGING".',
        analogy: 'Seperti menjadi detektif yang mencari jejak petunjuk untuk mengungkap siapa perusak rahasia!',
        kidTip: 'Jangan takut salah! Programmer terhebat di dunia sekalipun membuat ratusan bug setiap hari saat bekerja.',
      },
      {
        heading: '2. 3 Langkah Menjadi Master Debugger',
        content: '1. Amati: Apa yang sebenarnya terjadi? Di mana gerakannya menyimpang dari rencana?\n2. Lacak: Telusuri langkah demi langkah mulai dari awal, temukan baris yang salah.\n3. Uji Coba: Perbaiki baris tersebut dan jalankan ulang untuk memastikan masalah selesai.',
        codeExample: '// Bug pada Jalur Robot:\n1. Maju 2 langkah\n2. Belok Kanan  <- [BUG! Seharusnya Belok Kiri agar tidak menabrak tembok]\n3. Maju 1 langkah',
      },
    ],
    quickQuiz: {
      question: 'Sikap apa yang paling tepat saat kodemu mengalami error atau salah arah?',
      options: [
        'Langsung mematikan laptop dan menyerah',
        'Tenang, baca kembali urutan langkah, dan coba perbaiki (Debugging)',
        'Menyalahkan komputer karena dianggap nakal',
        'Mengulang hal yang sama terus menerus tanpa mengubah apapun',
      ],
      correctAnswerIndex: 1,
      explanation: 'Luar biasa! Sikap pantang menyerah dan teliti mengecek langkah demi langkah adalah kunci utama seorang programmer sejati!',
    },
  },
];
