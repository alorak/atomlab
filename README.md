# Atom Laboratuvarı

Türkçe ve bağımsız çalışan, **tek ekranlı** periyodik tablo / atom kartı uygulaması.

- **Solda:** 118 elementin periyodik tablosu, arama alanı ve kart setini vurgulama seçeneği.
- **Sağda:** seçilen elementin fiziksel kart tasarımındaki önizlemesi ve kısa özellikleri.
- **25 fiziksel kart elementi** tam renkle işaretlenir.
- **Diğer 93 element** tablo üzerinde belirgin biçimde soluktur, ancak hepsi tıklanabilir; sağdaki **sanal kart** aynı şekilde soluk gösterilir ve “Sanal kart · Sette yok” uyarısı taşır.
- Ayrı “Atom Kartları” sekmesi, büyük sayfa başlığı veya tanıtım alanı bulunmaz.
- Dar ekranlarda tablo yatay kaydırılabilir, seçim yapıldığında element detay penceresi açılır.

## Element detay penceresi

Sağdaki karttaki **Detaylı incele** düğmesi, tablodaki bir hücreye çift tıklama veya görevlerdeki atom etiketleri, elementin detay penceresini (`<dialog>`) açar. Dar ekranlarda tek dokunuş yeterlidir.

Kart setindeki **25 element** için pencerede şunlar bulunur:

- atom kütlesi ve oda sıcaklığındaki hâli,
- evrende nerede ve nasıl oluştuğu, Dünya'da nerede bulunduğu,
- doğada hangi formda (serbest/bileşik, mineral) bulunduğu,
- sık birlikte bulunduğu atomlar: etikete tıklayınca o elementin penceresi açılır,
- canlılarda ve günlük hayattaki yeri, kısa bir ilginç bilgi,
- elementi kullanan görevler: görev verisinden otomatik çıkarılır ve göreve bağlantı verir.

İçerik `element-details.js` dosyasındadır. Bolluk değerleri yaklaşık ve yuvarlanmıştır (RSC Periyodik Tablo, USGS, CRC Handbook). Soygazlarda listelenen atomlar bağ değil, karışım olarak belirtilir. Diğer 93 element için uydurma içerik yerine doğada bulunuş notu (yapay / eser miktarda / radyoaktif) ve ayrıntılı bilginin henüz eklenmediği belirtilir.

## Renk ve gösterim

Mat mavi-gri **ametal**, kiremit tonları **metal**, petrol mavisi **soygaz**, ametale yakın soluk mavi-gri **yarımetal** kategorisini gösterir.

Kart üstü koyu, gövdesi açıktır; atom numarası başlığın sağ üstünde bulunur. İç kabuktaki elektronlar silik, dış kabuktakiler belirgindir. Hidrojen ve helyum iki yuvalı; yaygın sekizli gösterim diğer elementlerde **solda dört + sağda dört** yuvalıdır.

**Bilimsel sınır:** Bohr tipi kabuk çizimi öğrenme amaçlıdır; elektronların gerçek uzaysal yerleşimini veya atom orbitallerini göstermez. Geçiş ve iç geçiş metalleri için yalnızca dış kabuk elektronlarından iyon yükü/bağ kapasitesi çıkarılmamalıdır. Sanal kartların kabuk elektron verileri [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON) kaynağındaki *shells* alanıyla karşılaştırılarak alınmıştır (CC BY-SA 3.0); en ağır elementlerde bazı konfigürasyonlar teoriktir.

## Geliştirme ve doğrulama

Uzak kütüphane, CDN veya npm bağımlılığı yoktur. `index.html` doğrudan açılabilir veya şu şekilde servis edilebilir:

```bash
python3 -m http.server 8000
```

`http://localhost:8000` üzerinden görüntülenir. Statik uygulama GitHub Pages ile yayınlanabilir.

Bağımlılıksız test:

```bash
node tests/smoke.cjs
node tests/missions.cjs
node tests/mission-visuals.cjs
node tests/element-details.cjs
```

Testler bütün elementlerin atom numaraları/elektron kabuklarını, **118 tıklanabilir hücreyi**, 25 gerçek kartı ve sanal kart gösterimini kontrol eder.

## Fiziksel kart seti

- **Seviye 1 (12):** H, He, Li, C, N, O, F, Ne, Na, Mg, Cl, Ar.
- **Seviye 2 (7):** Si, Ge, P, S, Al, K, Ca.
- **Seviye 3 (6):** Be, B, Fe, Cu, Zn, Ga.

Toplam **25 farklı element**.

## Dört aşamalı görevler ve görsel çözümler

**Görevler** ekranında 26 öğretici kart bulunur: molekülleri keşfet (4), kovalent bağlar (8), iyonik bağlar (8), kristaller ve özel durumlar (6).

Bir görevde **Çözümü göster** seçilince önce kullanılan atom kartları minyatür fiziksel kart görünümünde çizilir:

- O₂: iki Oksijen kartı, aralarında **çift bağ** (iki çizgi).
- N₂: iki Azot kartı, aralarında **üçlü bağ** (üç çizgi).
- H₂O, NH₃, CH₄, CO₂ vb.: doğru sayıda atom kartı ve ilgili kovalent bağların iki boyutlu şeması.
- NaCl, MgCl₂, Al₂O₃, Fe₂O₃ vb.: kart sayısı, oluşan **iyon yükleri** ve formül oranı; lokalize kovalent bağ çizgisi kullanılmaz.
- SiO₂, GeO₂ ve SiC: **formül oranı ve ağın sürdüğü** gösterilir; bu katılar bağımsız moleküllermiş gibi sunulmaz.

Minyatür kartlardaki elektron yuvaları, küçük boyutta okunabilirlik için sadeleştirilmiştir. **Gerçek bağ doğrulama, sürükle-bırak ve otomatik puanlama** henüz eklenmedi.
