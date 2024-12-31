import { reactive } from 'vue';

const toastState = reactive({
    message: '',
    type: 'success',
    visible: false,
});

export const showToast = (message: string, type = 'success') => {
    toastState.message = message;
    toastState.type = type;
    toastState.visible = true;

    setTimeout(() => {
        toastState.visible = false;
    }, 3000);
};

export const useToastState = () => toastState;
