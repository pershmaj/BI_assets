import { Asset } from "@/interfaces";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    props: {
        asset: {
            type: Object as () => Asset,
            required: true,
        },
    },
    setup(props) {
        return {

        }
    }
})