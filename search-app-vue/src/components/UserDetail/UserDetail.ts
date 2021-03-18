import { User } from "@/interfaces";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        user: {
            type: Object as () => User,
            required: true,
        },
    },
    setup(props, ctx) {
        return {
            
        }
    }
})