import router from "@/router";
import store from "@/store";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

export default defineComponent({
    setup() {
        
        const cred = reactive({
            login: '',
            password: '',
        });
        const loginErrorMessage = ref('');
        
        function LoginSuccess() {
            router.push('/');
        }

        function LoginError(message: string) {
            loginErrorMessage.value = message;
        }

        async function DoLogin() {
            loginErrorMessage.value = '';
            store.dispatch('DoLogin', cred)
                .then(() => LoginSuccess())
                .catch(error => LoginError(error.message));
        }

        onMounted( async() => {
            const user = localStorage.getItem('user')
            if(user) {
                const parsedUser = JSON.parse(user);
                store.dispatch('DoLogin', parsedUser)
                    .then(() => LoginSuccess())
                    .catch(error => LoginError(error.message));
            }
        });


        return {
            ...toRefs(cred),
            loginErrorMessage,
            DoLogin,
        }
    }
})