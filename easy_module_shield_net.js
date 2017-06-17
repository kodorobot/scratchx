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
    
    ext.pin_d7 = function(mode, value){
        send("/pin_d7/" + mode + "/" + value);
	}
    
    ext.pin_d8 = function(mode, value){
        send("/pin_d8/" + mode + "/" + value);
	}
    
    ext.pin_a3 = function(mode, value){
        send("/pin_a3/" + mode + "/" + value);
	}
    
    ext.led_12 = function(value){
        send("/led_12/" + value);
	}
    
    ext.led_13 = function(value){
        send("/led_13/" + value);
	}

    ext.Potentiometer = function(){
        return sensor_data["Potentiometer"];
	}
    
    ext.Photovaristor = function(){
        return sensor_data["Photovaristor"];
	}
    
    ext.LM35 = function(){
        return sensor_data["LM35"];
	}
    
    ext.button2 = function(){
        var value = sensor_data["button2"];
		if(value == "true") return true;
		else return false;
	}
    
    ext.button3 = function(){
        var value = sensor_data["button3"];
		if(value == "true") return true;
		else return false;
	}
    
    ext.humidity_dht11 = function(){
        return sensor_data["humidity_dht11"];
    }
    
    ext.temperature_dht11_C = function(){
        return sensor_data["temperature_dht11_°C"];
    }
    
    ext.temperature_dht11 = function(type){
        var type = "temperature_dht11/" + type;
        return sensor_data[type];
    }
    
    ext.IR_data = function(){
        var temp = sensor_data["IR_data"];
        return temp;
	}
    
    ext.digital_read = function(pin){
        var pin = "digital_read/" + pin;
        var value = sensor_data[pin];
        return value;
	}
	
    ext.analog_read = function(pin){
        var pin = "analog_read/" + pin;
        var value = sensor_data[pin];
        return value;
	}
    
    ext.lcd_initial = function(){
        send("/lcd_initial/");
	}
    
    ext.lcd_print_cover = function(value, num1, num2){
        value = replace(value)
        send("/lcd_print_cover/" + "/" + value + "/" + num1 + "/" + num2);
	}
    
    ext.back_light_on = function(){
        send("/back_light_on/");
	}
    
    ext.back_light_off = function(){
        send("/back_light_off/");
	}
    
    ext.lcd_clear = function(){
        send("/lcd_clear/");
	}
    
    ext.lcd_scrollDisplayLeft = function(){
        send("/lcd_scrollDisplayLeft/");
	}
    
    ext.lcd_scrollDisplayRight = function(){
        send("/lcd_scrollDisplayRight/");
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
	
    ext.sensor_update_scratch = function(ip, key, value){
        value = replace(value)
        send("/sensor_update_scratch/" + ip + "/" + key + "/" + value);
	}
	
    ext.sensor_update = function(key, value){
        send("/sensor_update/" + key + "/" + value);
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
            ["r", "Potentiometer A0", "Potentiometer"],
            ["r", "Photovaristor A1", "Photovaristor"],
            ["r", "LM35 A2", "LM35"],
            ["b", "button D2", "button2"],
            ["b", "button D3", "button3"],
            ["r", "IR data", "IR_data"],
            ["r", "DHT11 humidity(%)", "humidity_dht11"],
            ["r", "DHT11 temperature(°C)", "temperature_dht11_°C"],
            ["r", "DHT11 temperature type: %m.type2", "temperature_dht11", "°C"],
            [" ", "buzzerD5, frequency: %d.tone_frequency Hz, duration: %n ms","play_tone","C4,262",500],
            [" ", "D7 mode: %m.pin_mode value: %n", "pin_d7", "output", 0],
            [" ", "D8 mode: %m.pin_mode value: %n", "pin_d8", "output", 0],
            [" ", "3 color LED red D9 analog output %n", "3_color_led_red", 0],
            [" ", "3 color LED green D10 analog output %n", "3_color_led_green", 0],
            [" ", "3 color LED blue D11 analog output %n", "3_color_led_blue", 0],
            [" ", "3 color LED red D9 digital output %d.high_low", "3_color_led_red2", "0"],
            [" ", "3 color LED green D10 digital output %d.high_low", "3_color_led_green2", "0"],
            [" ", "3 color LED blue D11 digital output %d.high_low", "3_color_led_blue2", "0"],
            [" ", "red LED D12 digital output %d.high_low", "led_12", "0"],
            [" ", "blue LED D13 digital output %d.high_low", "led_13", "0"],
            [" ", "A3 mode: %m.pin_mode_a3 value: %d.high_low", "pin_a3", "input", 0],
            [" ", "Enable ir", "enableIR"],
            [" ", "Disable ir", "disableIR"],
            ["r", "Read Digital Pin %d.digital_pin", "digital_read", "pin"],
            ["r", "Read Analog Pin (A) %d.analog_pin", "analog_read", "pin"],
            [" ", "SDA connect to A4,SCL connect to A5", "lcd_initial"],
            [" ", "string: %s location row: %n column: %n", "lcd_print_cover", "", 1, 1],
            [" ", "light on", "back_light_on"],
            [" ", "light off", "back_light_off"],
            [" ", "clear", "lcd_clear"],
            [" ", "left shift", "lcd_scrollDisplayLeft"],
            [" ", "right shift", "lcd_scrollDisplayRight"],
            ["r", "data", "datavalue"],
            ["r", "amount of lines", "datavalue_line"],
            [" ", "read local data from %s", "opendata", "temp.txt"],
            [" ", "read local data from %s No.%n line", "opendata_line", "temp.txt", 1],
            [" ", "write data %s to %s", "writedata", "", "temp.txt"],
            [" ", "append data %s to %s", "appenddata", "", "temp.txt"],
            [" ", "open notepad %s", "open_notepad", "temp.txt"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            [" ", "send %s value %n", "sensor_update", "temp", 255],
            [" ", "To ip: %s send %s value %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
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
            pin_mode: ["input", "output", "servo"],
            high_low: ["0", "1"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
            type2: ["°C", "°F"],
            digital_pin:["2", "3", "7", "8"],
            analog_pin:["0", "1", "2", "3"],
            type: ["raw", "json_thingspeak", "json_opendata", "json_google", "json_firebase"],
            database: ["thingspeak"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('Ywrobot', descriptor, ext);


})({});