export function fetchPatients() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 5;

      for (let i = 1; i <= random; i++) {
        objects.push({
          id: `${new Date().getTime()}${Math.floor(Math.random() * 10001)}`,
          name: `Paciente ${i}`
        });
      }

      resolve(objects);
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
