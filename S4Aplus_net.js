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
        if(value == "true") return true;
		else return false;
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
        var temp = replaceAll(sensor_data["s0"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
	}
	
    ext.s1 = function(){
        var temp = replaceAll(sensor_data["s1"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
	}
    
    ext.synchronous_key = function(){
        var temp = sensor_data["synchronous_key"];
        temp = replaceAll(temp, "%20", " ")
        temp = replaceAll(temp, "%2F", "/")
        return temp;
	}
	
    ext.sensor_update_scratch = function(ip, key, value){
        value = replace(value)
        send("/sensor_update_scratch/" + ip + "/" + key + "/" + value);
	}
	
    ext.sensor_update = function(key, value){
        send("/sensor_update/" + key + "/" + value);
	}
    
    ext.sensor_synchronous = function(ip, value){
        value = replace(value)
        send("/sensor_update/" + ip + "/" + value);
	}
    
    ext.clear_synchronous = function(){
        send("/clear_synchronous");
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
        var temp = replaceAll(sensor_data["HTTPvalue_processed"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
	}
    
    ext.HTTPvalue_last = function(){
        var temp = replaceAll(sensor_data["HTTPvalue_last"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
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
	
    ext.voicedata = function(){
        return sensor_data["voicedata"];
	}
	
    ext.record = function(time){
        send("/record/" + time);
	}
	
    ext.textovoice_tw = function(content){
        send("/textovoice_tw/" + content);
	}
	
    ext.textovoice_en = function(content){
        send("/textovoice_en/" + content);
	}
	
    ext.clear_voicedata = function(){
        send("/clear_voicedata");
	}
	
    ext.voiceVolume = function(value){
        send("/voiceVolume/" + value);
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
    
    ext.temp_data_firebase = function(){
        var temp = replaceAll(sensor_data["temp_data_firebase"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
    }
    
    ext.httpGET_firebase = function(account, name){
        send("/httpGET_firebase/" + account + "/" + name);
    }
    
    ext.httpPOST_firebase = function(account, name){
        send("/httpPOST_firebase/" + account + "/" + name);
    }
    
    ext.write_temp_data_firebase = function(key, value){
        value = replace(value)
        send("/write_temp_data_firebase/" + key + "/" + value);
    }
    
    ext.clear_data_firebase = function(){
        send("/clear_data_firebase");
    }
    
    ext.fbchat_status = function(){
        return sensor_data["fbchat_status"];
    }
    
    ext.fbchat_message = function(){
        var temp = replaceAll(sensor_data["fbchat_message"], "%25", "%")
        temp = replaceAll(temp, "%20", " ")
        return temp;
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
                    console.log(http.responseText)
                    var sensor = http.responseText.split("\n");
                    for(var i = 0;i < sensor.length;i++) sensor_data[sensor[i].split(" ")[0].toString()] = sensor[i].split(" ")[1];
                }
                else isConnected = false;
            }
        }
        http.send();
    }
    
    function replace(value){
        value = value.toString()
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
			[" ", "digital %d.digitalOutPin on", "OutPinOn", "13"],
			[" ", "digital %d.digitalOutPin off", "OutPinOff", "13"],
			[" ", "analog %d.analogOutPin value %n", "analogOutPin", "9", 255],
			[" ", "motor  %d.MotorPin off", "motoroff", "8"],
			[" ", "motor  %d.MotorPin direction %m.MotorDirection", "MotorDirection", "8", "clockwise"],
			[" ", "motor  %d.MotorPin angle %n", "motorangle", "8", 180],
            ["r", "data", "datavalue"],
            ["r", "amount of lines", "datavalue_line"],
            [" ", "read local data from %s", "opendata", "temp.txt"],
            [" ", "read local data from %s No.%n line", "opendata_line", "temp.txt", 1],
            [" ", "write data %s to %s", "writedata", "", "temp.txt"],
            [" ", "append data %s to %s", "appenddata", "", "temp.txt"],
            [" ", "open notepad %s", "open_notepad", "temp.txt"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            ["r", "synchronous device",  "synchronous_key"],
            [" ", "send %s value %s", "sensor_update", "s0", "255"],
            [" ", "To ip: %s send %s value %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
            [" ", "synchronous ip: %s send %s", "sensor_synchronous", "127.0.0.1:50209", "s0"],
            [" ", "clear synchronous device", "clear_synchronous"],
            [" ", "open browser %s", "openBrowser", "http://www.kodorobot.com"],
            ["r", "voice data", "voicedata"],
            [" ", "record %n second(s)", "record", 3],
            [" ", "%s to voice(Chinese)", "textovoice_tw", "文字"],
            [" ", "%s to voice(English)", "textovoice_en", "word"],
            [" ", "voice speed %d.speed", "voiceSpeed", 0],
            [" ", "voice volume %d.volume", "voiceVolume", 100],
            [" ", "clear voice data", "clear_voicedata"],
            ["b", "connecting status", "HTTPvalue"],
            ["r", "received data", "HTTPvalue_processed"],
            ["r", "the last data", "HTTPvalue_last"],
            ["r", "amount of received data", "HTTPvalue_number"],
            ["r", "valid key(ies)", "HTTP_allkeyValue"],
            ["r", "chosen key", "HTTP_keyValue"],
            ["r", "data preparing to send to firebase", "temp_data_firebase"],
            [" ", "HTTP POST data %s", "httpPOST", "https://api.thingspeak.com/update?api_key=<api_key>&field1=<value>"],
            [" ", "HTTP GET data type:%m.type from %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json?results=8000"],
            [" ", "HTTP GET database:%m.database channel ID: %s", "httpGET_database", "thingspeak", ""],
            [" ", "choose received data key:%s No.%n processed data", "jsonDataSelect", "field1", "1"],
            [" ", "select ranged form %n to %n processed data", "jsonDataSelect_section", "1", "10"],
            [" ", "process data", "keyFind"],
            [" ", "select key: %n", "keySelect", "1"],
            [" ", "IFTTT send event name: %s key: %s value1: %s value2: %s value3: %s", "ifttt_maker", "event", "key", "", "", ""],
            [" ", "firebase GET account: %s file: %s", "httpGET_firebase", "account", "file"],
            [" ", "firebase POST account: %s file: %s", "httpPOST_firebase", "account", "file"],
            [" ", "firebase write key: %s value: %s", "write_temp_data_firebase", "key", "value"],
            [" ", "firebase clear prepared data", "clear_data_firebase"],
            ["r", "status", "fbchat_status"],
            ["r", "message", "fbchat_message"],
            ["", "login fb account: %s password: %s", "fbchat_login", "account", "password"],
            ["", "To id: %s send message: %s", "fbchat_send_word", "id", "message"],
            ["", "To id: %s send picture url: %s message: %s", "fbchat_send_pic", "id", "url", "message"],
            ["", "Get from id: %s the last %n message", "fbchat_get_message", "id", 1]
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
            type: ["raw", "json_thingspeak", "json_opendata", "json_google", "json_firebase"],
            database: ["thingspeak"],

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('S4Aplus_net', descriptor, ext);


})({});