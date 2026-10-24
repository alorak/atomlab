# Atom Laboratuvarı

Basit, bağımsız ve Türkçe bir atom öğrenme arayüzü. İlk sürüm iki sayfadan oluşur:

- **Periyodik Tablo:** 118 elementin atom numarası, sembolü ve Türkçe adı; fiziksel kart setindeki **25 element belirgin**, geri kalanlar soluk gösterilir. Arama, kart setini filtreleme ve seçili elemente tıklayıp kartına geçiş bulunur.
- **Atom Kartları:** Üstte 25 atom için seçim düğmeleri; sağda fiziksel kart tasarımına benzeyen kart, solda kabuk dağılımı ve kısa açıklama bulunur.

## Görsel kurallar

- **Ametaller:** mat mavi-gri; **metaller:** mat kiremit ve metal aileleri için yakın tonlar; **soygazlar:** petrol mavisi; **yarımetaller:** mavi-griye yakın ayrı bir ton.
- Üst başlık koyu, kart gövdesi açık; sağ üstte yuvarlak içinde atom numarası; ortada element sembolü.
- Değerlik kabuğunda 8 yuva simetrik şekilde **solda 4 + sağda 4**, H ve He için **2 yuva** bulunur.
- Dış kabuktaki dolu yuvalar belirgin, boş yuvalar içi boş; içerideki tüm dolu kabuklar gerçek elektron sayılarıyla fakat soluk gösterilir.
- Bohr tipi kabuklar **öğretici şemadır**, elektronların gerçek uzaysal konumları veya s/p/d orbital diyagramı değildir. Fe, Cu ve Zn'nin elektron yerleşimleri basit oktet bağ tahmini anlamına gelmez.

## Çalıştırma

Hiçbir npm paketi veya uzak CDN gerekmez. `index.html`, `styles.css` ve `app.js` aynı dizindedir. Dosyayı doğrudan tarayıcıda açabilir veya yerel sunucuyla çalıştırabilirsiniz:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın.

GitHub Pages için **Settings → Pages → Deploy from a branch → main / root** seçimi yeterlidir (değişiklikler main'e birleştirildikten sonra).

## Kart seti

**Seviye 1 (12):** H, He, Li, C, N, O, F, Ne, Na, Mg, Cl, Ar.

**Seviye 2 (7):** Si, Ge, P, S, Al, K, Ca.

**Seviye 3 (6):** Be, B, Fe, Cu, Zn, Ga.

Toplam **25 farklı element**. Bor ve Germanyum ayrı ek paket değildir. Baskı için tek dosyalık **25 element kartları A4 PDF** ve **25 element vurgulu periyodik tablo A4 yatay PDF** ayrıca oluşturulmuştur.

> Bu ilk sürüm atomları tanıma arayüzüdür. Molekül oluşturma, görev kartları, puanlama ve çok oyunculu oynanış sonraki aşamaya bırakılmıştır.
