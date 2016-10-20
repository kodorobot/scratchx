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
	
	
	ext.OutPinOn = function(pin){
		send("/OutPinOn/" + 0 + "/" + pin);
	}
	
	ext.OutPinOff = function(pin){
		send("/OutPinOff/" + 0 + "/" + pin);
	}
	
	ext.analogOutPin = function(pin,value){
		send("/analogOutPin/" + 0 + "/" + pin + "/" + value);
	}
	
	ext.MotorDirection = function(pin, way){
		send("/MotorDirection/" + 0 + "/" + pin + "/" + way);
	}
	
	ext.motoroff = function(pin){
		send("/motoroff/" + 0 + "/" + pin);
	}
	
	ext.motorangle = function(pin, angle){
		send("/motorangle/" + 0 + "/" + pin + "/" + angle);
	}
	
	ext.getbool = function(pin){
		var pin = "getbool/" + pin;
		var value = sensor_data[pin];
		return value;
	}
	
	ext.getvalue = function(pin){
		var pin = "getvalue/" + pin;
		var value = sensor_data[pin];
		return value;
	}
	
	ext.Analog0 = function(){
		return sensor_data["Analog0"];
	}
	
	ext.Analog0 = function(){
		return sensor_data["Analog0"];
	}
	
	ext.Analog1 = function(){
		return sensor_data["Analog1"];
	}
	
	ext.Analog2 = function(){
		return sensor_data["Analog2"];
	}
	
	ext.Analog3 = function(){
		return sensor_data["Analog3"];
	}
	
	ext.Analog4 = function(){
		return sensor_data["Analog4"];
	}
	
	ext.Analog5 = function(){
		return sensor_data["Analog5"];
	}
	
	ext.Digital2 = function(){
		return sensor_data["Digital2"];
	}
	
	ext.Digital3 = function(){
		return sensor_data["Digital3"];
	}
	
    ext.s0 = function(){
        return sensor_data["s0"];
	}
	
    ext.s1 = function(){
        return sensor_data["s1"];
	}
	
    ext.sensor_update_scratch = function(ip, key, value){
        send("/sensor_update_scratch/" + "/" + ip + "/" + key + "/" + value);
	}
	
    ext.sensor_update = function(key, value){
        send("/sensor_update/" + "/" + key + "/" + value);
	}
	
    ext.HTTPvalue = function(){
        return sensor_data["HTTPvalue"];
	}
    
    ext.HTTPvalue_number = function(){
        return sensor_data["HTTPvalue_number"];
	}
    
    ext.HTTPvalue_processed = function(){
        return sensor_data["HTTPvalue_processed"];
	}
    
    ext.HTTP_allkeyValue = function(){
        return sensor_data["HTTP_allkeyValue"];
	}
    
    ext.HTTP_keyValue = function(){
        return sensor_data["HTTP_keyValue"];
	}
	
    ext.httpPOST = function(url){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
        send("/httpPOST/" + url);
	}
	
    ext.httpGET_type = function(type, url){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
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
	
    ext.keyFind = function(){
        send("/keyFind/");
	}
    
    ext.keySelect = function(url){
        send("/keySelect/" + url);
	}
	
    ext.voicedata = function(){
        return decodeURI(sensor_data["voicedata"]);
	}
	
    ext.record = function(){
        send("/record");
	}
	
    ext.textovoice_tw = function(content){
        send("/textovoice_tw/" + content);
	}
	
    ext.textovoice_en = function(content){
        send("/textovoice_en/" + content);
	}
	
    ext.voiceSpeed = function(value){
        send("/voiceSpeed/" + value);
	}
	
    ext.voiceVolume = function(value){
        send("/voiceVolume/" + value);
	}
    
    ext.datavalue = function(){
        return sensor_data["datavalue"];
    }
    
    ext.opendata = function(value){
        send("/opendata/" + value);
    }
    
    ext.opendata2 = function(value, num){
        send("/opendata2/" + value + "/" + num);
    }
    
    ext.writedata = function(input, value){
        send("/writedata/" + input + "/" + value);
    }
    
    ext.appenddata = function(input, value){
        send("/appenddata/" + input + "/" + value);
    }
    
    ext.open_notepad = function(value){
        send("/open_notepad/" + value);
    }
    
    ext.openBrowser = function(url){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
        send("/openBrowser/" + url);
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
	
    function replaceAll(str, find, replace) {
        while(str.indexOf(find) >= 0) { str = str.replace(find, replace); }
    return str;
	}

    var descriptor = {
        blocks: [
            ["r", "Analog0", "Analog0"],
			["r", "Analog1", "Analog1"],
			["r", "Analog2", "Analog2"],
			["r", "Analog3", "Analog3"],
			["r", "Analog4", "Analog4"],
			["r", "Analog5", "Analog5"],
			["r", "Digital2", "Digital2"],
			["r", "Digital3", "Digital3"],
			["r", "value of sensor %m.ValueOfSensor", "getvalue", "Analog0"],
			["b", "sensor %m.d2d3 pressed?", "getbool", "Digital2"],
			["w", "digital %m.digitalOutPin on", "OutPinOn", "13"],
			["w", "digital %m.digitalOutPin off", "OutPinOff", "13"],
			["w", "analog %m.analogOutPin value %n", "analogOutPin", "9", 255],
			["w", "motor  %m.MotorPin off", "motoroff", "8"],
			["w", "motor  %m.MotorPin direction %m.MotorDirection", "MotorDirection", "8", "clockwise"],
			["w", "motor  %m.MotorPin angle %n", "motorangle", "8", 180],
            ["r", "資料", "datavalue"],
            [" ", "讀取本機資料 從 %s", "opendata", "temp.txt"],
            [" ", "讀取本機資料 從 %s 第 %n 行", "opendata2", "temp.txt", 1],
            [" ", "儲存資料 %s 在 %s", "writedata", "", "temp.txt"],
            [" ", "附加資料 %s 在 %s", "appenddata", "", "temp.txt"],
            [" ", "開啟檔案 %s", "open_notepad", "temp.txt"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            [" ", "send %s value %n", "sensor_update", "temp", 255],
            [" ", "向ip: %s 傳送變數 %s 值 %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
            [" ", "開啟網頁 %s", "openBrowser", "http://www.kodorobot.com"],
            ["r", "雲端資料", "HTTPvalue"],
            ["r", "雲端資料筆數", "HTTPvalue_number"],
            ["r", "剖析資料", "HTTPvalue_processed"],
            ["r", "可使用的欄位", "HTTP_allkeyValue"],
            ["r", "選擇的欄位", "HTTP_keyValue"],
            [" ", "HTTP POST 資料 %s", "httpPOST", "https://api.thingspeak.com/update?api_key=<api_key>&field1=<value>"],
            [" ", "HTTP GET 資料 類型:%m.type 從 %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json"],
            [" ", "HTTP GET 資料庫:%m.database channel ID: %s", "httpGET_database", "thingspeak", ""],
            [" ", "thingspeak雲端資料選擇 欄位:%m.key 第 %n 筆的剖析資料", "jsonDataSelect_thingspeak", "field1", "1"],
            [" ", "雲端資料選擇 欄位:%s 第 %n 筆的剖析資料", "jsonDataSelect", "field1", "1"],
            [" ", "Data 剖析可使用的欄位", "keyFind"],
            [" ", "Data 剖析 第 %n 筆的欄位", "keySelect", "1"],
		],
        menus: {
            d2d3: ["Digital2", "Digital3"],
            ValueOfSensor: ["Analog0", "Analog1", "Analog2", "Analog3", "Analog4", "Analog5"],
            MotorDirection: ["clockwise", "anticlockwise"],
            digitalOutPin: ["13", "12", "11", "10"],
            MotorPin: ["8", "7", "4"],
            bodyPart: ["head", "shoulder", "elbow", "hand"],
            coordinate: ["x", "y", "z"],
            analogOutPin: ["9", "6", "5"],
            type: ["raw", "json_thingspeak", "json_opendata"],
            key: ["field1", "field2"],
            database: ["thingspeak"],

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('S4Aplus_net', descriptor, ext);


})({});