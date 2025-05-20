import { useRouter } from "vue-router";
import 'preline/preline'

export default defineNuxtPlugin(() => {
    if (process.client) {
        setTimeout(() => {
            window.HSStaticMethods?.autoInit();
        });
    }
});