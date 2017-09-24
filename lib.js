module.exports = function(){
    var method = {};

    method["getFullDate"] = function(format, value){
        var val_date = Date.now();
        if (typeof value !== "undefined")
            val_date = value;
            
        var obj_date = new Date(val_date);
        
        if(format==null || typeof format === "undefined"){
            return obj_date;
        }
        

        var year = obj_date.getFullYear();
        var month = obj_date.getMonth();
        var day = obj_date.getDate();
        var iDay = obj_date.getDay();
        var hour = obj_date.getHours();
        var minute = obj_date.getMinutes();
        var second = obj_date.getSeconds();
        var array_format = format.split('');

        var array_day = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
        var array_month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        var preg = {
            "d":function(){
                if(day < 10){
                    return "0"+day;
                }else{
                    return day;
                }
            },
            "D":function(){
                return array_day[iDay].slice(0,3);
            },
            "j":function(){
                return day;
            },
            "l":function(){
                return array_day[iDay];
            },
            "N":function(){
                return iDay+1;
            },
            "F":function(){
                return array_month[month];
            },
            "m":function(){
                var tmp_month = month+1;
                if(tmp_month < 10){
                    return "0"+tmp_month;
                }else{
                    return tmp_month;
                }
            },
            "M":function(){
                return array_month[month].slice(0,3);
            },
            "n":function(){
                var tmp_month = month+1;
                return tmp_month;
            },
            "Y":function(){
                return year;
            },
            "y":function(){
                return year.slice(-2,2);
            },
            "G":function(){
                if(hour < 10){
                    return "0"+hour;
                }else{
                    return hour;
                }
            },
            "H":function(){
                return hour;
            },
            "i":function(){
                if(minute < 10){
                    return "0"+minute;
                }else{
                    return minute;
                }
            },
            "s":function(){
                if(second < 10){
                    return "0"+second;
                }else{
                    return second;
                }
            },
            "f":function(){
                return obj_date.getTime();
            }
        };
        var return_date = [];
        for(var i = 0; i<array_format.length; i++){
            if(typeof preg[array_format[i]] !== "undefined"){
                return_date[i] = preg[array_format[i]]();
            }else{
                return_date[i] = array_format[i];
            }
        }
        return return_date.join('');
    };

    return method;
};