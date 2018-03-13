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
	
    ext.l293d_dira = function(state, value){
        send("/l293d_dira/" + state + "/" + value);
	}
    
    ext.l293d_dirb = function(state, value){
        send("/l293d_dirb/" + state + "/" + value);
	}
	
    ext.three_color_led_red = function(value){
        send("/3_color_led_red/" + value);
	}
    
    ext.three_color_led_green = function(value){
        send("/3_color_led_green/" + value);
	}
    
    ext.three_color_led_blue = function(value){
        send("/3_color_led_blue/" + value);
	}
    
    ext.three_color_led_red2 = function(value){
        send("/3_color_led_red2/" + value);
	}
    
    ext.three_color_led_green2 = function(value){
        send("/3_color_led_green2/" + value);
	}
    
    ext.three_color_led_blue2 = function(value){
        send("/3_color_led_blue2/" + value);
	}
    
    ext.enableIR = function(){
        send("/enableIR");
	}
    
    ext.disableIR = function(){
        sensor_data["IR_data"] = "";
        send("/disableIR");
	}
	
    ext.play_tone = function(frequency, time){
        send("/play_tone/" + frequency + "/" + time);
	}

    ext.Tracker_Sensor_value1 = function(){
        return sensor_data["Tracker_Sensor_value1"];
	}
    
    ext.Tracker_Sensor_value2 = function(){
        return sensor_data["Tracker_Sensor_value2"];
	}
    
    ext.Tracker_Sensor_value3 = function(){
        return sensor_data["Tracker_Sensor_value3"];
	}
    
    ext.IR_data = function(){
        var temp = sensor_data["IR_data"];
        
        if (temp == "ff629d") temp = "up";
        else if(temp == "ffa857") temp = "down";
        else if(temp == "ff22dd") temp = "left";
        else if(temp == "ffc23d") temp = "right";
        else if(temp == "ff02fd") temp = "OK";
        else if(temp == "ff42bd") temp = "*";
        else if(temp == "ff52ad") temp = "#";
        else if(temp == "ff6897") temp = "1";
        else if(temp == "ff9867") temp = "2";
        else if(temp == "ffb04f") temp = "3";
        else if(temp == "ff30cf") temp = "4";
        else if(temp == "ff18e7") temp = "5";
        else if(temp == "ff7a85") temp = "6";
        else if(temp == "ff10ef") temp = "7";
        else if(temp == "ff38c7") temp = "8";
        else if(temp == "ff5aa5") temp = "9";
        else if(temp == "ff4ab5") temp = "0";
        
        return temp;
	}
    
    ext.distance = function(){
        return sensor_data["distance"];
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
        while(str.search(find) != -1) str = str.replace(find, replace);
    return str;
	}

    var descriptor = {
        blocks: [
            ["r", "Tracker sensor A1", "Tracker_Sensor_value1"],
            ["r", "Tracker sensor A2", "Tracker_Sensor_value2"],
            ["r", "Tracker sensor A3", "Tracker_Sensor_value3"],
            ["r", "Ir data", "IR_data"],
            ["r", "distance", "distance"],
            [" ", "L293D A side D4 status %m.state speed D5 %n", "l293d_dira", "forward", 0],
            [" ", "L293D B side D7 status %m.state speed D6 %n", "l293d_dirb", "forward", 0],
            [" ", "3 color LED red D9 analog output %n", "3_color_led_red", 0],
            [" ", "3 color LED green D10 analog output %n", "3_color_led_green", 0],
            [" ", "3 color LED blue D11 analog output %n", "3_color_led_blue", 0],
            [" ", "3 color LED red D9 digital output %d.high_low", "3_color_led_red2", "0"],
            [" ", "3 color LED green D10 digital output %d.high_low", "3_color_led_green2", "0"],
            [" ", "3 color LED blue D11 digital output %d.high_low", "3_color_led_blue2", "0"],
            [" ", "Enable ir", "enableIR"],
            [" ", "Disable ir", "disableIR"],
            [" ", "buzzer A0 frequency: %d.tone_frequency Hz, duration: %n ms", "play_tone", "C4,262", 500],
            [" ", "HC-SR04 max distance %n cm", "sonar", 300],
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
            ["", "Get from id: %s the last %n message", "fbchat_get_message", "id", 1],
		],
        menus: {
            high_low: ["0", "1"],
            type: ["raw", "json_thingspeak", "json_opendata", "json_google", "json_firebase"],
            key: ["field1", "field2"],
            database: ["thingspeak"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('LCD1602', descriptor, ext);


})({});