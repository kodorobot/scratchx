/*
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function(ext) {
	
    var isConnected = false;
	var sensor_data = {};
    var poll_request = setInterval(send_poll, 30);

    ext._getStatus = function () {
        if (isConnected) return { status: 2, msg: 'Okay' };
        if (!isConnected) return { status: 1, msg: 'no product is running' };
    };
	
    ext._shutdown = function() {
        if (poll_request) {
          clearInterval(poll_request);
          poll_request = null;
        }
  };
  
    ext.connect = function () {

    }
	
    ext.slider = function(){
        return sensor_data["slider"];
	}
    
    ext.button = function(){
        return sensor_data["button"];
	}
    
    ext.light = function(){
        return sensor_data["light"];
	}
    
    ext.sound = function(){
        return sensor_data["sound"];
	}
    
    ext.resistance_A = function(){
        return sensor_data["resistance-A"];
	}
    
    ext.resistance_B = function(){
        return sensor_data["resistance-B"];
	}
    
    ext.resistance_C = function(){
        return sensor_data["resistance-C"];
	}
    
    ext.resistance_D = function(){
        return sensor_data["resistance-D"];
	}
    
    ext.getbool = function(type){
        var type = "getbool/" + type;
		var value = sensor_data[type];
		return value;
	}
    
    ext.getvalue = function(type){
        var type = "getvalue/" + type;
		var value = sensor_data[type];
		return value;
	}
    
    ext.s0 = function(){
        return replaceAll(sensor_data["s0"], "%25", "%");
	}
	
    ext.s1 = function(){
        return replaceAll(sensor_data["s1"], "%25", "%");
	}
	
    ext.sensor_update_scratch = function(ip, key, value){
        value = replace(value)
        send("/sensor_update_scratch/" + "/" + ip + "/" + key + "/" + value);
	}
	
    ext.sensor_update = function(key, value){
        value = replace(value)
        send("/sensor_update/" + "/" + key + "/" + value);
	}
	
    ext.HTTPvalue = function(){
        if(sensor_data["HTTPvalue"] == "true")
            return true;
        else
            return false;
	}
    
    ext.HTTPvalue_number = function(){
        return sensor_data["HTTPvalue_number"];
	}
    
    ext.HTTPvalue_processed = function(){
        return replaceAll(sensor_data["HTTPvalue_processed"], "%25", "%");
	}
    
    ext.HTTPvalue_last = function(){
        return replaceAll(sensor_data["HTTPvalue_last"], "%25", "%");
	}
    
    ext.HTTP_allkeyValue = function(){
        return sensor_data["HTTP_allkeyValue"];
	}
    
    ext.HTTP_keyValue = function(){
        return sensor_data["HTTP_keyValue"];
	}
	
    ext.httpPOST = function(url){
        url = replace(url)
        send("/httpPOST/" + url);
	}
	
    ext.httpGET_type = function(type, url){
        url = replace(url)
        send("/httpGET_type/" + type + "/" + url);
	}
    
    ext.httpGET_database = function(type, value){
        send("/httpGET_database/" + type + "/" + value);
	}
    
    ext.jsonDataSelect_thingspeak = function(type, value){
        send("/jsonDataSelect_thingspeak/" + type + "/" + value);
	}
    
    ext.jsonDataSelect = function(type, value){
        send("/jsonDataSelect/" + type + "/" + value);
	}
    
    ext.jsonDataSelect_section = function(type, value){
        send("/jsonDataSelect_section/" + type + "/" + value);
	}
	
    ext.keyFind = function(){
        send("/keyFind/");
	}
    
    ext.keySelect = function(url){
        send("/keySelect/" + url);
	}
    
    ext.datavalue = function(){
        return sensor_data["datavalue"];
    }
    
    ext.datavalue_line = function(){
        return sensor_data["datavalue_line"];
    }
    
    ext.opendata = function(value){
        send("/opendata/" + value);
    }
    
    ext.opendata_line = function(value, num){
        send("/opendata_line/" + value + "/" + num);
    }
    
    ext.writedata = function(input, value){
        value = replace(value)
        send("/writedata/" + input + "/" + value);
    }
    
    ext.appenddata = function(input, value){
        value = replace(value)
        send("/appenddata/" + input + "/" + value);
    }
    
    ext.open_notepad = function(value){
        send("/open_notepad/" + value);
    }
    
    ext.openBrowser = function(url){
        url = replace(url)
        send("/openBrowser/" + url);
    }
    
    ext.ifttt_maker = function(eventname, key, value1, value2, value3){
        value1 = replace(value1)
        value2 = replace(value2)
        value3 = replace(value3)
        send("/ifttt_maker/" + eventname + "/" + key + "/" + value1 + "/" + value2 + "/" + value3);
    }
    
    ext.fbchat_status = function(){
        return sensor_data["fbchat_status"];
    }
    
    ext.fbchat_message = function(){
        return replaceAll(sensor_data["fbchat_message"], "%25", "%");
    }
    
    ext.fbchat_login = function(account, pass){
        send("/fbchat_login/" + account + "/" + pass);
    }
    
    ext.fbchat_send_word = function(account, pass){
        pass = replace(pass)
        send("/fbchat_send_word/" + account + "/" + pass);
    }
    
    ext.fbchat_send_pic = function(account, url, word){
        url = replace(url)
        word = replace(word)
        send("/fbchat_send_pic/" + account + "/" + url + "/" + word);
    }
    
    ext.fbchat_get_message = function(account, pass){
        send("/fbchat_get_message/" + account + "/" + pass);
    }
		
    function send(cmd) {
        //connection.send(cmd);
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:50209" + cmd, true);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                console.log(http.responseText);
            }
        }
        http.send();
    }
    
	
    function send_poll() {
        var http = new XMLHttpRequest();
        http.open("GET", "http://127.0.0.1:50209/poll", true);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.responseText.length != 0){
                    if (!isConnected) isConnected = true;
                    var sensor = http.responseText.split("\n");
                    for(var i = 0;i < sensor.length;i++) sensor_data[sensor[i].split(" ")[0].toString()] = sensor[i].split(" ")[1];
                }
                else isConnected = false;
            }
        }
        http.send();
    }
    
    function replace(value){
        value = replaceAll(value,"/","%2F")
        value = replaceAll(value,"&","%26")
        value = replaceAll(value,"?","%3F")
        value = replaceAll(value,"=","%3D")
        return value;
    }
	
    function replaceAll(str, find, replace) {
        while(str.indexOf(find) >= 0) { str = str.replace(find, replace); }
    return str;
}

    var descriptor = {
        blocks: [
            [ "r", "slider", "slider" ],
            [ "r", "button", "button" ],
            [ "r", "light", "light" ],
            [ "r", "sound", "sound" ],
            [ "r", "resistance-A", "resistance_A" ],
            [ "r", "resistance-B", "resistance_B" ],
            [ "r", "resistance-C", "resistance_C" ],
            [ "r", "resistance-D", "resistance_D" ],
            [ "b", "sensor %m.booleanSensor?", "getbool", "button pressed" ],
            [ "r", "%m.sensor sensor value", "getvalue", "slider" ],
            ["r", "資料", "datavalue"],
            ["r", "資料行數", "datavalue_line"],
            [" ", "讀取本機資料 從 %s", "opendata", "temp.txt"],
            [" ", "讀取本機資料 從 %s 第 %n 行", "opendata_line", "temp.txt", 1],
            [" ", "儲存資料 %s 在 %s", "writedata", "", "temp.txt"],
            [" ", "附加資料 %s 在 %s", "appenddata", "", "temp.txt"],
            [" ", "開啟檔案 %s", "open_notepad", "temp.txt"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            [" ", "send %s value %n", "sensor_update", "temp", 255],
            [" ", "向ip: %s 傳送變數 %s 值 %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
            [" ", "開啟網頁 %s", "openBrowser", "http://www.kodorobot.com"],
            ["b", "資料庫連接", "HTTPvalue"],
            ["r", "雲端資料", "HTTPvalue_processed"],
            ["r", "最後一筆", "HTTPvalue_last"],
            ["r", "雲端資料筆數", "HTTPvalue_number"],
            ["r", "可使用的欄位", "HTTP_allkeyValue"],
            ["r", "選擇的欄位", "HTTP_keyValue"],
            [" ", "HTTP POST 資料 %s", "httpPOST", "https://api.thingspeak.com/update?api_key=<api_key>&field1=<value>"],
            [" ", "HTTP GET 資料 類型:%m.type 從 %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json?results=8000"],
            [" ", "HTTP GET 資料庫:%m.database channel ID: %s", "httpGET_database", "thingspeak", ""],
            [" ", "雲端資料選擇 欄位:%s 第 %n 筆的剖析資料", "jsonDataSelect", "field1", "1"],
            [" ", "選擇 第 %n 筆到第 %n 筆的剖析資料", "jsonDataSelect_section", "1", "10"],
            [" ", "剖析可使用欄位", "keyFind"],
            [" ", "選擇第 %n 筆欄位", "keySelect", "1"],
            [" ", "IFTTT傳送事件 事件名: %s key: %s 值1: %s 值2: %s 值3: %s", "ifttt_maker", "event", "key", "", "", ""],
            ["r", "狀態", "fbchat_status"],
            ["r", "訊息", "fbchat_message"],
            [" ", "登入fb 帳號: %s 密碼: %s", "fbchat_login", "帳號", "密碼"],
            [" ", "向id: %s 傳送訊息: %s", "fbchat_send_word", "id", "訊息"],
            [" ", "向id: %s 傳送圖片 網址: %s 訊息: %s", "fbchat_send_pic", "id", "網址", "訊息"],
            [" ", "取得與id: %s 的最後第 %n 筆訊息", "fbchat_get_message", "id", 1]
		],
        menus: {
            booleanSensor: [ "button pressed", "A connected", "B connected", "C connected", "D connected" ],
            sensor: [ "slider", "light", "sound", "resistance-A", "resistance-B", "resistance-C", "resistance-D" ],
            type: ["raw", "json_thingspeak", "json_opendata", "json_google"],
            key: ["field1", "field2"],
            database: ["thingspeak"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('Picoboard_net', descriptor, ext);


})({});