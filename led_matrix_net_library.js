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
    
    ext.distance = function(pin, pin2){
        send("/distance/" + pin + "/" + pin2);
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
            [" ", "%m.pin_state : 數位腳位 %d.digital_pin 為 %m.digital_pin_mode", "digital_pin_mode", "啟用", "號碼", "輸入"],
            [" ", "%m.pin_state : 類比腳位(A) %d.analog_pin 為 %m.analog_pin_mode", "analog_pin_mode", "啟用", "號碼", "輸入"],
            ["", "數位輸出: 設定腳位 %d.digital_pin 為 %d.high_low", "digital_write", "號碼", 0],
            ["", "模擬類比輸出(PWM): 設定腳位 %d.pwm_pin 的值為  %n", "analog_write", "號碼", "數量值"],
            ["", "在腳位 %d.digital_pin 播放音調, 頻率為: %d.tone_frequency Hz, 時間為: %n ms", "play_tone", "號碼", "C4,262", 500],
            ["", "關閉腳位 %d.digital_pin 的音調", "tone_off", "號碼"],
            ["", "設定第 %d.digital_pin 腳位為伺服機輸出 轉動角度為 %n", "set_servo_position", "號碼", 90],
            ["r", "讀取數位腳位 %d.digital_pin 的值", "digital_read", "號碼"],
            ["r", "讀取類比腳位(A) %d.analog_pin 的值", "analog_read", "號碼"],
            ["", "shiftout Din接(D) %d.digital_pin ,Clk接(D) %d.digital_pin ,資料格式: %m.shiftout_type ,資料: %n", "shiftout", "號碼", "號碼", "MSBFIRST", 0],
			["r", "圖形的16位元碼", "matrix_hex_result"],
            ["r", "2進位值", "matrix_convert_result_2"],
            ["r", "10進位值", "matrix_convert_result_10"],
            ["r", "16進位值", "matrix_convert_result_16"],
            [" ", "Din接(D) %n ,CS接(D) %n ,CLK接(D) %n 類型: %m.type 模式: %m.transpose", "matrix_initial", 10, 11, 12, "1x1", "正常"],
            [" ", "顯示文字(英,數): %s", "matrix_print", ""],
            [" ", "跑馬燈(英,數): %s 延遲: %n (ms)", "matrix_print_scroll", "", 100],
            [" ", "顯示圖形(16位元碼) %s", "matrix_print_hex", ""],
            [" ", "顯示圖形(10位元碼) %s", "matrix_print_dec", ""],
            [" ", "雙位元組傳送 %s", "matrix_shift_out", ""],
            [" ", "清空文字", "matrix_clear"],
            [" ", "左移 模式: %m.shift_type %s", "matrix_scrollDisplayLeft", "預設"],
            [" ", "右移 模式: %m.shift_type %s", "matrix_scrollDisplayRight", "預設"],
            [" ", "上移 模式: %m.shift_type %s", "matrix_scrollDisplayUp", "連續"],
            [" ", "下移 模式: %m.shift_type %s", "matrix_scrollDisplayDown", "連續"],
            [" ", "自訂圖形", "matrix_print_single"],
            [" ", "顯示自訂圖形第 %n 張", "show_matrix_print_single", "1"],
            [" ", "亮度 %d.intense", "matrix_Intensity", 1],
            [" ", "進位轉換 進位: %m.base 值: %s ", "value_convert", "10", "0"],
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
            ["r", "語音資料", "voicedata"],
            [" ", "錄音 %n 秒", "record", 3],
            [" ", "%s 轉語音(中文)", "textovoice_tw", "文字"],
            [" ", "%s 轉語音(英文)", "textovoice_en", "word"],
            [" ", "語音音量 %d.volume", "voiceVolume", 100],
            [" ", "清除語音資料", "clear_voicedata"],
            ["b", "資料庫連接", "HTTPvalue"],
            ["r", "雲端資料", "HTTPvalue_processed"],
            ["r", "最後一筆", "HTTPvalue_last"],
            ["r", "雲端資料筆數", "HTTPvalue_number"],
            ["r", "可使用的欄位", "HTTP_allkeyValue"],
            ["r", "選擇的欄位", "HTTP_keyValue"],
            ["r", "準備寫入firebase的資料", "temp_data_firebase"],
            [" ", "HTTP POST 資料 %s", "httpPOST", "https://api.thingspeak.com/update?api_key=<api_key>&field1=<value>"],
            [" ", "HTTP GET 資料 類型:%m.type2 從 %s", "httpGET_type", "json_thingspeak", "https://thingspeak.com/channels/<channel_ID>/feed.json?results=8000"],
            [" ", "HTTP GET 資料庫:%m.database channel ID: %s", "httpGET_database", "thingspeak", ""],
            [" ", "雲端資料選擇 欄位:%s 第 %n 筆的剖析資料", "jsonDataSelect", "field1", "1"],
            [" ", "選擇 第 %n 筆到第 %n 筆的剖析資料", "jsonDataSelect_section", "1", "10"],
            [" ", "剖析可使用欄位", "keyFind"],
            [" ", "選擇第 %n 筆欄位", "keySelect", "1"],
            [" ", "IFTTT傳送事件 事件名: %s key: %s 值1: %s 值2: %s 值3: %s", "ifttt_maker", "event", "key", "", "", ""],
            [" ", "firebase GET 帳號名: %s 文件名: %s", "httpGET_firebase", "帳號", "文件"],
            [" ", "firebase POST 帳號名: %s 文件名: %s", "httpPOST_firebase", "帳號", "文件"],
            [" ", "firebase 寫入資料 欄位: %s 值: %s", "write_temp_data_firebase", "key", "value"],
            [" ", "firebase 清空寫入資料", "clear_data_firebase"],
            ["r", "狀態", "fbchat_status"],
            ["r", "訊息", "fbchat_message"],
            [" ", "登入fb 帳號: %s 密碼: %s", "fbchat_login", "帳號", "密碼"],
            [" ", "向id: %s 傳送訊息: %s", "fbchat_send_word", "id", "訊息"],
            [" ", "向id: %s 傳送圖片 網址: %s 訊息: %s", "fbchat_send_pic", "id", "網址", "訊息"],
            [" ", "取得與id: %s 的最後第 %n 筆訊息", "fbchat_get_message", "id", 1],
            ["r", "DHT11 濕度(%)", "humidity_dht11"],
            ["r", "DHT11 溫度(°C)", "temperature_dht11_C"],
            ["r", "DHT11 溫度 類型: %m.type3", "temperature_dht11", "°C"],
            [" ", "DHT11 溫濕度感測器(D) %n", "dht11", 2],
            ["r", "HC-SR04 距離", "distance_HC_SR04"],
            ["r", "來回時間(微秒)", "time_HC_SR04"],
            [" ", "距離感測器HC-SR04 trig %n echo(A) %n", "distance", 10, 0],
            [" ", "Tm1637 Din接(D) %n ,CLK接(D) %n ", "tm1637_initial", 2, 3],
            [" ", "Tm1637 4位數字(16進位): %s", "tm1637_print", ""],
            [" ", "Tm1637清空文字", "tm1637_clear"],
            [" ", "Tm1637亮度 %m.intense2", "tm1637_Intensity", 1],
		],
        menus: {
            intense: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            type: ["1x1", "2x1", "4x1", "1x2", "2x2", "1x4"],
            shift_type: ["預設", "連續", "位元組傳遞積木"],
            type2: ["raw", "json_thingspeak", "json_opendata", "json_google", "json_firebase"],],
            key: ["field1", "field2"],
            database: ["thingspeak"],
            pin_state: ['啟用', '停用'],
            digital_pin_mode: ['輸入',"輸入(pull-up)","輸入(pull-down)", '輸出', 'PWM', '伺服機', '音調'],
            analog_pin_mode: ["輸入", "輸入(pull-up)", "輸入(pull-down)"],
            high_low: ["0", "1"],
            digital_pin: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "A0", "A1", "A2", "A3", "A4", "A5"],
            analog_pin: ["0", "1", "2", "3", "4", "5"],
            pwm_pin: ["3", "5", "6", "9", "10", "11"],
            type3: ["°C", "°F"],
            shiftout_type: ["MSBFIRST", "LSBFIRST"],
            base: ["2", "10", "16"],
            transpose: ["正常", "轉置"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
            intense2: [1,2,3,4,5,6,7,8],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('Max7219_net_library', descriptor, ext);


})({});