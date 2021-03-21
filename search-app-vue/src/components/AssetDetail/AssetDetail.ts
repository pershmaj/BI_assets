import api from "@/api";
import { fileData, fileUpload } from "@/file-upload";
import { Asset } from "@/interfaces";
import noty from "@/noty";
import { computed, defineComponent, reactive } from "@vue/runtime-core";
import axios from "axios";
import { ref } from "vue";


export default defineComponent({
    props: {
        asset: {
            type: Object as () => Asset,
            required: true,
        },
    },
    setup(props, {emit}) {

        const name = ref(props.asset.name);

        const newphoto = reactive({
            file: {} as File,
            image: '' as string | ArrayBuffer,
        })

        const link = computed(() => {
            if(!newphoto.image) {
                return `${api.host}/assets/${props.asset.link}`;
            } else {
                return newphoto.image;
            }
        });

        

        async function onFileChange(photo: Event) {
            if (photo.target) {
                const input = photo.target as HTMLInputElement;
                if (input.files && input.files.length) {
                    const files = input.files;
                    if (files.item(0)) {
                        newphoto.file = files.item(0)!;
                        newphoto.image = await fileData(newphoto.file);
                    }
                }
            }
        }

        async function SaveAsset() {
            const url = api.host+api.urls.updateAsset(props.asset.id);
            try {
                const data = await fileUpload(
                    newphoto.image.toString(), 
                    name.value, 
                    'asset', 
                    url, 
                    'put')
                const body = await data.json();
                console.log(body)
                emit('close', false)
                noty.success('Asset upload', body.message)
            } catch(e) {
                console.error(e)
            }
            
            
        }

        return {
            name,
            link,

            onFileChange,
            SaveAsset,
        }
    }
})