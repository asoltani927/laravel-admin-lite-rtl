export const mobileNumber = (value) => {
    if(value.length <= 0)
        return true;
    return !(new RegExp(/^0?9[0-9]{9}$/).test(value) === true)
}

export const meliCodeNumber = (value) => {
    let result = true;
    if (value.length == 10) {
        if (value == '1111111111' || value == '0000000000' || value == '2222222222' || value == '3333333333' || value == '4444444444' || value == '5555555555' || value == '6666666666' || value == '7777777777' || value == '8888888888' || value == '9999999999') {
            return false;
        }
        const c = parseInt(value.charAt(9));
        const n = parseInt(value.charAt(0)) * 10 + parseInt(value.charAt(1)) * 9 + parseInt(value.charAt(2)) * 8 + parseInt(value.charAt(3)) * 7 + parseInt(value.charAt(4)) * 6 + parseInt(value.charAt(5)) * 5 + parseInt(value.charAt(6)) * 4 + parseInt(value.charAt(7)) * 3 + parseInt(value.charAt(8)) * 2;
        const r = n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            result = true;
        } else {
            result = false;
        }
    } else {
        result = false;
    }
    return !result;
}

export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


export const persianToEnglishNum = (str) => {
    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    if(typeof str === 'string')
    {
        for(var i=0; i<10; i++)
        {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
}
