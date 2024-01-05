import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useUserStore from './user';
import useEditorStore from './editor';

const store = createPinia();
store.use(piniaPluginPersistedstate);

export { useUserStore, useEditorStore };
