import  beautify from "json-beautify";

function JSONize(str: string) {
    return (eval('('+str+')'))       
  }

export function strToJson(inputStr: string) {
    try {
        let j = JSONize(inputStr);
        return j;
    } catch (e) {
        console.log("parse error", e);
        throw inputStr+ " is not valid JSON or object";
    }
    // return null;
}

export function toOneLineJSON(inputStr: string) {
    try {
        console.log("inputstr",inputStr)
        let j = strToJson(inputStr);
        return JSON.stringify(j);
    }
    catch (e) {
        console.log("parse error", e);
    }
    return inputStr;
  }

export function beautifyJSON(inputStr: string, space: string|number|null=null) {
    console.log(space)
    if (space==null) {
        space = 2;
    }
    if (!Number.isNaN(Number(space))) {
        space = Number(space);
    }
    try{
        console.log("input", inputStr)
        let j = strToJson(inputStr);
        return beautify(j, null as any, space, 80)
    }
    catch (e) {
        console.log("parse error", e);
    }
    return inputStr
}