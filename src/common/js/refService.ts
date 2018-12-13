let refBox: any = {}

function setRefBox(key: string, value: any) {
  refBox[key] = value
}

function getRef(key: string) {
  if(refBox[key] !== undefined) {
    return refBox[key]
  } else {
    console.log('该ref不存在！')
    return null
  }
}

export default {
  setRefBox,
  getRef
}