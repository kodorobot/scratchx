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
    
    ext.opendata_line = function(value, num){
        send("/opendata_line/" + value + "/" + num);
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
    
    ext.humidity_dht11 = function(){
        return sensor_data["humidity_dht11"];
    }
    
    ext.temperature_dht11 = function(){
        return sensor_data["temperature_dht11"];
    }
    
    ext.dht11 = function(value){
        send("/dht11/" + value);
    }
    
    ext.distance_HC_SR04 = function(){
        return sensor_data["distance_HC-SR04"];
    }
    
    ext.distance = function(pin, pin2){
        send("/distance/" + pin + "/" + pin2);
    }
    
    ext.IR_data = function(){
        return sensor_data["IR_data"];
    }
    
    ext.IR_send = function(type, value){
        send("/IR_send/" + type + "/" + value);
    }
    
    ext.IR_receive = function(type, value){
        send("/IR_receive/" + type + "/" + value);
    }
    
    ext.distance_US_016 = function(){
        return sensor_data["distance_US-016"];
    }
    
    ext.distance2 = function(value){
        send("/distance/" + value);
    }
    
    ext.three_color_led = function(pin, value, pin2, value2, pin3, value3){
        send("/3_color_led/" + pin + "/" + value + "/" + pin2 + "/" + value2 + "/" + pin3 + "/" + value3);
    }
    
    ext.value_potentiometer = function(){
        return sensor_data["value_potentiometer"];
    }
    
    ext.potentiometer = function(value){
        send("/potentiometer/" + value);
    }
    
    ext.value_sound_sensor = function(){
        return sensor_data["value_sound_sensor"];
    }
    
    ext.sound_sensor = function(value){
        send("/sound_sensor/" + value);
    }
    
    ext.value_photovaristor = function(){
        return sensor_data["value_photovaristor"];
    }
    
    ext.photovaristor = function(value){
        send("/photovaristor/" + value);
    }
    
    ext.alcohol_sensor_value_analog = function(){
        return sensor_data["alcohol_sensor_value_analog"];
    }
    
    ext.alcohol_sensor_value_digital = function(){
        return sensor_data["alcohol_sensor_value_digital"];
    }
    
    ext.alcohol_sensor = function(pin, pin2){
        send("/alcohol_sensor/" + pin + "/" + pin2);
    }
    
    ext.IR_sensor_level_analog = function(){
        return sensor_data["IR_sensor_level_analog"];
    }
    
    ext.IR_sensor_level_digital = function(){
        return sensor_data["IR_sensor_level_digital"];
    }
    
    ext.IR_sensor = function(pin, pin2){
        send("/IR_sensor/" + pin + "/" + pin2);
    }
    
    ext.Tracker_Sensor_value = function(){
        return sensor_data["Tracker_Sensor_value"];
    }
    
    ext.Tracker_Sensor_value2 = function(){
        return sensor_data["Tracker_Sensor_value2"];
    }
    
    ext.Tracker_Sensor_value3 = function(){
        return sensor_data["Tracker_Sensor_value3"];
    }
    
    ext.Tracker_Sensor_value4 = function(){
        return sensor_data["Tracker_Sensor_value4"];
    }
    
    ext.Tracker_Sensor_value5 = function(){
        return sensor_data["Tracker_Sensor_value5"];
    }
    
    ext.Tracker_Sensor = function(value){
        send("/Tracker_Sensor/" + value);
    }
    
    ext.Tracker_Sensor2 = function(value){
        send("/Tracker_Sensor2/" + value);
    }
    
    ext.Tracker_Sensor3 = function(value){
        send("/Tracker_Sensor3/" + value);
    }
    
    ext.Tracker_Sensor4 = function(value){
        send("/Tracker_Sensor4/" + value);
    }
    
    ext.Tracker_Sensor5 = function(value){
        send("/Tracker_Sensor5/" + value);
    }
		
    ext.forward_298 = function(pin, pin2, pin3, value){
        send("/forward_298/" + pin + "/" + pin2 + "/" + pin3 + "/" + value);
    }
    
    ext.back_298 = function(pin, pin2, pin3, value){
        send("/back_298/" + pin + "/" + pin2 + "/" + pin3 + "/" + value);
    }
    
    ext.stop_298 = function(pin, pin2, pin3){
        send("/stop_298/" + pin + "/" + pin2 + "/" + pin3);
    }
    
    ext.forward_293 = function(pin, pin2, pin3, value){
        send("/forward_293/" + pin + "/" + pin2 + "/" + pin3 + "/" + value);
    }
    
    ext.back_293 = function(pin, pin2, pin3, value){
        send("/back_293/" + pin + "/" + pin2 + "/" + pin3 + "/" + value);
    }
    
    ext.stop_293 = function(pin, pin2, pin3){
        send("/stop_293/" + pin + "/" + pin2 + "/" + pin3);
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
            [" ", "%m.pin_state : 數位腳位 %n 為 %m.digital_pin_mode", "digital_pin_mode", "啟用", "號碼", "輸入"],
            [" ", "%m.pin_state : 類比腳位(A) %n 為 %m.analog_pin_mode", "analog_pin_mode", "啟用", "號碼", "輸入"],
            ["", "數位輸出: 設定腳位 %n 為 %d.high_low", "digital_write", "號碼", 0],
            ["", "模擬類比輸出(PWM): 設定腳位 %n 的值為  %n", "analog_write", "號碼", "數量值"],
            ["", "在腳位 %n 播放音調, 頻率為: %n Hz, 時間為: %n ms", "play_tone", "號碼", 1000, 500],
            ["", "關閉腳位 %n 的音調", "tone_off", "號碼"],
            ["", "設定第 %n 腳位為伺服機輸出 轉動角度為 %n", "set_servo_position", "號碼", 90],
            ["r", "讀取數位腳位 %n 的值", "digital_read", "號碼"],
            ["r", "讀取類比腳位(A) %n 的值", "analog_read", "號碼"],
            ["r", "資料", "datavalue"],
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
            ["r", "雲端資料", "HTTPvalue"],
            ["r", "雲端資料筆數", "HTTPvalue_number"],
            ["r", "剖析資料", "HTTPvalue_processed"],
            ["r", "可使用的欄位", "HTTP_allkeyValue"],
            ["r", "選擇的欄位", "HTTP_keyValue"],
            [" ", "HTTP POST 資料 %s", "httpPOST", "https://api.thingspeak.com/update?api_key=<api_key>&field1=<value>"],
            [" ", "HTTP GET 資料 類型:%m.type 從 %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json"],
            [" ", "HTTP GET 資料庫:%m.database channel ID: %s", "httpGET_database", "thingspeak", ""],
            [" ", "雲端資料選擇 欄位:%d.key 第 %n 筆的剖析資料", "jsonDataSelect", "field1", "1"],
            [" ", "Data 剖析可使用的欄位", "keyFind"],
            [" ", "Data 剖析 第 %n 筆的欄位", "keySelect", "1"],
            ["r", "DHT11 濕度", "humidity_dht11"],
            ["r", "DHT11 溫度", "temperature_dht11"],
            [" ", "DHT11 溫濕度感測器(D) %n", "dht11", 2],
            ["r", "HC-SR04 距離", "distance_HC_SR04"],
            [" ", "距離感測器HC-SR04 trig %n echo(A) %n", "distance", 10, 0],
            ["r", "紅外線資料", "IR_data"],
            [" ", "發射訊號 種類:%m.type %s (uno:D3 mega:D11)", "IR_send", "玩具", ""],
            [" ", "紅外線接收器 種類:%m.type 秒數:%n (D2)", "IR_receive", "玩具", 10],
            ["r", "US-016 距離", "distance_US_016"],
            [" ", "距離感測器US-016(A) %n", "distance2", 0],
            [" ", "3色LED 藍(D) %n PWM %n 紅(D) %n PWM %n 綠(D) %n PWM %n", "three_color_led", 5, 100, 6, 100, 9, 100],
            ["r", "可變電阻數值", "value_potentiometer"],
            [" ", "可變電阻(A) %n", "potentiometer", 0],
            ["r", "聲音感測器數值", "value_sound_sensor"],
            [" ", "聲音感測器(A) %n", "sound_sensor", 0],
            ["r", "光感測器數值", "value_photovaristor"],
            [" ", "光感測器(A) %n", "photovaristor", 0],
            ["r", "數值(類比)", "alcohol_sensor_value_analog"],
            ["r", "數值(數位)", "alcohol_sensor_value_digital"],
            [" ", "酒精感測器(A) %n (D) %n", "alcohol_sensor", 0, 2],
            ["r", "強度(類比)", "IR_sensor_level_analog"],
            ["r", "強度(數位)", "IR_sensor_level_digital"],
            [" ", "火焰感測器(A) %n (D) %n", "IR_sensor", 0, 2],
            ["r", "循跡1", "Tracker_Sensor_value"],
            ["r", "循跡2", "Tracker_Sensor_value2"],
            ["r", "循跡3", "Tracker_Sensor_value3"],
            ["r", "循跡4", "Tracker_Sensor_value4"],
            ["r", "循跡5", "Tracker_Sensor_value5"],
            [" ", "循跡感測器1(A) %n", "Tracker_Sensor", 0],
            [" ", "循跡感測器2(A) %n", "Tracker_Sensor2", 0],
            [" ", "循跡感測器3(A) %n", "Tracker_Sensor3", 0],
            [" ", "循跡感測器4(A) %n", "Tracker_Sensor4", 0],
            [" ", "循跡感測器5(A) %n", "Tracker_Sensor5", 0],
            [" ", "馬達正轉 EnA(B)(PWM)數位腳位: %n In1(3)數位腳位: %n In2(4)數位腳位: %n 速度: %n", "forward_298", 5, 4, 7, 250],
            [" ", "馬達倒轉 EnA(B)(PWM)數位腳位: %n In1(3)數位腳位: %n In2(4)數位腳位: %n 速度: %n", "back_298", 5, 4, 7, 250],
            [" ", "馬達停止 EnA(B)(PWM)數位腳位: %n In1(3)數位腳位: %n In2(4)數位腳位: %n", "stop_298", 5, 4, 7],
            [" ", "馬達正轉 PWMA(B)數位腳位: %n DIRA數位腳位: %n DIRB數位腳位: %n 速度: %n", "back_293", 5, 4, 7, 250],
            [" ", "馬達倒轉 PWMA(B)數位腳位: %n DIRA數位腳位: %n DIRB數位腳位: %n 速度: %n", "forward_293", 5, 4, 7, 250],
            [" ", "馬達停止 PWMA(B)數位腳位: %n DIRA數位腳位: %n DIRB數位腳位: %n", "stop_293", 5, 4, 7],
		],
        menus: {
            pin_state: ['啟用', '停用'],
            digital_pin_mode: ['輸入',"輸入(pull-up)","輸入(pull-down)", '輸出', 'PWM', '伺服機', '音調'],
            analog_pin_mode: ["輸入", "輸入(pull-up)", "輸入(pull-down)"],
            high_low: ["0", "1"],
            type: ["raw", "json_thingspeak", "json_opendata"],
            key: ["field1", "field2"],
            database: ["thingspeak"],
            type: ["玩具", "冷氣"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('S2Aplus_net_library_extra', descriptor, ext);


})({});