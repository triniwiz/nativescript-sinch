'use strict'
function toHashMap(obj) {
    let node = new java.util.HashMap();
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (obj[property] !== null) {
                switch (typeof obj[property]) {
                    case 'object':
                        node.put(property, toHashMap(obj[property], node));
                        break;
                    case 'boolean':
                        node.put(property, java.lang.Boolean.valueOf(String(obj[property])));
                        break;
                    case 'number':
                        if (Number(obj[property]) === obj[property] && obj[property] % 1 === 0)
                            node.put(property, java.lang.Long.valueOf(String(obj[property])));
                        else
                            node.put(property, java.lang.Double.valueOf(String(obj[property])));
                        break;
                    case 'string':
                        node.put(property, String(obj[property]));
                        break;
                }
            }
        }
    }
    return node;
};

exports.toHashMap = toHashMap;
function toJsObject(javaObj) {
    if (javaObj === null || typeof javaObj != "object") {
        return javaObj;
    }

    let node;
    switch (javaObj.getClass().getName()) {
        case 'java.lang.Boolean':
            return Boolean(String(javaObj));
        case 'java.lang.Long':
        case 'java.lang.Double':
            return Number(String(javaObj));
        case 'java.util.ArrayList':
            node = [];
            for (let i = 0; i < javaObj.size(); i++) {
                node[i] = toJsObject(javaObj.get(i));
            }
            break;
        default:
            node = {};
            let iterator = javaObj.entrySet().iterator();
            while (iterator.hasNext()) {
                let item = iterator.next();
                switch (item.getClass().getName()) {
                    case 'java.util.HashMap$HashMapEntry':
                        node[item.getKey()] = toJsObject(item.getValue());
                        break;
                    case 'java.lang.String':
                        node[item.getKey()] = String(item.getValue());
                        break;
                    case 'java.lang.Boolean':
                        node[item.getKey()] = Boolean(String(item.getValue()));
                        break;
                    case 'java.lang.Long':
                    case 'java.lang.Double':
                        node[item.getKey()] = Number(String(item.getValue()));
                        break;
                    default:
                        node[item.getKey()] = item.getValue();
                }
            }
    }
    return node;
};

exports.toJsObject = toJsObject;