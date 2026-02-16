// Guardian world-map repository'den dünya haritası verilerini indir
const https = require('https');
const fs = require('fs');

const GEOMETRY_URL = 'https://raw.githubusercontent.com/guardian/world-map/master/geometry.json';

console.log('Guardian world-map geometry.json indiriliyor...');
console.log('URL:', GEOMETRY_URL);
console.log('='.repeat(60));

https.get(GEOMETRY_URL, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    console.log('✓ JSON dosyası indirildi');
    console.log(`Boyut: ${(data.length / 1024).toFixed(2)} KB`);
    
    // JSON'u parse et
    const geometry = JSON.parse(data);
    const countries = [];
    
    // Her ülke için path verilerini al
    for (const [code, pathData] of Object.entries(geometry)) {
      countries.push({
        id: code,
        name: code, // ISO kodu
        d: pathData
      });
    }
    
    console.log(`\n✓ ${countries.length} ülke bulundu`);
    
    // İlk birkaç örnek göster
    console.log('\nİlk 5 ülke:');
    countries.slice(0, 5).forEach((c, i) => {
      console.log(`${i + 1}. ${c.id} - Path uzunluğu: ${c.d.length} karakter`);
    });
    
    // JavaScript dosyası olarak kaydet
    const jsContent = `// Dünya Haritası - Tüm Ülkeler SVG Path Verileri
// Kaynak: Guardian world-map (https://github.com/guardian/world-map)
// Natural Earth data, Robinson projection
// Boyut: 1000 x 507

export const worldPaths = ${JSON.stringify(countries, null, 2)};

// Ülke isimlerini ISO kodlarına göre eşleştir
export const countryNames = {
  "AFG": "Afganistan",
  "ALB": "Arnavutluk",
  "DZA": "Cezayir",
  "AND": "Andorra",
  "AGO": "Angola",
  "ATG": "Antigua ve Barbuda",
  "ARG": "Arjantin",
  "ARM": "Ermenistan",
  "AUS": "Avustralya",
  "AUT": "Avusturya",
  "AZE": "Azerbaycan",
  "BHS": "Bahamalar",
  "BHR": "Bahreyn",
  "BGD": "Bangladeş",
  "BRB": "Barbados",
  "BLR": "Belarus",
  "BEL": "Belçika",
  "BLZ": "Belize",
  "BEN": "Benin",
  "BTN": "Butan",
  "BOL": "Bolivya",
  "BIH": "Bosna-Hersek",
  "BWA": "Botsvana",
  "BRA": "Brezilya",
  "BRN": "Brunei",
  "BGR": "Bulgaristan",
  "BFA": "Burkina Faso",
  "BDI": "Burundi",
  "KHM": "Kamboçya",
  "CMR": "Kamerun",
  "CAN": "Kanada",
  "CPV": "Yeşil Burun Adaları",
  "CAF": "Orta Afrika Cumhuriyeti",
  "TCD": "Çad",
  "CHL": "Şili",
  "CHN": "Çin",
  "COL": "Kolombiya",
  "COM": "Komorlar",
  "COG": "Kongo Cumhuriyeti",
  "COD": "Kongo Demokratik Cumhuriyeti",
  "CRI": "Kosta Rika",
  "HRV": "Hırvatistan",
  "CUB": "Küba",
  "CYP": "Kıbrıs",
  "CZE": "Çekya",
  "DNK": "Danimarka",
  "DJI": "Cibuti",
  "DMA": "Dominika",
  "DOM": "Dominik Cumhuriyeti",
  "ECU": "Ekvador",
  "EGY": "Mısır",
  "SLV": "El Salvador",
  "GNQ": "Ekvator Ginesi",
  "ERI": "Eritre",
  "EST": "Estonya",
  "ETH": "Etiyopya",
  "FJI": "Fiji",
  "FIN": "Finlandiya",
  "FRA": "Fransa",
  "GAB": "Gabon",
  "GMB": "Gambiya",
  "GEO": "Gürcistan",
  "DEU": "Almanya",
  "GHA": "Gana",
  "GRC": "Yunanistan",
  "GRD": "Grenada",
  "GTM": "Guatemala",
  "GIN": "Gine",
  "GNB": "Gine-Bissau",
  "GUY": "Guyana",
  "HTI": "Haiti",
  "HND": "Honduras",
  "HUN": "Macaristan",
  "ISL": "İzlanda",
  "IND": "Hindistan",
  "IDN": "Endonezya",
  "IRN": "İran",
  "IRQ": "Irak",
  "IRL": "İrlanda",
  "ISR": "İsrail",
  "ITA": "İtalya",
  "JAM": "Jamaika",
  "JPN": "Japonya",
  "JOR": "Ürdün",
  "KAZ": "Kazakistan",
  "KEN": "Kenya",
  "KIR": "Kiribati",
  "PRK": "Kuzey Kore",
  "KOR": "Güney Kore",
  "KWT": "Kuveyt",
  "KGZ": "Kırgızistan",
  "LAO": "Laos",
  "LVA": "Letonya",
  "LBN": "Lübnan",
  "LSO": "Lesotho",
  "LBR": "Liberya",
  "LBY": "Libya",
  "LIE": "Lihtenştayn",
  "LTU": "Litvanya",
  "LUX": "Lüksemburg",
  "MKD": "Kuzey Makedonya",
  "MDG": "Madagaskar",
  "MWI": "Malavi",
  "MYS": "Malezya",
  "MDV": "Maldivler",
  "MLI": "Mali",
  "MLT": "Malta",
  "MHL": "Marshall Adaları",
  "MRT": "Moritanya",
  "MUS": "Mauritius",
  "MEX": "Meksika",
  "FSM": "Mikronezya",
  "MDA": "Moldova",
  "MCO": "Monako",
  "MNG": "Moğolistan",
  "MNE": "Karadağ",
  "MAR": "Fas",
  "MOZ": "Mozambik",
  "MMR": "Myanmar",
  "NAM": "Namibya",
  "NRU": "Nauru",
  "NPL": "Nepal",
  "NLD": "Hollanda",
  "NZL": "Yeni Zelanda",
  "NIC": "Nikaragua",
  "NER": "Nijer",
  "NGA": "Nijerya",
  "NOR": "Norveç",
  "OMN": "Umman",
  "PAK": "Pakistan",
  "PLW": "Palau",
  "PSE": "Filistin",
  "PAN": "Panama",
  "PNG": "Papua Yeni Gine",
  "PRY": "Paraguay",
  "PER": "Peru",
  "PHL": "Filipinler",
  "POL": "Polonya",
  "PRT": "Portekiz",
  "QAT": "Katar",
  "ROU": "Romanya",
  "RUS": "Rusya",
  "RWA": "Ruanda",
  "KNA": "Saint Kitts ve Nevis",
  "LCA": "Saint Lucia",
  "VCT": "Saint Vincent ve Grenadinler",
  "WSM": "Samoa",
  "SMR": "San Marino",
  "STP": "São Tomé ve Príncipe",
  "SAU": "Suudi Arabistan",
  "SEN": "Senegal",
  "SRB": "Sırbistan",
  "SYC": "Seyşeller",
  "SLE": "Sierra Leone",
  "SGP": "Singapur",
  "SVK": "Slovakya",
  "SVN": "Slovenya",
  "SLB": "Solomon Adaları",
  "SOM": "Somali",
  "ZAF": "Güney Afrika",
  "SSD": "Güney Sudan",
  "ESP": "İspanya",
  "LKA": "Sri Lanka",
  "SDN": "Sudan",
  "SUR": "Surinam",
  "SWZ": "Esvatini",
  "SWE": "İsveç",
  "CHE": "İsviçre",
  "SYR": "Suriye",
  "TWN": "Tayvan",
  "TJK": "Tacikistan",
  "TZA": "Tanzanya",
  "THA": "Tayland",
  "TLS": "Doğu Timor",
  "TGO": "Togo",
  "TON": "Tonga",
  "TTO": "Trinidad ve Tobago",
  "TUN": "Tunus",
  "TUR": "Türkiye",
  "TKM": "Türkmenistan",
  "TUV": "Tuvalu",
  "UGA": "Uganda",
  "UKR": "Ukrayna",
  "ARE": "Birleşik Arap Emirlikleri",
  "GBR": "Birleşik Krallık",
  "USA": "Amerika Birleşik Devletleri",
  "URY": "Uruguay",
  "UZB": "Özbekistan",
  "VUT": "Vanuatu",
  "VAT": "Vatikan",
  "VEN": "Venezuela",
  "VNM": "Vietnam",
  "YEM": "Yemen",
  "ZMB": "Zambiya",
  "ZWE": "Zimbabve"
};
`;
    
    fs.writeFileSync('constants/worldPaths.js', jsContent, 'utf8');
    console.log('\n✓ constants/worldPaths.js dosyasına kaydedildi');
    
    console.log('\n' + '='.repeat(60));
    console.log('İşlem tamamlandı!');
    console.log('Harita boyutu: 1000 x 507 (Robinson projection)');
    console.log('='.repeat(60));
  });
}).on('error', (err) => {
  console.error('Hata:', err.message);
});
