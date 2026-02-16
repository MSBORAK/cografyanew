// Kıtalar ve ülkeleri (ISO 3-letter codes)

export const continents = {
  africa: {
    name: 'Afrika',
    color: '#EF4444',
    countries: [
      'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CMR', 'CPV', 'CAF', 'TCD',
      'COM', 'COG', 'COD', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'ETH', 'GAB',
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
      'PAK', 'PSE', 'PHL', 'QAT', 'SAU', 'SGP', 'KOR', 'LKA', 'SYR', 'TWN',
      'TJK', 'THA', 'TLS', 'TUR', 'TKM', 'ARE', 'UZB', 'VNM', 'YEM'
    ]
  },
  europe: {
    name: 'Avrupa',
    color: '#10B981',
    countries: [
      'ALB', 'AND', 'AUT', 'BLR', 'BEL', 'BIH', 'BGR', 'HRV', 'CZE', 'DNK',
      'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'ISL', 'IRL', 'ITA', 'XKS',
      'LVA', 'LIE', 'LTU', 'LUX', 'MKD', 'MLT', 'MDA', 'MCO', 'MNE', 'NLD',
      'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SMR', 'SRB', 'SVK', 'SVN', 'ESP',
      'SWE', 'CHE', 'UKR', 'GBR', 'VAT'
    ]
  },
  northAmerica: {
    name: 'Kuzey Amerika',
    color: '#06B6D4',
    countries: [
      'ATG', 'BHS', 'BRB', 'BLZ', 'CAN', 'CRI', 'CUB', 'DMA', 'DOM', 'SLV',
      'GRD', 'GTM', 'HTI', 'HND', 'JAM', 'MEX', 'NIC', 'PAN', 'KNA', 'LCA',
      'VCT', 'TTO', 'USA'
    ]
  },
  southAmerica: {
    name: 'Güney Amerika',
    color: '#8B5CF6',
    countries: [
      'ARG', 'BOL', 'BRA', 'CHL', 'COL', 'ECU', 'GUY', 'PRY', 'PER', 'SUR',
      'URY', 'VEN'
    ]
  },
  oceania: {
    name: 'Okyanusya',
    color: '#EC4899',
    countries: [
      'AUS', 'FJI', 'KIR', 'MHL', 'FSM', 'NZL', 'PLW', 'PNG', 'WSM',
      'SLB', 'TON', 'TUV', 'VUT'
    ]
  },
  antarctica: {
    name: 'Antarktika',
    color: '#94A3B8',
    countries: []
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
