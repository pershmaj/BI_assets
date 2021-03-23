import { computed, defineComponent, onMounted, ref } from "vue";
import AssetItem from "@/components/AssetItem/AssetItem.vue";
import store from "@/store";
import UserDetail from '@/components/UserDetail/UserDetail.vue'

export default defineComponent({
    components: {
        AssetItem,
        UserDetail,

    },
    setup(){
        
        const assets = computed(() => store.state.assets);
        const nickname = computed(() => store.state.nickname);

        onMounted(() => {
            store.dispatch('GetAssets');
        });
        const userDetailHandler = ref(false);
        function HandleUserDetail(v: boolean) {
            userDetailHandler.value = v;
        }

        return {
            assets,
            nickname,
            userDetailHandler,

            HandleUserDetail,
        }
    }
})