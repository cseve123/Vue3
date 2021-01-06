import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageProps = 'success' | 'error' | 'default'
function createMessage (message: string, type: MessageProps, timeout = 2000) {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // FIXME:怎么挂方法了???
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
