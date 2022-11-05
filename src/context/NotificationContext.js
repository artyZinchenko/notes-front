import { createContext } from 'react'

const NotificationContext = createContext({
  notification: null,
  setNotification: () => {},
})

export default NotificationContext
