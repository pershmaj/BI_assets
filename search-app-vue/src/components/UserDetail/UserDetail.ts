import { User } from "@/interfaces";
import { computed, defineComponent, reactive, toRefs } from "@vue/runtime-core";
import Modal from '@/components/Modal/Modal.vue'
import store from "@/store";
import AssetItem from "@/components/AssetItem/AssetItem.vue"
import { fileData } from "@/file-upload";
import noty from "@/noty";

export default defineComponent({
    components: {
        Modal,
        AssetItem,
    },
    setup(props, ctx) {

        const form = reactive({
            nickname: store.state.nickname,
            previousPassword: '',
            password1: '',
            password2: '',
        });

        const asset = reactive({
            name: '',
            file: {
                file: {} as File,
                image: '' as string | ArrayBuffer,
            }
        });

        async function onFileChange(photo: Event) {
            if (photo.target) {
                const input = photo.target as HTMLInputElement;
                if (input.files && input.files.length) {
                    const files = input.files;
                    if (files.item(0)) {
                        asset.file.file = files.item(0)!;
                        asset.file.image = await fileData(asset.file.file);
                    }
                }
            }
        }

        function UpdateUser() {
            if(form.password1 !== form.password2) {
                noty.error('Cannot update profile', 'Passwords doesnt match');
                return;
            }

            const params = {
                nickname: form.nickname && form.nickname !== store.state.nickname ? form.nickname : undefined,
                previousPassword: form.previousPassword,
                password1: form.password1,
                password2: form.password2,
            };
            store.dispatch('UpdateUser', params);
        }

        async function CreateAsset() {
            if(!asset.name) {
                noty.error('Creating asset', 'Set asset name');
                return;
            }
            if(!asset.file?.image) {
                noty.error('Creating asset', 'Upload image');
                return;
            } 
            try {
                await store.dispatch('CreateAsset', {
                    asset: asset.file,
                    name: asset.name,
                });
                asset.file.file = {} as File;
                asset.file.image = '';
                asset.name = '';
            } catch(e) {
                console.error(e);
            }
            
        }

        const assets = computed(() => {
            return store.getters.OwnAssets;
        });
        
        
        return {
            ...toRefs(form),
            assets,
            asset,

            onFileChange,
            CreateAsset,
            UpdateUser,
        }
    }
})