// Kıtalar ve ülkeleri (ISO 3-letter codes)

export const continents = {
  africa: {
    name: 'Afrika',
    color: '#EF4444',
    countries: [
      'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD',
      'COM', 'COG', 'COD', 'ZAR', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB',
      'SAH',
      'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI',
      'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP',
      'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'SWZ', 'TZA', 'TGO',
      'TUN', 'UGA', 'ZMB', 'ZWE'
    ]
  },
  asia: {
    name: 'Asya',
    color: '#F59E0B',
    countries: [
      'AFG', 'ARM', 'AZE', 'BHR', 'BGD', 'BTN', 'BRN', 'KHM', 'CHN', 'CYP',
      'GEO', 'IND', 'IDN', 'IRN', 'IRQ', 'ISR', 'JPN', 'JOR', 'KAZ', 'KWT',
      'KGZ', 'LAO', 'LBN', 'MYS', 'MDV', 'MNG', 'MMR', 'NPL', 'PRK', 'OMN',
      'PAK', 'PSE', 'WBG', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN',
      'TJK', 'THA', 'TLS', 'TMP', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM',
      'MAC', 'HKG'
    ]
  },
  europe: {
    name: 'Avrupa',
    color: '#10B981',
    countries: [
      'ALB', 'AND', 'AUT', 'BLR', 'BEL', 'BIH', 'BGR', 'HRV', 'CZE', 'DNK',
      'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'GIB', 'HUN', 'ISL', 'IMY', 'IRL', 'ITA', 'XKS', 'KSV',
      'LVA', 'LIE', 'LTU', 'LUX', 'MKD', 'MLT', 'MDA', 'MCO', 'MNE', 'NLD',
      'NOR', 'POL', 'PRT', 'ROU', 'ROM', 'RUS', 'SMR', 'SRB', 'SVK', 'SVN', 'ESP',
      'SWE', 'CHE', 'UKR', 'GBR', 'VAT'
    ]
  },
  northAmerica: {
    name: 'Kuzey Amerika',
    color: '#06B6D4',
    countries: [
      'ATG', 'BHS', 'BRB', 'BLZ', 'CAN', 'CRI', 'CUB', 'DMA', 'DOM', 'SLV',
      'GRD', 'GRL', 'GTM', 'HTI', 'HND', 'JAM', 'MEX', 'NIC', 'PAN', 'KNA', 'LCA',
      'MAF', 'PRI', 'SXM', 'TCA', 'VIR', 'VCT', 'TTO', 'USA'
    ]
  },
  southAmerica: {
    name: 'Güney Amerika',
    color: '#8B5CF6',
    countries: [
      'ARG', 'BOL', 'BRA', 'CHL', 'CHI', 'COL', 'ECU', 'GUY', 'PRY', 'PER', 'SUR',
      'URY', 'VEN'
    ]
  },
  oceania: {
    name: 'Okyanusya',
    color: '#EC4899',
    countries: [
      'AUS', 'FJI', 'GUM', 'KIR', 'MHL', 'FSM', 'MNP', 'NCL', 'NZL', 'PLW', 'PNG', 'PYF',
      'SLB', 'SOL', 'WSM', 'TON', 'TUV', 'VUT'
    ]
  },
  antarctica: {
    name: 'Antarktika',
    color: '#94A3B8',
    countries: ['ATA']
  }
};

// Ülkenin hangi kıtada olduğunu bul
export function getContinentByCountry(countryCode) {
  for (const [key, continent] of Object.entries(continents)) {
    if (continent.countries.includes(countryCode)) {
      return key;
    }
  }
  return null;
}

// Kıta rengini al
export function getContinentColor(continentKey) {
  return continents[continentKey]?.color || '#E5E7EB';
}
