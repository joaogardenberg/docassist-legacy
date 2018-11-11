export const GENDERS = [
  'Masculino',
  'Feminino'
];

export const GENDER_VALUES = [
  '1',
  '2'
];

export const MARITAL_STATUSES = [
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)'
];

export const MARITAL_STATUS_VALUES = [
  '1',
  '2',
  '3',
  '4'
];

export const NATIONALITIES = [
  'Brasileira',
  'Outra'
];

export const NATIONALITY_VALUES = [
  '1',
  'other'
]

export const STATES = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins',
  'Outra'
];

export const STATE_VALUES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
  'other'
];

export function getGenderName(gender) {
  const index = GENDER_VALUES.findIndex(g => g === gender);

  if (index >= 0) {
    return GENDERS[index];
  }

  return null;
}

export function getMaritalStatusName(maritalStatus) {
  const index = MARITAL_STATUS_VALUES.findIndex(mS => mS === maritalStatus);

  if (index >= 0) {
    return MARITAL_STATUSES[index];
  }

  return null;
}

export function getRgWithIssuingAgency(rg, rgIssuingAgency) {
  if (rg) {
    return `${rg} - ${rgIssuingAgency}`
  }

  return null;
}

export function getNationalityName(nationality, nationalityOther) {
  if (nationality === 'other') {
    return nationalityOther;
  } else {
    const index = NATIONALITY_VALUES.findIndex(n => n === nationality);

    if (index >= 0) {
      return NATIONALITIES[index];
    }

    return null;
  }
}

export function getPlaceOfBirthName(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === 'other') {
    return placeOfBirthOther;
  } else {
    const index = STATE_VALUES.findIndex(state => state === placeOfBirth);

    if (index >= 0) {
      return STATES[index];
    }

    return null;
  }
}

export function getFullAddress(cep, state, city, neighborhood, address, complement) {
  let fullAddress = '';

  if (address) {
    fullAddress += address;
  }

  if (complement && address) {
    fullAddress += `, ${complement}`;
  }

  if (neighborhood) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}${neighborhood}`;
  }

  if (city) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}${city}`;
  }

  if (state) {
    let prefix = '';

    if (fullAddress) {
      if (city) {
        prefix = ' / ';
      } else {
        prefix = ' - ';
      }
    }

    fullAddress += `${prefix}${state}`;
  }

  if (cep) {
    let prefix = '';

    if (fullAddress) {
      prefix = ' - ';
    }

    fullAddress += `${prefix}CEP ${cep}`;
  }

  return fullAddress;
}
