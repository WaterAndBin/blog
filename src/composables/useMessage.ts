import { createApp } from 'vue';
import type { App } from 'nuxt/dist/app/compat/capi';
import Message from '~/components/Message/index.vue';
import type { MessageData } from '~/types/message';

function useMessage(data: MessageData): void {
  const div = document.createElement('div');
  const length = document.getElementsByClassName('message').length;

  let app: App | null = null;
  if (typeof data === 'string') {
    app = createApp(Message, {
      message: data,
      length,
      onClick() {
        app?.unmount();
        div.remove();
      }
    });
  } else if (typeof data === 'object') {
    app = createApp(Message, {
      message: data.message,
      length,
      type: data.type,
      onClick() {
        app?.unmount();
        div.remove();
      }
    });
  }
  app?.mount(div);
}

export { useMessage };
