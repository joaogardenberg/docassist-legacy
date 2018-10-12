import { toast as Toast } from 'react-toastify';

export function info(text = '', time = 5000) {
  Toast.info(text, options(time));
}

export function success(text = '', time = 5000) {
  Toast.success(text, options(time));
}

export function warning(text = '', time = 5000) {
  Toast.warning(text, options(time));
}

export function error(text = '', time = 5000) {
  Toast.error(text, options(time));
}

function options(time) {
  return {
    position: 'top-right',
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true
  }
}
