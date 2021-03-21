import api from "@/api";
import { Asset } from "@/interfaces";
import store from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
import AssetDetail from "@/components/AssetDetail/AssetDetail.vue"
import { ref } from "vue";

export default defineComponent({
    components: {
        AssetDetail,
    },
    props: {
        asset: {
            type: Object as () => Asset,
            required: true,
        }
    },
    setup(props, ctx) {
        console.log(props.asset)
        const link = computed(() => {
            return `${api.host}/assets/${props.asset.link}`
        });

        const owner = computed(() => {
            return `Owner: ${props.asset.owner.nickname}`
        });

        // well, I cannot use tooltip template or v-html because it doesnt work :(
        const likes = computed(() => {
            return props.asset.likes?.length
                ? props.asset.likes.map((usr) => usr.nickname).join(' | ')
                : '';
        });
        // yeah, its my designer approach to likes button, time to change rules!
        const likeIcon = computed(() => {
            return props.asset.likes?.find((usr) => usr.id === store.state.id)
                ? 'el-icon-remove-outline'
                : 'el-icon-circle-plus-outline'
        });

        const changePermission = store.state.id === props.asset.user_id;

        function DoLike() {
            store.dispatch('DoLike', props.asset.id);
        }

        const assetDetailHandler = ref(false);
        function HandleAssetDetail(v: boolean) {
            assetDetailHandler.value = v;
        }

        return {
            link,
            owner,
            likes,
            likeIcon,
            changePermission,
            assetDetailHandler,

            DoLike,
            HandleAssetDetail,
        };
    }
})