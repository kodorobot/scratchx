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
        return sensor_data["IR_data"];
	}
    
    ext.distance = function(){
        return sensor_data["distance"];
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
		
    function send(cmd) {
        connection.send(cmd);
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
        while(str.search(find) != -1) str = str.replace(find, replace);
    return str;
	}

    var descriptor = {
        blocks: [
            [' ', '連接 Transformer', 'connect'],
            ["r", "循跡感測器A1", "Tracker_Sensor_value1"],
            ["r", "循跡感測器A2", "Tracker_Sensor_value2"],
            ["r", "循跡感測器A3", "Tracker_Sensor_value3"],
            ["r", "紅外線資料", "IR_data"],
            ["r", "距離", "distance"],
            [" ", "L293D A側D4 狀態 %m.state 速度D5 %n", "l293d_dira", "正轉", 0],
            [" ", "L293D B側D7 狀態 %m.state 速度D6 %n", "l293d_dirb", "正轉", 0],
            [" ", "三色LED紅色D9 類比輸出 %n", "three_color_led_red", 0],
            [" ", "三色LED綠色D10 類比輸出 %n", "three_color_led_green", 0],
            [" ", "三色LED藍色D11 類比輸出 %n", "three_color_led_blue", 0],
            [" ", "三色LED紅色D9 數位輸出 %d.high_low", "three_color_led_red2", "0"],
            [" ", "三色LED綠色D10 數位輸出 %d.high_low", "three_color_led_green2", "0"],
            [" ", "三色LED藍色D11 數位輸出 %d.high_low", "three_color_led_blue2", "0"],
            [" ", "啟用紅外線", "enableIR"],
            [" ", "停用紅外線", "disableIR"],
            [" ", "蜂鳴器A0 頻率為: %d.tone_frequency Hz, 時間為: %n ms", "play_tone", "C4,262", 500],
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
		],
        menus: {
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('LCD1602', descriptor, ext);


})({});