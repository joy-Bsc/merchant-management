import cogoToast from 'cogo-toast';

const emailRegex = /\S+@\S+\.\S+/;
const mobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
    isEmpty(value) {
        if(value.length===0){
         return true;
        }
        else {
         return false;
        }
     }
 

    isMobile(value) {
        return mobileRegex.test(value);
    }

    isEmail(value) {
        return !emailRegex.test(value);
    }

    errorToast(msg) {
        cogoToast.error(msg, { position: "bottom-center" });
    }

    successToast(msg) {
        cogoToast.success(msg, { position: "bottom-center" });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

 


export const { isEmpty, isMobile, isEmail, errorToast, successToast,getBase64 } = new FormHelper();