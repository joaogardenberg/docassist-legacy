import { toast as Toast } from 'react-toastify';

const INFO = 'INFO';
const SUCCESS = 'SUCCESS';
const WARNING = 'WARNING';
const ERROR = 'ERROR';

export function info(text = '', time = 5000) {
  Toast.info(text, options(time, INFO));
}

export function success(text = '', time = 5000) {
  Toast.success(text, options(time, SUCCESS));
}

export function warning(text = '', time = 5000) {
  Toast.warning(text, options(time, WARNING));
}

export function error(text = '', time = 5000) {
  Toast.error(text, options(time, ERROR));
}

function options(time, type = INFO) {
  let classes;

  switch(type) {
    case SUCCESS:
      classes = {
        bodyClassName: 'text success',
        className: 'toastify-body success bottom-shadow',
        progressClassName: 'progress-bar success'
      };

      break;
    case WARNING:
      classes = {
        bodyClassName: 'text warning',
        className: 'toastify-body warning bottom-shadow',
        progressClassName: 'progress-bar warning'
      };

      break;
    case ERROR:
      classes = {
        bodyClassName: 'text error',
        className: 'toastify-body error bottom-shadow',
        progressClassName: 'progress-bar error'
      };

      break;
    default:
      classes = {
        bodyClassName: 'text info',
        className: 'toastify-body info bottom-shadow',
        progressClassName: 'progress-bar info'
      };
  }

  return {
    position: 'top-right',
    autoClose: time === 0 ? false : time,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    ...classes
  }
}
