import * as crypto from 'crypto'

const algorithm = 'MD5'

const calculateMD5 = (object: any) => {
  const md5 = crypto.createHash(algorithm).update(getData(object)).digest('hex')
  return md5
}

const getData = (object: any) => {
  const keys = Object.keys(object)
  let data = undefined
  for (const key of keys) {
    data = data + object[key]
  }
  return data
}

export default calculateMD5
