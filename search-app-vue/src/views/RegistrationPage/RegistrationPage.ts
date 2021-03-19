import router from "@/router";
import store from "@/store";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

export default defineComponent({
    setup() {
        
        const cred = reactive({
            nickname: '',
            password1: '',
            password2: '',
        });
        const errorMessage = ref('');
        
        function RegisterSuccess() {
            router.push('/');
        }

        function ToLogin() {
            router.push('/login');
        }

        function RegisterError(message: string) {
            errorMessage.value = message;
        }

        async function DoRegister() {
            errorMessage.value = '';
            store.dispatch('DoRegistration', cred)
                .then(() => RegisterSuccess())
                .catch(error => RegisterError(error.message));
        }

        return {
            ...toRefs(cred),
            errorMessage,
            DoRegister,
            ToLogin,
        }
    }
})