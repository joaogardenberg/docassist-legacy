export function fetchPatients() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 50;

      for (let i = 1; i <= random; i++) {
        let random = Math.floor(Math.random() * 101) + 1;
        const gender = random > 50 ? '1' : '2';
        random = Math.floor(Math.random() * 101) + 1;
        const maritalStatus = random > 25 ? random > 50 ? random > 75 ? '4' : '3' : '2' : '1';
        random = Math.floor(Math.random() * 101) + 1;
        const dateOfBirth = `01/01/${new Date().getFullYear() - random}`;
        const cpf = '111.111.111-11';
        random = Math.floor(Math.random() * 101) + 1;
        const rg = random > 50 ? '12345678' : '';
        const rgIssuingAgency = random > 50 ? 'DETRAN' : '';
        random = Math.floor(Math.random() * 101) + 1;
        const nationality = random > 50 ? '1' : 'other';
        const nationalityOther = random > 50 ? '' : 'Holandesa';
        const placeOfBirth = random > 50 ? 'rio_de_janeiro' : 'other';
        const placeOfBirthOther = random > 50 ? '' : 'Amsterdam';

        objects.push({
          gender,
          maritalStatus,
          dateOfBirth,
          cpf,
          rg,
          rgIssuingAgency,
          nationality,
          nationalityOther,
          placeOfBirth,
          placeOfBirthOther,
          id: `id_paciente_${i}`,
          name: `Paciente ${i}`,
          occupation: 'Paciente ¯\\_(ツ)_/¯'
        });
      }

      resolve(objects);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}

export function fetchPatient(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let random = Math.floor(Math.random() * 101) + 1;
      const gender = random > 50 ? '1' : '2';
      random = Math.floor(Math.random() * 101) + 1;
      const maritalStatus = random > 25 ? random > 50 ? random > 75 ? '4' : '3' : '2' : '1';
      random = Math.floor(Math.random() * 101) + 1;
      const dateOfBirth = `01/01/${new Date().getFullYear() - random}`;
      const cpf = '111.111.111-11';
      random = Math.floor(Math.random() * 101) + 1;
      const rg = random > 50 ? '12345678' : '';
      const rgIssuingAgency = random > 50 ? 'DETRAN' : '';
      random = Math.floor(Math.random() * 101) + 1;
      const nationality = random > 50 ? '1' : 'other';
      const nationalityOther = random > 50 ? '' : 'Holandesa';
      const placeOfBirth = random > 50 ? 'rio_de_janeiro' : 'other';
      const placeOfBirthOther = random > 50 ? '' : 'Amsterdam';

      resolve({
        gender,
        maritalStatus,
        dateOfBirth,
        cpf,
        rg,
        rgIssuingAgency,
        nationality,
        nationalityOther,
        placeOfBirth,
        placeOfBirthOther,
        id,
        name: 'Paciente',
        occupation: 'Paciente ¯\\_(ツ)_/¯'
      });
    }, 100 + Math.floor(Math.random() * 2001));
  });
}

export function createPatient(attributes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dup = Object.assign({}, attributes);
      dup.id = `${new Date().getTime()}${Math.floor(Math.random() * 10001)}`;
      resolve(dup);
    });
  }, 100 + Math.floor(Math.random() * 2001));
}

export function updatePatient(attributes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(attributes);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}

export function destroyPatient(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}
