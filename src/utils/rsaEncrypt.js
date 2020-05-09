import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7j+KjGbj8LYdqSnhHwLX1YotF\n' +
  '/ZFNNNMcGrlyRF3z7i73auGvzWUIKUHVlQBp7iih6RZ/GLeG9pe9dj+Do3V42Ms2\n' +
  'sG9MaOGFjpvjMGutjvJ2WWRE7DfiXCLVmU7ot4LxGXfvtZlbumifISa29HNWudVb\n' +
  '5HUgFMgz5qrOtf9gpwIDAQAB'

const privateKey = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALuP4qMZuPwth2pK\n' +
  'eEfAtfVii0X9kU000xwauXJEXfPuLvdq4a/NZQgpQdWVAGnuKKHpFn8Yt4b2l712\n' +
  'P4OjdXjYyzawb0xo4YWOm+Mwa62O8nZZZETsN+JcItWZTui3gvEZd++1mVu6aJ8h\n' +
  'Jrb0c1a51VvkdSAUyDPmqs61/2CnAgMBAAECgYAhJB9rqlPhWzoeMeJm60o7fZoW\n' +
  'V+OgvMDAqogyBJqFS4TI+v29zpEXjBKx5o4YKZjMYx8yfe+PzWqqc4ZtgCh1T+9w\n' +
  'Yxb4zQ/b4Opjr4QZ5FEa1/jp0vKojAoMd/jAI84obAYEDuxvOtaT7rqcvw5wbEaY\n' +
  'VXNUVz2H1CBN28BCwQJBAPgsOuv80L5NBmIDfuBervbsSuQFhhl2C0SRjCDhYrji\n' +
  'yNUOXUNgPXgY6TZ90Vgols3xuxyJ6SaDIYsOZcOPodkCQQDBekdRU+OoRC7dOZVZ\n' +
  'KeEjUiXzvVLxm6Z8OuGcZCXFtyTFMtVG+ISWMJxrntPjUWSxGyXGsDF61FifKtL4\n' +
  'qwZ/AkBHZEnq+0Z9iCDu7zx/hR1mESGWKPSjvG6PYiNijhPdRfgqOkCgEj58nwXv\n' +
  '1A/2AW8ofYKrOg0lNBHhM9oYgOg5AkAVu+i7CBNw2YfyLf/K7ltuHlJJGSFyJqwD\n' +
  'FJI3gUCE/1fQFy/CMzShsoA/zq26wW/wPT53HV/Rjn0OFD9y07N9AkAEpOlM00ZW\n' +
  'ItOagt3QFMMJZaXGQ/WNrEOFDS9iPWYOlEyOAdyBZ/myjF8wqoZlrf9YFv8+uYDZ\n' +
  'fQUtLqqa449x'


// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

