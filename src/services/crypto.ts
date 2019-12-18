const CryptoJS = require('crypto-js')
const bigInt = require('big-integer')
const { Buffer } = require('buffer')

const iv = CryptoJS.enc.Utf8.parse('0102030405060708')
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
const nonce = '0CoJUm6Qyw8W8jud'
const pubKey = '010001'

function aesEncrypt(msg: string, secKey: string) {
  return CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(secKey), { iv }).toString()
}

function rsaEncrypt(msg: string, exponent: string, modules: string) {
  const radix = 16
  const buffer = bigInt(new Buffer(
      msg.split('').reverse().join('')
  ).toString('hex'), radix)
  var rest = buffer.modPow(
      bigInt(exponent, radix),
      bigInt(modulus, radix)
  ).toString(radix)
  while (rest.length < 256) rest = '0' + rest
  return rest
}

export function md5Encrypt(msg: string) {
  return CryptoJS.MD5(msg).toString(CryptoJS.enc.Hex)
}

function createSecretKey(size: number) {
  const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var key = ''
  for (var i = 0; i < size; i++) {
    var pos = Math.floor(Math.random() * base62.length)
    key = key + base62.charAt(pos)
  }
  return key
}

export function encryptedData (data: Object) {
  const secKey = createSecretKey(16)
  const encBody = {
      params: aesEncrypt(aesEncrypt(JSON.stringify(data), nonce), secKey),
      encSecKey: rsaEncrypt(secKey, pubKey, modulus)
  }
  return encBody
}