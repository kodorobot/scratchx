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
    
    ext.digital_pin_mode = function (able, pin, mode) {
        if(able == "啟用") able = "%E5%95%9F%E7%94%A8";
        else if(able == "停用") able = "%E5%81%9C%E7%94%A8";
		
        if(mode == "輸入") mode = "%E8%BC%B8%E5%85%A5";
        else if(mode == "輸出") mode = "%E8%BC%B8%E5%87%BA";
        else if(mode == "伺服機") mode = "%E4%BC%BA%E6%9C%8D%E6%A9%9F";
        else if(mode == "音調") mode = "%E9%9F%B3%E8%AA%BF";
        else if(mode == "輸入(pull-up)") mode = "pull-up";
        else if(mode == "輸入(pull-down)") mode = "pull-down";

        send("/digital_pin_mode/" + able + "/" + pin + "/" + mode);
	}
	
    ext.analog_pin_mode = function (able, pin, mode){
        if(able == "啟用") able = "%E5%95%9F%E7%94%A8";
        else if(able == "停用") able = "%E5%81%9C%E7%94%A8";
        
        if(mode == "輸入") mode = "%E8%BC%B8%E5%85%A5";
        else if(mode == "輸入(pull-up)") mode = "pull-up";
        else if(mode == "輸入(pull-down)") mode = "pull-down";
		
        send("/analog_pin_mode/" + able + "/" + pin + "/" + mode);
		
	}
	
    ext.digital_write = function(pin, value){
        send("/digital_write/" + pin + "/" + value);
	}
	
    ext.analog_write = function(pin,value){
        send("/analog_write/" + pin + "/" + value);
	}
	
    ext.play_tone = function(pin, frequency, time){
        send("/play_tone/" + pin + "/" + frequency + "/" + time);
	}
	
    ext.tone_off = function(pin){
        send("/tone_off/" + pin);
	}
	
    ext.set_servo_position = function(pin, angle){
        send("/set_servo_position/" + pin + "/" + angle);
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
    
    ext.shiftout = function(pin, pin, type, value){
        send("/shiftout/" + pin + "/" + pin + "/" + type + "/" + value);
    }
	
	ext.matrix_hex_result = function(){
        return sensor_data["matrix_hex_result"];
	}
    
    ext.matrix_convert_result_2 = function(){
        return sensor_data["matrix_convert_result_2"];
	}
    
    ext.matrix_convert_result_10 = function(){
        return sensor_data["matrix_convert_result_10"];
	}
    
    ext.matrix_convert_result_16 = function(){
        return sensor_data["matrix_convert_result_16"];
	}
    
    ext.matrix_initial = function(pin1, pin2, pin3, mode, value){
        send("/matrix_initial/" + pin1 + "/" + pin2 + "/" + pin3 + "/" + mode + "/" + value);
	}
    
    ext.matrix_print = function(value){
        value = replace(value)
        send("/matrix_print/" + value);
	}
    
    ext.matrix_print_scroll = function(value, delay){
        value = replace(value)
        send("/matrix_print_scroll/" + value + "/" + delay);
	}
    
    ext.matrix_print_hex = function(value){
        send("/matrix_print_hex/" + value);
	}
    
    ext.matrix_print_dec = function(value){
        send("/matrix_print_dec/" + value);
	}
		
    ext.value_convert = function(value, data){
        send("/value_convert/" + value + "/" + data);
    }
        
    ext.matrix_clear = function(){
        send("/matrix_clear/");
	}
    
    ext.matrix_scrollDisplayLeft = function(mode, data){
        send("/matrix_scrollDisplayLeft/" + mode + "/" + data);
	}
    
    ext.matrix_scrollDisplayRight = function(mode, data){
        send("/matrix_scrollDisplayRight/" + mode + "/" + data);
	}
    
    ext.matrix_scrollDisplayUp = function(mode, data){
        send("/matrix_scrollDisplayUp/" + mode + "/" + data);
	}
    
    ext.matrix_scrollDisplayDown = function(mode, data){
        send("/matrix_scrollDisplayDown/" + mode + "/" + data);
	}
    
    ext.matrix_print_single = function(){
        send("/matrix_print_single/");
	}
    
    ext.show_matrix_print_single = function(value){
        send("/show_matrix_print_single/" + value);
	}
    
    ext.matrix_Intensity = function(value){
        send("/matrix_Intensity/" + value);
	}
    
    ext.bin_to_hex = function(value){
        send("/bin_to_hex/" + value);
    }
    
    ext.hex_to_bin = function(value){
        send("/hex_to_bin/" + value);
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
    
    ext.dht11 = function(value){
        send("/dht11/" + value);
    }
    
    ext.distance_HC_SR04 = function(){
        return sensor_data["distance_HC-SR04"];
    }
    
    ext.time_HC_SR04 = function(){
        return sensor_data["time_HC-SR04"];
    }
    
    ext.distance = function(pin, pin2, value){
        send("/distance/" + pin + "/" + pin2 + "/" + value);
    }
    
    ext.tm1637_initial = function(pin, pin2){
        send("/tm1637_initial/" + pin + "/" + pin2);
    }
    
    ext.tm1637_print = function(value){
        send("/tm1637_print/" + value);
    }
    
    ext.tm1637_clear = function(){
        send("/tm1637_clear");
    }
    
    ext.tm1637_Intensity = function(value){
        send("/tm1637_Intensity/" + value);
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
            [" ", "%m.pin_state Digital Pin %d.digital_pin for %m.digital_pin_mode", "digital_pin_mode", "Enable", "PIN", "Input"],
            [" ", "%m.pin_state Analog Pin (A) %d.analog_pin for %m.analog_pin_mode", "analog_pin_mode", "Enable", "PIN", "Input"],
            ["", "DigitalWrite Set Pin %d.digital_pin to %d.high_low", "digital_write", "PIN", 0],
            ["", "AnalogWrite (PWM) Set Pin %d.pwm_pin to %n", "analog_write", "PIN", "VAL"],
            ["", "Play Tone on Pin: %d.digital_pin HZ: %d.tone_frequency ms: %n", "play_tone", "PIN", "C4,262", 500],
            ["", "Turn Tone Off for Pin: %d.digital_pin", "tone_off", "PIN"],
            ["", "Turn Tone Off for Pin: %d.digital_pin", "set_servo_position", "PIN", 90],
            ["r", "Read Digital Pin %d.digital_pin", "digital_read", "PIN"],
            ["r", "Read Analog Pin (A) %d.analog_pin", "analog_read", "PIN"],
            ["", "shiftout Din pin(D) %d.digital_pin ,Clk pin(D) %d.digital_pin ,bit order: %m.shiftout_type ,value: %n", "shiftout", "PIN", "PIN", "MSBFIRST", 0],
			["r", "hex value of picture", "matrix_hex_result"],
            ["r", "bin value", "matrix_convert_result_2"],
            ["r", "dec value", "matrix_convert_result_10"],
            ["r", "hex value", "matrix_convert_result_16"],
            [" ", "Din connect to (D) %n ,CS connect to (D) %n ,CLK connect to (D) %n type: %m.type mode: %m.transpose", "matrix_initial", 10, 11, 12, "1x1", "normal"],
            [" ", "word: %s", "matrix_print", ""],
            [" ", "scroll word: %s delay: %n (ms)", "matrix_print_scroll", "", 100],
            [" ", "picture(hex value) %s", "matrix_print_hex", ""],
            [" ", "picture(dec value) %s", "matrix_print_dec", ""],
            [" ", "shiftout %s", "matrix_shift_out", ""],
            [" ", "clear", "matrix_clear"],
            [" ", "left shift mode: %m.shift_type %s", "matrix_scrollDisplayLeft", "default"],
            [" ", "right shift mode: %m.shift_type %s", "matrix_scrollDisplayRight", "default"],
            [" ", "up shift mode: %m.shift_type %s", "matrix_scrollDisplayUp", "continuous"],
            [" ", "down shift mode: %m.shift_type %s", "matrix_scrollDisplayDown", "continuous"],
            [" ", "custom picture", "matrix_print_single"],
            [" ", "show custom picture no.%n ", "show_matrix_print_single", "1"],
            [" ", "intensity %d.intense", "matrix_Intensity", 1],
            [" ", "carry convert base: %m.base value: %s ", "value_convert", "10", "0"],
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
            [" ", "HTTP GET data type:%m.type2 from %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json?results=8000"],
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
            ["r", "DHT11 humidity(%)", "humidity_dht11"],
            ["r", "DHT11 temperature(°C)", "temperature_dht11_°C"],
            ["r", "DHT11 temperature type: %m.type3", "temperature_dht11", "°C"],
            [" ", "DHT11 (D) %n", "dht11", 2],
            ["r", "HC-SR04 distance", "distance_HC-SR04"],
            ["r", "duration(microsecond)", "time_HC-SR04"],
            [" ", "HC-SR04 trig %n echo(A) %n max distance %n cm", "distance", 10, 0, 300],
            [" ", "Tm1637 Din connect to (D) %n ,CLK connect to (D) %n ", "tm1637_initial", 2, 3],
            [" ", "Tm1637 four numbers(hex): %s", "tm1637_print", ""],
            [" ", "Tm1637 clear number", "tm1637_clear"],
            [" ", "Tm1637 intense %m.intense", "tm1637_Intensity", 1],
		],
        menus: {
            intense: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            type: ["1x1", "2x1", "4x1", "1x2", "2x2", "1x4"],
            shift_type: ["default", "continuous", "shiftout"],
            type2: ["raw", "json_thingspeak", "json_opendata", "json_google", "json_firebase"],
            key: ["field1", "field2"],
            database: ["thingspeak"],
            pin_state: ['Enable', 'Disable'],
            digital_pin_mode: ['Input',"Input(pull-up)","Input(pull-down)", 'Output', 'PWM', 'Servo', 'Tone'],
            analog_pin_mode: ["Input", "Input(pull-up)", "Input(pull-down)"],
            high_low: ["0", "1"],
            digital_pin: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "A0", "A1", "A2", "A3", "A4", "A5"],
            analog_pin: ["0", "1", "2", "3", "4", "5"],
            pwm_pin: ["3", "5", "6", "9", "10", "11"],
            type3: ["°C", "°F"],
            shiftout_type: ["MSBFIRST", "LSBFIRST"],
            base: ["2", "10", "16"],
            transpose: ["normal", "transpose"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
            intense2: [1,2,3,4,5,6,7,8],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('Max7219_net_library', descriptor, ext);


})({});