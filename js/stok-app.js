const stokApp = new Vue({
    el: '#app',
    data: {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        stok: [
            {
                kode: "EKMA4116",
                judul: "Pengantar Manajemen",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A3",
                harga: 65000,
                qty: 28,
                safety: 20,
                catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
            },
            {
                kode: "EKMA4115",
                judul: "Pengantar Akuntansi",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A4",
                harga: 60000,
                qty: 7,
                safety: 15,
                catatanHTML: "<strong>Cover baru</strong>"
            },
            {
                kode: "BIOL4201",
                judul: "Biologi Umum (Praktikum)",
                kategori: "Praktikum",
                upbjj: "Surabaya",
                lokasiRak: "R3-B2",
                harga: 80000,
                qty: 12,
                safety: 10,
                catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
            },
            {
                kode: "FISIP4001",
                judul: "Dasar-Dasar Sosiologi",
                kategori: "MK Pilihan",
                upbjj: "Makassar",
                lokasiRak: "R2-C1",
                harga: 55000,
                qty: 2,
                safety: 8,
                catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
            }
        ],
        selectedUpbjj: "",
        selectedKategori: "",
        sortBy: "judul",
        filterReorder: false,
        form: {
            kode: "",
            judul: "",
            kategori: "",
            upbjj: "",
            lokasiRak: "",
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ""
        }
    },
    computed: {
        filteredAndSortedStok() {
            let result = this.stok.filter(item => {
                let matchUpbjj = this.selectedUpbjj ? item.upbjj === this.selectedUpbjj : true;
                let matchKategori = this.selectedKategori ? item.kategori === this.selectedKategori : true;
                let matchReorder = this.filterReorder ? (item.qty < item.safety || item.qty === 0) : true;
                return matchUpbjj && matchKategori && matchReorder;
            });

            return result.sort((a, b) => {
                if (this.sortBy === 'judul') {
                    return a.judul.localeCompare(b.judul);
                } else if (this.sortBy === 'qty') {
                    return a.qty - b.qty;
                } else if (this.sortBy === 'harga') {
                    return a.harga - b.harga;
                }
            });
        }
    },
    watch: {
        selectedUpbjj(newVal, oldVal) {
            console.log(`UT-Daerah berubah dari ${oldVal} ke ${newVal}`);
        },
        filterReorder(newVal) {
            console.log(`Filter reorder diubah menjadi: ${newVal}`);
        }
    },
    methods: {
        resetFilter() {
            this.selectedUpbjj = "";
            this.selectedKategori = "";
            this.sortBy = "judul";
            this.filterReorder = false;
        },
        editItem(item) {
            this.form = item ? { ...item } : { kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "", harga: 0, qty: 0, safety: 0, catatanHTML: "" };
        },
        saveBahanAjar() {
            let index = this.stok.findIndex(s => s.kode === this.form.kode);
            if (index >= 0) {
                this.stok.splice(index, 1, { ...this.form });
            } else {
                this.stok.push({ ...this.form });
            }
            this.form = { kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "", harga: 0, qty: 0, safety: 0, catatanHTML: "" };
        }
    }
});