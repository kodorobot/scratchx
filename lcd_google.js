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

    ext._getStatus = function () {
        if (isConnected) return { status: 2, msg: 'Okay' };
        if (!isConnected) return { status: 1, msg: 'no product is running' };
    };
	
    ext._shutdown = function() {
  };
  
    ext.connect = function () {
        if (!isConnected)
            socketConnection("127.0.0.1", 50209);
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
        return sensor_data["s0"];
    }
    
    ext.s1 = function(){
        return sensor_data["s1"];
    }
    
    ext.sensor_update_scratch = function(ip, key, value){
        send("/sensor_update_scratch/" + ip + "/" + key + "/" + value);
    }
    
    ext.sensor_update = function(key, value){
        send("/sensor_update/" + key + "/" + value);
    }
    
    ext.HTTPvalue = function(){
        return sensor_data["HTTPvalue"];
    }
    
    ext.httpPOST = function(url){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
        send("/httpPOST/" + url);
    }
    
    ext.httpGET = function(url){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
        send("/httpGET/" + url);
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

    ext.dht22 = function(value){
        send("/dht22/" + value);
    }
    
    ext.distance_HC_SR04 = function(){
        return sensor_data["distance_HC-SR04"];
    }
    
    ext.time_HC_SR04 = function(){
        return sensor_data["time_HC-SR04"];
    }
    
    ext.distance = function(pin, pin2){
        send("/distance/" + pin + "/" + pin2);
    }
    
    ext.hint = function(){
        if (sensor_data["hint"])return true;
        else return false;
    }
    
    ext.temperature = function(){
        return sensor_data["temperature"];
    }

    ext.humidity = function(){
        return sensor_data["humidity"];
    }

    ext.pm1_0_air = function(){
        return sensor_data["pm1.0_air"];
    }

    ext.pm2_5_air = function(){
        return sensor_data["pm2.5_air"];
    }

    ext.pm10_air = function(){
        return sensor_data["pm10_air"];
    }

    ext.pm0_3_count = function(){
        return sensor_data["pm0.3_count"];
    }

    ext.pm0_5_count = function(){
        return sensor_data["pm0.5_count"];
    }

    ext.pm1_0_count = function(){
        return sensor_data["pm1.0_count"];
    }

    ext.pm2_5_count = function(){
        return sensor_data["pm2.5_count"];
    }

    ext.error = function(){
        return sensor_data["error"];
    }

    ext.start_serial = function(pin1, pin2){
        send("/start_serial/" + pin1 + "/" + pin2);
    }

    ext.ID_rc522 = function(){
        return sensor_data["ID_rc522"];
    }

    ext.rc522_initial = function(pin1, pin2){
        send("/rc522_initial/" + pin1 + "/" + pin2);
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
	
    function socketConnection(ip, port) {
        connection = new WebSocket('ws://' + ip + ':' + port);
        connection.onopen = function (e) {
            isConnected = true;
        };
        connection.onclose = function (e) {
            isConnected = false;
        };
        connection.onmessage = function (e) {
            //console.log(e.data);
            var sensor = e.data.split("\n");
            for(var i = 0;i < sensor.length;i++) sensor_data[sensor[i].split(" ")[0].toString()] = sensor[i].split(" ")[1];
        };
        connection.onerror = function (e) {
            isConnected = false;
        };
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
            [' ', '連接 Transformer', 'connect'],
            [" ", "%m.pin_state : 數位腳位 %d.digital_pin 為 %m.digital_pin_mode", "digital_pin_mode", "啟用", "號碼", "輸入"],
            [" ", "%m.pin_state : 類比腳位(A) %d.analog_pin 為 %m.analog_pin_mode", "analog_pin_mode", "啟用", "號碼", "輸入"],
            ["", "數位輸出: 設定腳位 %d.digital_pin 為 %d.high_low", "digital_write", "號碼", 0],
            ["", "模擬類比輸出(PWM): 設定腳位 %d.pwm_pin 的值為  %n", "analog_write", "號碼", "數量值"],
            ["", "在腳位 %d.digital_pin 播放音調, 頻率為: %d.tone_frequency Hz, 時間為: %n ms", "play_tone", "號碼", "C4,262", 500],
            ["", "關閉腳位 %d.digital_pin 的音調", "tone_off", "號碼"],
            ["", "設定第 %d.digital_pin 腳位為伺服機輸出 轉動角度為 %n", "set_servo_position", "號碼", 90],
            ["r", "讀取數位腳位 %d.digital_pin 的值", "digital_read", "號碼"],
            ["r", "讀取類比腳位(A) %d.analog_pin 的值", "analog_read", "號碼"],
            [" ", "SDA接A4,SCL接A5", "lcd_initial"],
            [" ", "文字(英,數): %s 位置 列: %n 行: %n", "lcd_print_cover", "", 1, 1],
            [" ", "開燈", "back_light_on"],
            [" ", "關燈", "back_light_off"],
            [" ", "清空文字", "lcd_clear"],
            [" ", "左移", "lcd_scrollDisplayLeft"],
            [" ", "右移", "lcd_scrollDisplayRight"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            [" ", "send %s value %n", "sensor_update", "temp", 255],
            [" ", "向ip: %s 傳送變數 %s 值 %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
            ["r", "HTTP GET 資料", "HTTPvalue"],
            [" ", "HTTP POST 資料 %s", "httpPOST", ""],
            [" ", "HTTP GET 資料 從 %s", "httpGET", ""],
            ["r", "語音資料", "voicedata"],
            [" ", "錄音 %n 秒", "record", 3],
            [" ", "%s 轉語音(中文)", "textovoice_tw", "文字"],
            [" ", "%s 轉語音(英文)", "textovoice_en", "word"],
            [" ", "語音速度 %d.speed", "voiceSpeed", 0],
            [" ", "語音音量 %d.volume", "voiceVolume", 100],
            ["r", "DHT11 濕度(%)", "humidity_dht11"],
            ["r", "DHT11 溫度(°C)", "temperature_dht11_C"],
            ["r", "DHT11 溫度 類型: %m.type2", "temperature_dht11", "°C"],
            [" ", "DHT11 溫濕度感測器(D) %n", "dht11", 2],
            ["r", "HC-SR04 距離", "distance_HC_SR04"],
            ["r", "來回時間(微秒)", "time_HC_SR04"],
            [" ", "距離感測器HC-SR04 trig %n echo(A) %n", "distance", 10, 0],
            ["b", "PM2.5紫線5v 橘線gnd 綠線d2", "hint"],
            ["r", "溫度",  "temperature"],
            ["r", "濕度",  "humidity"],
            ["r", "PM1.0濃度",  "pm1_0_air"],
            ["r", "PM2.5濃度",  "pm2_5_air"],
            ["r", "PM10濃度",  "pm10_air"],
            ["r", "PM0.3數量",  "pm0_3_count"],
            ["r", "PM0.5數量",  "pm0_5_count"],
            ["r", "PM1.0數量",  "pm1_0_count"],
            ["r", "PM2.5數量",  "pm2_5_count"],
            ["r", "錯誤代碼",  "error"],
            ["", "開啟serial tx: %n rx: %n", "start_serial", 2, 3],
            ["r", "RC522 ID", "ID_rc522"],
            [" ", "RC522初始化 SDA 接 %n RST 接 %n SCK接D13(mega:D52) MOSI接D11(mega:D51) MISO接D12(mega:D50)", "rc522_initial", 7, 8],
		],
        menus: {
            pin_state: ['啟用', '停用'],
            digital_pin_mode: ['輸入',"輸入(pull-up)","輸入(pull-down)", '輸出', 'PWM', '伺服機', '音調'],
            analog_pin_mode: ["輸入", "輸入(pull-up)", "輸入(pull-down)"],
            high_low: ["0", "1"],
            digital_pin: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "A0", "A1", "A2", "A3", "A4", "A5"],
            analog_pin: ["0", "1", "2", "3", "4", "5"],
            pwm_pin: ["3", "5", "6", "9", "10", "11"],
            type2: ["°C", "°F"],
            shiftout_type: ["MSBFIRST", "LSBFIRST"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
            intense: [1,2,3,4,5,6,7,8],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('LCD1602_net_library', descriptor, ext);


})({});