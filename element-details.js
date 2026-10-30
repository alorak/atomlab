"use strict";

// Curated detail content for the 25 physical card elements.
// Abundance values are rounded, commonly cited figures (RSC Periodic Table,
// USGS, CRC Handbook); they are meant for learning, not precise reference.
// partners: [[symbols...], description]; symbols open that element's dialog.
window.ATOMLAB_ELEMENT_DETAILS={
 H:{
  mass:"1,008",phase:"Gaz",
  universe:"Evrendeki en bol element: atomların %90'ından fazlası hidrojendir (kütlece yaklaşık %74). Büyük Patlama'dan kısa süre sonra oluştu. Yıldızların ve Jüpiter, Satürn gibi gaz devlerinin ana bileşenidir; yıldızlar hidrojeni helyuma dönüştürerek ışık üretir.",
  earth:"Çok hafif olduğu için serbest hâlde atmosferde tutunamaz, uzaya kaçar. Dünya'daki en büyük hidrojen deposu okyanuslardaki sudur.",
  forms:"Serbest hâlde iki atomlu H₂ gazıdır. Dünya'da neredeyse her zaman bileşik hâlinde bulunur: su, hidrokarbonlar ve canlıların yapısındaki organik moleküller.",
  partners:[[["O"],"Su (H₂O): okyanuslar, buzullar, bulutlar"],[["C"],"Metan (CH₄), petrol ve bütün organik moleküller"],[["N"],"Amonyak (NH₃)"]],
  life:"İnsan vücudunda sayıca en bol atomdur. Amonyak ve gübre üretiminde, roket yakıtında ve yakıt hücrelerinde kullanılır.",
  fact:"Güneş her saniye yaklaşık 600 milyon ton hidrojeni helyuma dönüştürür."
 },
 He:{
  mass:"4,0026",phase:"Gaz",
  universe:"Evrende en bol ikinci elementtir (kütlece yaklaşık %24). Çoğu Büyük Patlama'da oluştu; yıldızlar da hidrojeni kaynaştırarak helyum üretir.",
  earth:"Havada çok azdır (milyonda yaklaşık 5). Yer kabuğundaki uranyum ve toryumun radyoaktif bozunmasıyla oluşur ve doğal gaz yataklarında birikir; ticari helyum buradan elde edilir.",
  forms:"Tek atomlu soygazdır; kararlı bileşik oluşturmaz.",
  partnersNote:"Kimyasal bağ yapmaz; aşağıdakiler yalnızca birlikte bulunduğu karışımlardır.",
  partners:[[["C","H"],"Doğal gaz yataklarında metanla (CH₄) karışım hâlinde"],[["N"],"Doğal gaz ve havada azotla karışım hâlinde"]],
  life:"Balonlar ve hava gemileri, MR cihazlarındaki süperiletken mıknatısların soğutulması, derin dalış gaz karışımları.",
  fact:"Dünya'dan önce Güneş'te keşfedildi: 1868'deki bir güneş tutulmasında Güneş ışığının tayfında tanınmayan sarı bir çizgi olarak görüldü. Adı Yunanca güneş anlamına gelen 'helios'tan gelir."
 },
 Li:{
  mass:"6,94",phase:"Katı",
  universe:"Büyük Patlama'da az miktarda oluşan üç elementten biridir (H, He, Li). Yıldızların içinde kolayca parçalandığı için evrende nadirdir; bir kısmını uzaydaki kozmik ışınlar üretir.",
  earth:"Yer kabuğunda azdır. Şili, Arjantin ve Bolivya'daki tuz göllerinin tuzlu sularında ve spodumen gibi minerallerde birikir.",
  forms:"Çok tepkin olduğu için doğada asla saf metal olarak bulunmaz; Li⁺ iyonu hâlinde tuzlarda ve silikat minerallerinde yer alır.",
  partners:[[["Cl"],"Tuz göllerinin suyunda lityum klorür (LiCl)"],[["Al","Si","O"],"Spodumen minerali (LiAlSi₂O₆)"],[["C","O"],"Lityum karbonat (Li₂CO₃): pil üretiminin ham maddesi"]],
  life:"Telefon, dizüstü bilgisayar ve elektrikli araçlardaki lityum-iyon piller; bazı ruhsal hastalıkların tedavisinde ilaç olarak.",
  fact:"En hafif metaldir: suda bile yüzer (ama suyla tepkimeye girer)."
 },
 Be:{
  mass:"9,0122",phase:"Katı",
  universe:"Yıldızların içinde oluşamaz. Çoğu, kozmik ışınların uzaydaki karbon, azot ve oksijen çekirdeklerini parçalamasıyla oluşur; bu yüzden evrende çok nadirdir.",
  earth:"Yer kabuğunda nadirdir; başlıca beril ve bertrandit minerallerinde bulunur.",
  forms:"Saf metal olarak bulunmaz; Be²⁺ hâlinde silikat minerallerinin içindedir.",
  partners:[[["Al","Si","O"],"Beril (Be₃Al₂Si₆O₁₈): yeşil çeşidi zümrüt, mavi çeşidi akuamarin"]],
  life:"Hafif, sert ve ısıya dayanıklı olduğu için uzay araçlarında ve X-ışını cihazlarının pencerelerinde kullanılır. Tozu solunduğunda zehirlidir.",
  fact:"James Webb Uzay Teleskobu'nun altın kaplı aynaları berilyumdan yapılmıştır."
 },
 B:{
  mass:"10,81",phase:"Katı",
  universe:"Berilyum gibi çoğunlukla kozmik ışınların uzaydaki ağır çekirdekleri parçalamasıyla oluşur; evrende nadirdir.",
  earth:"Yer kabuğunda az olsa da bazı bölgelerde zengin yataklar oluşturur. Dünyadaki bilinen bor rezervlerinin en büyük bölümü Türkiye'dedir (Kırka, Bigadiç, Emet).",
  forms:"Serbest hâlde bulunmaz; oksijenle birleşerek borat minerallerinde yer alır.",
  partners:[[["Na","O"],"Boraks (Na₂B₄O₇·10H₂O)"],[["Ca","O"],"Kolemanit (kalsiyum borat)"],[["Na","Ca","O"],"Üleksit"]],
  life:"Isıya dayanıklı borosilikat camlar (laboratuvar ve fırın camları), deterjanlar, cam yünü. Bitkiler için gerekli bir iz elementtir.",
  fact:"BCl₃ gibi bileşiklerde bor, oktetini tamamlamadan kararlı kalabilen bir istisnadır."
 },
 C:{
  mass:"12,011",phase:"Katı",
  universe:"Yaşlanan, kırmızı dev yıldızlarda üç helyum çekirdeğinin birleşmesiyle oluşur. Evrende en bol dördüncü elementtir; yıldızlararası bulutlarda CO ve daha karmaşık moleküller hâlinde bulunur.",
  earth:"Kireçtaşı ve mermer, kömür, petrol, doğal gaz, atmosferdeki CO₂ ve bütün canlılar karbon içerir.",
  forms:"Serbest hâlde elmas ve grafit olarak bulunur. Çoğunlukla bileşik hâlindedir: karbonat kayaçları, CO₂ ve organik moleküller.",
  partners:[[["H"],"Hidrokarbonlar: metan (CH₄), petrol"],[["O"],"Karbondioksit (CO₂)"],[["Ca","O"],"Kalsit, kireçtaşı ve mermer (CaCO₃)"],[["N","H","O"],"Proteinler ve DNA"]],
  life:"Bütün canlı moleküllerinin iskeletidir. Çelik (demire az miktarda karbon katılır), kalem ucu (grafit), yakıtlar.",
  fact:"Elmas ve grafitin ikisi de saf karbondur; farkları atomların nasıl bağlandığından gelir."
 },
 N:{
  mass:"14,007",phase:"Gaz",
  universe:"Yıldızlarda karbon, azot ve oksijenin yer aldığı füzyon döngüsünde oluşur. Evrende en bol 10 element arasındadır.",
  earth:"Atmosferin yaklaşık %78'i azot gazıdır (N₂). Toprakta nitrat ve amonyum tuzları hâlinde bulunur.",
  forms:"Serbest hâlde iki atomlu N₂ gazıdır. Atomları arasındaki üçlü bağ çok sağlam olduğu için zor tepkimeye girer.",
  partners:[[["H"],"Amonyak (NH₃)"],[["O"],"Nitratlar (NO₃⁻) ve azot oksitleri"],[["C","H","O"],"Proteinler ve DNA"]],
  life:"Proteinlerin ve DNA'nın yapısında bulunur. Gübre üretimi (havadaki azottan amonyak), gıda ambalajlarında koruyucu gaz; sıvı azot −196 °C'de dondurma işlemlerinde kullanılır.",
  fact:"Soluduğumuz havanın çoğu azottur, ama vücudumuz onu doğrudan kullanamaz; bitkiler de topraktaki bakterilerin dönüştürdüğü azota ihtiyaç duyar."
 },
 O:{
  mass:"15,999",phase:"Gaz",
  universe:"Büyük kütleli yıldızlarda helyum çekirdeklerinin birleşmesiyle oluşur. Evrende en bol üçüncü elementtir.",
  earth:"Yer kabuğunda kütlece en bol elementtir (yaklaşık %46); kayaçlar büyük ölçüde oksit ve silikatlardan oluşur. Atmosferin yaklaşık %21'i O₂'dir; suyun kütlesinin yaklaşık %89'u oksijendir.",
  forms:"Serbest hâlde O₂ ve ozon (O₃) olarak bulunur. Bileşik hâlinde suda, oksitlerde, silikatlarda ve karbonatlarda yer alır.",
  partners:[[["H"],"Su (H₂O)"],[["Si"],"Kuvars ve kum (SiO₂), silikat mineralleri"],[["Fe"],"Demir oksitler: hematit, pas"],[["Al"],"Korundum (Al₂O₃): yakut ve safir"],[["C"],"Karbondioksit (CO₂) ve karbonatlar"]],
  life:"Solunum için gereklidir; insan vücudunun kütlece yaklaşık %65'i oksijendir (çoğu suyun içinde). Atmosferdeki oksijeni fotosentez yapan canlılar üretir.",
  fact:"Ozon tabakası (O₃), Güneş'in zararlı morötesi ışınlarının çoğunu süzer."
 },
 F:{
  mass:"18,998",phase:"Gaz",
  universe:"Yıldızlarda oluşur, ancak yıldızların içinde kolayca tüketildiği için evrende komşu elementlere göre çok daha az bulunur.",
  earth:"Fluorit (CaF₂), florapatit ve kriyolit minerallerinde bulunur.",
  forms:"En tepkin elementtir; doğada serbest F₂ hâlinde neredeyse hiç bulunmaz, florür (F⁻) iyonu olarak minerallerde yer alır.",
  partners:[[["Ca"],"Fluorit (CaF₂)"],[["Na","Al"],"Kriyolit (Na₃AlF₆)"],[["Ca","P","O"],"Florapatit"],[["H"],"Hidrojen florür (HF)"]],
  life:"Diş macunundaki florür diş minesini güçlendirir. Yapışmaz tava kaplamaları (teflon) ve bazı soğutucu gazlar flor içerir.",
  fact:"Elektronegatifliği en yüksek elementtir: bağlarda elektronları en güçlü çeken atomdur."
 },
 Ne:{
  mass:"20,180",phase:"Gaz",
  universe:"Büyük kütleli yıldızlarda karbon çekirdeklerinin kaynaşmasıyla oluşur. Evrende en bol beşinci elementtir.",
  earth:"Havada çok azdır (milyonda yaklaşık 18); sıvılaştırılmış havanın damıtılmasıyla elde edilir. Hafif ve tepkimesiz olduğu için Dünya oluşurken çoğu uzaya kaçmıştır.",
  forms:"Tek atomlu soygazdır; kararlı bileşik oluşturmaz.",
  partnersNote:"Kimyasal bağ yapmaz; aşağıdakiler yalnızca birlikte bulunduğu karışımlardır.",
  partners:[[["N","O","Ar"],"Havada azot, oksijen ve argonla karışım hâlinde"]],
  life:"Kırmızı-turuncu ışık veren neon tabelalar, bazı lazerler ve göstergeler.",
  fact:"'Neon tabela' denen her renk neon değildir; diğer renkler farklı gazlar veya kaplamalarla elde edilir."
 },
 Na:{
  mass:"22,990",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda karbon çekirdeklerinin kaynaşmasıyla oluşur. Güneş ışığının tayfında belirgin sarı çizgiler bırakır.",
  earth:"Yer kabuğunda yaygındır (yaklaşık %2,4). Deniz suyunda bol miktarda Na⁺ iyonu vardır; kaya tuzu yatakları ve feldspat mineralleri sodyum içerir.",
  forms:"Çok tepkin olduğu için saf metal olarak bulunmaz; Na⁺ iyonu hâlinde tuzlarda ve silikatlarda yer alır.",
  partners:[[["Cl"],"Halit, kaya tuzu ve sofra tuzu (NaCl)"],[["Al","Si","O"],"Albit (sodyumlu feldspat)"],[["C","O"],"Soda (Na₂CO₃) yatakları"],[["B","O"],"Boraks"]],
  life:"Sinir hücrelerinin sinyal iletiminde görev alır. Sofra tuzu, eski tip sarı sokak lambaları, kabartma tozu (NaHCO₃).",
  fact:"Bıçakla kesilebilecek kadar yumuşak bir metaldir ve suyla şiddetli tepkimeye girer."
 },
 Mg:{
  mass:"24,305",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda karbon ve neon çekirdeklerinin kaynaşmasıyla oluşur; süpernovalarla uzaya dağılır. Evrende en bol 10 element arasındadır.",
  earth:"Yer kabuğunda yaklaşık %2'dir, ama Dünya'nın mantosunda çok boldur (olivin, piroksen). Deniz suyunda sodyumdan sonra en bol pozitif iyondur.",
  forms:"Saf metal olarak bulunmaz; Mg²⁺ iyonu hâlinde silikat, karbonat ve deniz tuzlarında yer alır.",
  partners:[[["Si","O"],"Olivin (Mg₂SiO₄): Dünya mantosunun ana minerali"],[["C","O"],"Manyezit (MgCO₃) ve dolomit"],[["Cl"],"Deniz suyunda magnezyum klorür (MgCl₂)"]],
  life:"Bitkilerdeki klorofil molekülünün merkezinde bir magnezyum atomu vardır. Hafif alaşımlar (bisiklet, araç parçaları), havai fişeklerdeki parlak beyaz ışık.",
  fact:"Yanarken göz kamaştıran beyaz bir ışık verir; eski fotoğraf flaşlarında bu yüzden kullanılırdı."
 },
 Al:{
  mass:"26,982",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda ve süpernova patlamalarında oluşur.",
  earth:"Yer kabuğunda en bol metaldir (yaklaşık %8); oksijen ve silisyumdan sonra en bol üçüncü elementtir. Feldspat ve kil minerallerinde bulunur; cevheri boksittir.",
  forms:"Saf metal olarak bulunmaz; Al³⁺ hâlinde oksit ve silikat minerallerinde yer alır.",
  partners:[[["O"],"Korundum (Al₂O₃): kırmızısı yakut, mavisi safir"],[["Si","O"],"Feldspat ve kil mineralleri"],[["O","H"],"Boksit (alüminyum hidroksitler): alüminyum cevheri"],[["Na","F"],"Kriyolit"]],
  life:"Uçak gövdeleri, içecek kutuları, folyo, pencere doğramaları. Geri dönüştürülmesi, cevherden yeniden üretmeye göre yaklaşık %95 daha az enerji harcar.",
  fact:"Cevherden ayrıştırılması çok zor olduğu için 1800'lerin ortalarında altından daha değerliydi."
 },
 Si:{
  mass:"28,085",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda oksijen çekirdeklerinin kaynaşmasıyla oluşur. Kayalık gezegenlerin, göktaşlarının ve yıldızlararası tozun yapı taşıdır.",
  earth:"Yer kabuğunda oksijenden sonra en bol ikinci elementtir (yaklaşık %28). Kumun ve kayaçların çoğunun temelidir.",
  forms:"Serbest hâlde bulunmaz; neredeyse her zaman oksijenle birlikte, silikat mineralleri ve kuvars olarak yer alır.",
  partners:[[["O"],"Kuvars ve kum (SiO₂)"],[["Al","O"],"Feldspat ve kil mineralleri"],[["Mg","Fe","O"],"Olivin"],[["C"],"Silisyum karbür (SiC): doğada çok nadir, çoğunlukla yapay"]],
  life:"Bilgisayar çipleri ve güneş panelleri (yarı iletken), cam, çimento ve beton.",
  fact:"Silisyum element adıdır; 'silikon' denen esnek malzeme ise silisyum, oksijen ve karbon içeren bir polimerdir."
 },
 P:{
  mass:"30,974",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda oluşur ve süpernova patlamalarıyla uzaya dağılır.",
  earth:"Apatit mineralleri (kalsiyum fosfat) ve fosfat kayaçları başlıca kaynaklarıdır; gübrelerin ham maddesidir.",
  forms:"Çok tepkin olduğu için serbest hâlde bulunmaz; fosfat (PO₄³⁻) olarak yer alır. Laboratuvarda beyaz ve kırmızı fosfor gibi farklı biçimleri vardır.",
  partners:[[["O"],"Fosfat iyonu (PO₄³⁻)"],[["Ca","O"],"Apatit: kemik ve diş minesi de bir apatit türüdür"],[["H"],"Fosfin (PH₃)"]],
  life:"DNA ve RNA'nın omurgasında, hücrenin enerji molekülü ATP'de ve kemiklerde bulunur. Gübreler ve kibrit kutusunun sürtünme yüzeyi (kırmızı fosfor).",
  fact:"1669'da Hennig Brand tarafından idrardan elde edildi; karanlıkta parlaması nedeniyle adı Yunanca 'ışık taşıyan' anlamına gelir."
 },
 S:{
  mass:"32,06",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda oksijen çekirdeklerinin kaynaşmasıyla oluşur. Jüpiter'in uydusu İo'daki volkanlar kükürt bileşikleri püskürtür; Venüs'ün bulutları sülfürik asit damlacıklarından oluşur.",
  earth:"Volkan çevrelerinde saf kükürt yatakları oluşturur. Pirit, galen ve alçıtaşı gibi minerallerde bulunur.",
  forms:"Doğada saf hâlde (sarı kristaller) de bulunabilen az sayıdaki ametalden biridir. Bileşik hâlinde sülfür ve sülfat minerallerinde yer alır.",
  partners:[[["Fe"],"Pirit (FeS₂): 'aptal altını'"],[["Zn"],"Sfalerit (ZnS): çinko cevheri"],[["Ca","O"],"Alçıtaşı (kalsiyum sülfat)"],[["H"],"Hidrojen sülfür (H₂S): çürük yumurta kokusu"]],
  life:"Bazı amino asitlerin yapısında bulunur. Sülfürik asit dünyada en çok üretilen kimyasallardan biridir; araç lastiklerinin dayanıklı hâle getirilmesinde kullanılır.",
  fact:"Saf kükürt kokusuzdur; 'kükürt kokusu' denen koku aslında H₂S gibi bileşiklerinden gelir."
 },
 Cl:{
  mass:"35,45",phase:"Gaz",
  universe:"Büyük kütleli yıldızlarda ve süpernova patlamalarında oluşur.",
  earth:"Deniz suyunda çözünmüş en bol iyondur (Cl⁻). Kurumuş eski denizlerden kalan kaya tuzu yataklarında bulunur.",
  forms:"Çok tepkin olduğu için serbest Cl₂ gazı doğada pek bulunmaz; klorür (Cl⁻) iyonu olarak tuzlarda yer alır.",
  partners:[[["Na"],"Halit, kaya tuzu ve sofra tuzu (NaCl)"],[["K"],"Silvin (KCl)"],[["Mg"],"Deniz suyunda magnezyum klorür"],[["H"],"Mide asidi (HCl)"]],
  life:"Mide asidinin bileşenidir. İçme suyu ve havuzların dezenfeksiyonu, PVC plastik üretimi.",
  fact:"Saf klor sarı-yeşil renkli, keskin kokulu ve zehirli bir gazdır; ama sodyumla birleşince sofra tuzunu oluşturur."
 },
 Ar:{
  mass:"39,95",phase:"Gaz",
  universe:"Büyük kütleli yıldızlarda oksijen ve silisyum yanması sırasında oluşur.",
  earth:"Atmosferin yaklaşık %0,93'ü argondur; havada en bol üçüncü gazdır. Bu argonun neredeyse tamamı kayaçlardaki radyoaktif potasyum-40'ın bozunmasıyla oluşmuştur.",
  forms:"Tek atomlu soygazdır; kararlı bileşik oluşturmaz.",
  partnersNote:"Kimyasal bağ yapmaz; aşağıdakiler birlikte bulunduğu karışımlar ve kaynağıdır.",
  partners:[[["N","O"],"Havada azot ve oksijenle karışım hâlinde"],[["K"],"Kayaçlardaki potasyum-40 bozunarak argon-40'a dönüşür"]],
  life:"Kaynak işlerinde koruyucu gaz, akkor ampuller, ısı yalıtımlı çift camların arası.",
  fact:"Adı Yunanca 'tembel' anlamına gelir; başka atomlarla neredeyse hiç tepkimeye girmez."
 },
 K:{
  mass:"39,098",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda ve süpernova patlamalarında oluşur.",
  earth:"Yer kabuğunda yaklaşık %2'dir. Feldspat ve mika minerallerinde, kurumuş deniz yataklarında (silvin) bulunur.",
  forms:"Çok tepkin olduğu için saf metal olarak bulunmaz; K⁺ iyonu hâlinde tuzlarda ve silikatlarda yer alır.",
  partners:[[["Cl"],"Silvin (KCl)"],[["Al","Si","O"],"Ortoklaz feldspat (KAlSi₃O₈)"],[["N","O"],"Güherçile (KNO₃)"]],
  life:"Sinir ve kas hücrelerinin çalışması için gereklidir; muz, patates ve baklagillerde boldur. Gübrelerin (potas) ana bileşenlerinden biridir.",
  fact:"Doğal potasyumun küçük bir kısmı radyoaktif potasyum-40'tır; vücudumuzdaki doğal radyoaktivitenin önemli bir kaynağıdır."
 },
 Ca:{
  mass:"40,078",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda ve süpernova patlamalarında oluşur.",
  earth:"Yer kabuğunda en bol beşinci elementtir (yaklaşık %4). Kireçtaşı, mermer, tebeşir, alçıtaşı ve bazı feldspatlarda bulunur.",
  forms:"Saf metal olarak bulunmaz; Ca²⁺ iyonu hâlinde karbonat, sülfat, fosfat ve silikat minerallerinde yer alır.",
  partners:[[["C","O"],"Kalsit, kireçtaşı, mermer (CaCO₃); mağara sarkıtları"],[["S","O"],"Alçıtaşı (kalsiyum sülfat)"],[["P","O"],"Apatit: kemik ve diş minerali"],[["F"],"Fluorit (CaF₂)"]],
  life:"Kemik ve dişlerin ana bileşenidir; deniz kabukları ve mercanlar kalsiyum karbonattan yapılır. Çimento ve kireç üretimi.",
  fact:"İnsan vücudunda en bol bulunan metaldir; çoğu iskelette depolanır."
 },
 Ge:{
  mass:"72,630",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda nötron yakalama süreçleriyle oluşur; evrende nadirdir.",
  earth:"Kendine ait zengin cevheri neredeyse yoktur; çinko cevherleri ve bazı kömür külleri işlenirken yan ürün olarak elde edilir.",
  forms:"Çinko ve bakır sülfür minerallerinin içinde eser miktarda bulunur.",
  partners:[[["Zn","S"],"Sfalerit (ZnS) içinde eser miktarda"],[["O"],"Germanyum dioksit (GeO₂)"],[["S"],"Germanit gibi nadir sülfür mineralleri"]],
  life:"İlk transistörler (1947) germanyumdan yapıldı. Bugün kızılötesi kamera mercekleri ve fiber optik kablolarda kullanılır.",
  fact:"Mendeleyev, keşfedilmeden 15 yıl önce varlığını 'eka-silisyum' adıyla öngördü; 1886'da bulunduğunda özellikleri tahminlere çok yakın çıktı."
 },
 Fe:{
  mass:"55,845",phase:"Katı",
  universe:"Büyük kütleli yıldızların çekirdeğinde füzyonun son aşamasında ve süpernova patlamalarında oluşur. Yıldızın çekirdeği demire dönüşünce enerji üretimi durur ve yıldız çöker. Demir göktaşları neredeyse saf demir-nikeldir.",
  earth:"Dünya kütlesinin yaklaşık üçte biri demirdir; çekirdek çoğunlukla demir ve nikelden oluşur. Yer kabuğunda en bol dördüncü elementtir (yaklaşık %5). Mars'ın kırmızı rengi demir oksitlerden gelir.",
  forms:"Göktaşları dışında saf hâlde nadirdir; Fe²⁺ veya Fe³⁺ olarak oksit, sülfür ve karbonat minerallerinde yer alır.",
  partners:[[["O"],"Hematit (Fe₂O₃), manyetit (Fe₃O₄) ve pas"],[["S"],"Pirit (FeS₂)"],[["C","O"],"Siderit (FeCO₃)"],[["Ni"],"Demir göktaşları ve Dünya'nın çekirdeği"]],
  life:"Kandaki hemoglobinde oksijen taşır. Çelik (demir + az miktarda karbon) inşaatta, taşıtlarda ve alet yapımında kullanılır.",
  fact:"Manyetit doğal bir mıknatıstır; pusulanın icadından önce 'mıknatıs taşı' olarak biliniyordu."
 },
 Cu:{
  mass:"63,546",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda nötron yakalama süreçleriyle ve süpernova patlamalarında oluşur.",
  earth:"Yer kabuğunda azdır ama zengin yataklar oluşturur. Kalkopirit ve malahit gibi minerallerde bulunur; bazen saf bakır hâlinde de çıkar.",
  forms:"Doğada saf metal olarak bulunabildiği için insanların kullandığı ilk metallerdendir. Çoğunlukla sülfür, oksit ve karbonat minerallerinde yer alır.",
  partners:[[["Fe","S"],"Kalkopirit (CuFeS₂): en önemli bakır cevheri"],[["C","O","H"],"Malahit (yeşil) ve azurit (mavi)"],[["O"],"Kuprit (Cu₂O)"]],
  life:"Elektrik kabloları ve su boruları. Kalayla tunç, çinkoyla pirinç alaşımını oluşturur. Ahtapotların mavi kanındaki oksijen taşıyıcı molekül bakır içerir.",
  fact:"Özgürlük Heykeli bakırdan yapılmıştır; yeşil rengi zamanla yüzeyde oluşan bakır tuzlarından gelir."
 },
 Zn:{
  mass:"65,38",phase:"Katı",
  universe:"Büyük kütleli yıldızlarda nötron yakalama süreçleriyle ve süpernova patlamalarında oluşur.",
  earth:"Yer kabuğunda azdır; en önemli cevheri sfalerittir. Sıklıkla kurşun ve demir mineralleriyle aynı yataklarda bulunur.",
  forms:"Saf metal olarak bulunmaz; Zn²⁺ hâlinde çoğunlukla sülfür ve karbonat minerallerinde yer alır.",
  partners:[[["S"],"Sfalerit (ZnS)"],[["C","O"],"Smitsonit (ZnCO₃)"],[["Pb","S"],"Galenle (PbS) aynı maden yataklarında"]],
  life:"Galvanizleme ile demiri pastan korur; bakırla pirinç alaşımını oluşturur. Vücuttaki yüzlerce enzim ve bağışıklık sistemi için gereklidir; güneş kremlerinde çinko oksit kullanılır.",
  fact:"Çinko kaplanmış (galvanizli) çelik, kaplama çizilse bile paslanmaya karşı korunmaya devam eder: önce çinko aşınır."
 },
 Ga:{
  mass:"69,723",phase:"Katı (29,8 °C'de erir)",
  universe:"Büyük kütleli yıldızlarda nötron yakalama süreçleriyle oluşur; evrende nadirdir.",
  earth:"Kendine ait cevheri neredeyse yoktur; boksit (alüminyum cevheri) ve çinko cevherleri işlenirken yan ürün olarak elde edilir.",
  forms:"Alüminyum ve çinko minerallerinin içinde eser miktarda bulunur.",
  partners:[[["Al","O"],"Boksit içinde eser miktarda"],[["Zn","S"],"Sfalerit içinde eser miktarda"],[["N"],"Galyum nitrür (GaN): yapay yarı iletken"],[["As"],"Galyum arsenit (GaAs): yapay yarı iletken"]],
  life:"Mavi ve beyaz LED'ler (GaN), uydu güneş panelleri, telefonlardaki yüksek frekans çipleri.",
  fact:"Erime noktası yaklaşık 29,8 °C'dir; avuç içinde tutulunca eriyebilir. Mendeleyev, varlığını keşfinden önce 'eka-alüminyum' adıyla öngörmüştü."
 }
};
