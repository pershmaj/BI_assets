import { computed, defineComponent, onMounted } from "vue";
import AssetItem from "@/components/AssetItem/AssetItem.vue";
import store from "@/store";

export default defineComponent({
    components: {
        AssetItem,
    },
    setup(){
        
        const assets = computed(() => store.state.assets);
        const nickname = computed(() => store.state.nickname);

        onMounted(() => {
            store.dispatch('GetAssets');
        });

        return {
            assets,
            nickname,
        }
    }
})