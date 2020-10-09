import Tools from './Tools'
/*
    需要挂载到app的函数
*/
class Common {
  testFun() { return '' }
}
Object.assign(Common.prototype, {
  clone: Tools.clone,
  isObject: Tools.isObject,
  isArray: Tools.isArray,
  isEmpty: Tools.isEmpty,
  compareEasy: Tools.compareEasy,
  compareDeep: Tools.compareDeep,
  objectAssignDeep: Tools.objectAssignDeep,
  dateToString: Tools.dateToString,
  getTimestamp: Tools.getTimestamp,
  split: Tools.split,
  reverseData: Tools.reverseData
});
export default Common;