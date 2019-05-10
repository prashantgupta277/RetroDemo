
import { toast } from 'react-toastify';

export function  createNotification (type,message) {
    toast.dismiss();
    switch (type) {
      case 'info':
          toast.success("Success Notification !", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        break;
      case 'success':
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        break;
      case 'warning':
        toast.warning(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        break;
      case 'error':
        toast.error(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        break;
      default:
    }
}
