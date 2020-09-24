/*
    实用函数,理论上不应有业务逻辑
*/
class Tools {
  constructor() {
    this.codeKeyTime = {}
  }
  // 克隆数据
  static clone(data) {
    if (!data) return data;
    return JSON.parse(JSON.stringify(data));
  }
  // 是否对象
  static isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  // 是否数组
  static isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  // 判断变量是否为空  true 空 false 有值  支持任何类型
  static isEmpty($var) {
    if ($var) {
      if (this.isArray($var)) {
        return !$var.length;
      } else if (this.isObject($var)) {
        for (const i in $var) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  // 简单对比(不对比长度)  true 相同 false 不同
  static compareEasy(oldData, newData, noCompare = []) {
    /*
    noCompare:无需对比的数据
    */
    // json对象
    if (this.isObject(oldData) && this.isObject(newData)) {
      for (const key in newData) {
        // 无需对比
        if (noCompare.includes(key)) {
          continue;
        }
        if (!this.compareDeep(newData[key], oldData[key])) {
          // 如果数组元素中具有不相同元素,返回false
          return false;
        }
      }
    } else if (this.isArray(oldData) && this.isArray(oldData)) { // 数组
      for (let i = 0, length = newData.length; i < length; i++) {
        if (!this.compareDeep(newData[i], oldData[i])) {
          // 如果数组元素中具有不相同元素,返回false
          return false;
        }
      }
    }
    return true
  }
  // 深度对比
  static compareDeep(oldData, newData) {
    // 数据相同
    if (oldData === newData) {
      return true;
    }
    // 都是对象且长度相同
    if (this.isObject(oldData) && this.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
      // 遍历所有对象中所有属性,判断元素是否相同
      for (const key in oldData) {
        if (this.isset(oldData[key])) {
          if (!this.compareDeep(oldData[key], newData[key])) { // 递归对比
            // 对象中具有不相同属性 返回false
            return false
          }
        }
      }
    } else if (this.isArray(oldData) && this.isArray(oldData) && oldData.length === newData.length) { // 都是数组且长度相同
      // 遍历数组中所有元素,判断元素是否相同
      for (let i = 0, length = oldData.length; i < length; i++) {
        if (!this.compareDeep(oldData[i], newData[i])) {
          // 如果数组元素中具有不相同元素,返回false
          return false
        }
      }
    } else {
      // 其它均返回false
      return false
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true
  }
  // 深度合并对象
  static objectAssignDeep(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
      FirstOBJ[key] = (FirstOBJ[key] && this.isObject(FirstOBJ[key]))
        ? this.objectAssignDeep(FirstOBJ[key], SecondOBJ[key]) : SecondOBJ[key];
    }
    return FirstOBJ;
  }
  static dateToString(timestamp = 0, format = 'Y-m-d H:i:s') {
    format = format.toLowerCase();
    if (!timestamp) {
      timestamp = new Date().getTime();
    }
    if (typeof timestamp == 'string') {
      timestamp = new Date(timestamp).getTime() || timestamp * 1;
    } else if (typeof timestamp == 'object') {
      timestamp = timestamp.getTime();
    }
    if (timestamp && timestamp.toString().length <= 10) timestamp = timestamp * 1000;

    const jsDate = ((timestamp) ? new Date(timestamp) : new Date());
    const year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let date = jsDate.getDate();
    let hour = jsDate.getHours();
    let minute = jsDate.getMinutes();
    let second = jsDate.getSeconds();
    month = month >= 10 ? month : '0' + month;
    date = date >= 10 ? date : '0' + date;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;
    return format.replace('y', year).replace('m', month).replace('d', date).replace('h', hour).replace('i', minute).replace('s', second);
  }
  // 获取时间戳
  static getTimestamp(data = new Date()) {
    if (!data) return 0;
    if (typeof data == 'object') {
      return data.getTime();
    }
    return new Date(data).getTime();
  }
  static split(data = '', str = ',') {
    return data.split(str).filter(item => item);
  }
  // 反转数据
  static reverseData(data = {}) {
    if (this.isArray(data)) { // Array
      return data.reverse();
    } else if (this.isObject(data)) { // Object
      const keys = Object.keys(data);
      keys.reverse();
      const newObj = {};
      for (const item of keys) {
        newObj[item] = data[item];
      }
      return newObj;
    }
    return data;
  }
  // 获取两个多选之间的间隔数据
  static getMultipleIntervalData(checkeds, allData, config = {}) {
    /*
      checkeds: 已选id数组
      allData: 所有数据
    */
    const configDef = {
      key: 'id', // 取值key
      nowData: '', // 当前数据
      returnType: 'data' // 返回类型: data/value/index
    }
    config = this.objectAssignDeep(configDef, config);
    const { key, returnType } = config;
    const nowData = config.nowData || checkeds[checkeds.length - 1];
    const returnArr = []; // 最后返回的数组

    if (checkeds.length < 2 || checkeds.length >= allData.length) {
      return returnArr;
    }

    let nowIndex = -1; // 当前被选中的index
    let beforeIndex = -1; // 前一个被选中的index
    let item = {};
    // get nowIndex or beforeIndex
    for (let i = 0; i < allData.length; i++) {
      item = allData[i];
      if (item[key] == nowData) {
        nowIndex = i;
        break;
      }
      if (checkeds.includes(item[key] + '')) {
        beforeIndex = i
      }
    }
    // 有上一个被选中且间距大于1
    if (beforeIndex > -1 && (nowIndex - beforeIndex > 1)) {
      for (let i = beforeIndex + 1; i < nowIndex; i++) {
        if (returnType == 'data') {
          returnArr.push(allData[i]);
        } else if (returnType == 'value') {
          returnArr.push(allData[i][key]);
        } else {
          returnArr.push(i);
        }
      }
    }
    return returnArr;
  }
  // 按照字段排序
  static sortByField(list, field, order = 'desc') {
    if (list && list.length) {
      list.sort(function(a, b) {
        if (order == 'desc') {
          return b[field] - a[field];
        } else {
          return a[field] - b[field];
        }
      });
    }
    return list;
  }
  // 生成 随机字符串
  static rand_id(length = 12) {
    let id = '';
    const len = length;
    if (len > 0) {
      // 0-25=A-Z  ,  26-51=a-z  ,  52-61=0-9
      const char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const first = char[this.randomNum(0, 51)];
      let next = '';
      for (let i = 0; i < (len - 3); i++) {
        next += char[this.randomNum(0, 61)];
      }
      id += first + next + this.randomNum(10, 99);
    }
    return id;
  }
  // 生成 指定区间内的随机数
  static randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  }
  // 抛出错误 并阻断执行
  static error(msg = '', code = 400, data = '') {
    const obj = { code: code, msg: msg, data: data };
    throw obj;
  }

  // 判断是否在数组内 支持数组对象
  static inArray(val, arr, field) {
    if (arr && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        if (field) {
          if (this.isset(arr[i][field]) && arr[i][field] == val) return i + 1;
        } else {
          if (arr[i] == val) return i + 1;
        }
      }
    }
    return false;
  }
  // 获取数组对象内的某个key的值 返回数组
  static arrayColumn(data, filed, key = null) {
    const newData = key ? {} : [];
    if (data) {
      for (const i in data) {
        if (key) {
          if (filed === null) {
            newData[key] = (data[i]);
          } else {
            newData[key] = (data[i][filed] || '');
          }
        } else {
          newData.push((data[i][filed] || ''));
        }
      }
    }
    return newData;
  }
  /**
   * 根据字段修改数组对象的字段
   * data 被修改的数组
   * infoData 参考修改的对象
   * fieldKeys 需要修改的字段
   * field 对比匹配的字段
   * level 递归层级 （次数）
   */
  static arrayUpdate(data = [], infoData = null, fieldKeys = [], field = 'str_id', level = 1) {
    if (level == 0) return [];
    level--;
    if (!infoData) return data;
    const info = this.clone(infoData);
    if (data && data.length && !this.isEmpty(info)) {
      for (const i in data) {
        if (level && data[i].list && data[i].list.length) { // 递归去找替换
          this.arrayUpdate(data[i].list, infoData, fieldKeys, field, level);
        }
        if (this.isset(data[i][field]) && this.isset(info[field]) && data[i][field] == info[field]) {
          if (this.isArray(fieldKeys)) {
            for (const j in info) {
              if (typeof data[i][j] != 'undefined' && j != field && fieldKeys.length && fieldKeys.indexOf(j) >= 0) {
                if (this.isArray(info[j])) data[i][j] = [];
                if (this.isObject(info[j])) data[i][j] = {};
                data[i][j] = info[j];
              }
            }
          } else if (fieldKeys == 'del') {
            data.splice(i, 1);
          } else if (fieldKeys == 'replace') {
            data.splice(i, 1, info);
          }
          return data;
        }
      }
    }
    return data;
  }
  /**
   * 修改对象 的数据
   * @param {Object} data   被修改的对象
   * @param {Object} infoData 修改的数据
   * @param {Object} fieldKeys  要修改的字段 null 所有
   */
  static objectUpdate(data, infoData, fieldKeys = null) {
    if (fieldKeys === null) fieldKeys = Object.keys(fieldKeys);
    if (!infoData) return data;
    const info = this.clone(infoData);
    if (info && data) {
      for (const j in info) {
        if (typeof data[j] != 'undefined' && fieldKeys.length && fieldKeys.indexOf(j) >= 0) {
          if (this.isArray(info[j])) data[j] = [];
          if (this.isObject(info[j])) data[j] = {};
          data[j] = info[j];
        }
      }
    }
    return data;
  }
  // 判断变量是否 存在
  static isset($var) {
    const type = typeof $var;
    if (type == 'undefined' || type == 'NaN') {
      return false;
    }
    return true;
  }
  /**
   * 过滤对象指定key
   */
  static arrayInitKeys($input, $keys = [], $isKey = true) {
    const $data = $isKey ? {} : [];
    if ($keys) {
      for (const i in $keys) {
        const $k = $keys[i];
        let $info = '';
        if (this.isset($input[$k])) $info = $input[$k];
        if ($info === null) $info = '';
        $isKey ? $data[$k] = $info : $data.push($info);
      }
    }
    return $data;
  }
  /**
   * 判断对象是否有指定key
   */
  static hasKey(obj = {}, key = '') {
    for (const key1 in obj) {
      if (key1 === key) {
        return true;
      }
    }
    return false;
  }
  /**
   * 修改对象key
   */
  static editKey(obj = {}, keyMap = {}) {
    // key转换
    for (const key in obj) {
      if (this.hasKey(keyMap, key)) { // 需要转换
        const newKey = keyMap[key];
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    return obj;
  }
  // 替换字符串里的数据
  static replaceStr(data = '', f = '', e = '') {
    const reg = new RegExp(f, 'g'); // 创建正则RegExp对象
    return data.replace(reg, e);
  }
  // 字符串与query对象互转
  static querystrToObj(data = '') {
    let returnData = '';

    if (typeof data == 'string') {
      returnData = {};
      data.split('&').map(item => {
        const items = item.split('=')
        returnData[items[0]] = +items[1] == items[1] ? +items[1] : decodeURIComponent(items[1]);
      })
    } else if (this.isObject(data)) {
      for (const key in data) {
        if (returnData) {
          returnData += '&'
        }
        returnData += `${key}=${data[key]}`;
      }
    }

    return returnData;
  }
  // 从index数组里获取对象
  static getItemInIndexArr(arr = [], indexArr = [], childrenKey = '') {
    const item = arr[indexArr[0]];
    if (!item) {
      return {}
    }
    // 子数组
    const childrenArr = childrenKey ? childrenArr[childrenArr] : (item.children || item.member);
    if (childrenArr && (indexArr[1] || indexArr[1] === 0) && childrenArr[indexArr[1]]) {
      return this.getItemInIndexArr(childrenArr, indexArr.slice(1)); // 向下递归
    } else {
      return item;
    }
  }
  // 简单对象数组(只保留某些字段)
  static simpleObjectArray(list = [], keys = []) {
    list = this.clone(list);
    const newList = [];
    let newObj = {}
    for (const item of list) {
      newObj = {};
      for (const key of keys) {
        newObj[key] = item[key]
      }
      newList.push(newObj);
    }
    return newList;
  }
  // 根据特定符号截取字符串
  static spliceStrToType(data = '', len = 1, str = ',') {
    // data: 数据; len: 截取长度; str: 分割符号
    if (!len || !data) return data;
    data = data.split(str).filter(item => item); // 转为数组
    data = data.slice(0, len).join(str); // 截取后转回
    return data;
  }
  // 前往新的页面
  static toPage(href = '', isOpen = true) {
    if (isOpen) {
      // window.open(href); 这样写不会被拦截
      const win = window.open();
      win.location.href = href;
    } else {
      window.location = href
    }
  }
  // 获取最大值
  static getMaxValue(data = {}, valueKey = '') {
    /*
    * data: 取值对象
    * valueKey: 取值key
    */
    let max = 0;
    if (!valueKey) return max;

    for (const key in data) {
      const value = data[key][valueKey] * 1;
      if (value > max) {
        max = value
      }
    }
    return max;
  }
  //延迟代码执行
  static codeDelayRun(callBack = null, key = '', time = 500) {
      const codeKeyTime = this.codeKeyTime;
      if (codeKeyTime[key]) {
          clearTimeout(codeKeyTime[key]);
          codeKeyTime[key] = null;
      }
      if (callBack) {
          codeKeyTime[key] = setTimeout(function() {
              callBack();
          }, time);
      }
  }
}
export default Tools;
