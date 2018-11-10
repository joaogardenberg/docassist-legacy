export const TYPES = [
  'Médico(a)',
  'Secretário(a)'
];

export const TYPE_VALUES = [
  '1',
  '2'
]

export function getTypeName(type) {
  const index = TYPE_VALUES.findIndex(t => t === type);

  if (index >= 0) {
    return TYPES[index];
  }

  return null;
}
