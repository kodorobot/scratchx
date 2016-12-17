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
        
        if (temp == "ff629d") temp = "上";
        else if(temp == "ffa857") temp = "下";
        else if(temp == "ff22dd") temp = "左";
        else if(temp == "ffc23d") temp = "右";
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
        if(sensor_data["HTTPvalue"] == "true")
            return true;
        else
            return false;
	}
    
    ext.HTTPvalue_number = function(){
        return sensor_data["HTTPvalue_number"];
	}
    
    ext.HTTPvalue_processed = function(){
        return sensor_data["HTTPvalue_processed"];
	}
    
    ext.HTTPvalue_last = function(){
        return sensor_data["HTTPvalue_last"];
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
    
    ext.ifttt_maker = function(eventname, key, value1, value2, value3){
        send("/ifttt_maker/" + eventname + "/" + key + "/" + value1 + "/" + value2 + "/" + value3);
    }
    
    ext.fbchat_status = function(){
        return sensor_data["fbchat_status"];
    }
    
    ext.fbchat_message = function(){
        return sensor_data["fbchat_message"];
    }
    
    ext.fbchat_login = function(account, pass){
        send("/fbchat_login/" + account + "/" + pass);
    }
    
    ext.fbchat_send_word = function(account, pass){
        send("/fbchat_send_word/" + account + "/" + pass);
    }
    
    ext.fbchat_send_pic = function(account, url, word){
        url = replaceAll(url,"/","%2F")
        url = replaceAll(url,"&","%26")
        url = replaceAll(url,"?","%3F")
        send("/fbchat_send_pic/" + account + "/" + url + "/" + word);
    }
    
    ext.fbchat_get_message = function(account, pass){
        send("/appenddata/" + account + "/" + pass);
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
        while(str.search(find) != -1) str = str.replace(find, replace);
    return str;
	}

    var descriptor = {
        blocks: [
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
            high_low: ["0", "1"],
            type: ["raw", "json_thingspeak", "json_opendata", "json_google"],
            key: ["field1", "field2"],
            database: ["thingspeak"],
            tone_frequency:["C1,33", "D1,37", "E1,41", "F1,44", "G1,49", "A1,55", "B1,62", "C2,65", "D2,73", "E2,82", "F2,87", "G2,98", "A2,110", "B2,123", "C3,131", "D3,147", "E3,165", "F3,175", "G3,196", "A3,220", "B3,247", "C4,262", "D4,294", "E4,330", "F4,349", "G4,392", "A4,440", "B4,494", "C5,523", "D5,587", "E5,659", "F5,698", "G5,784", "A5,880", "B5,988", "C6,1047", "D6,1175", "E6,1319", "F6,1397", "G6,1586", "A6,1760", "B6,1976", "C7,2093", "D7,2349", "E7,2637", "F7,2794", "G7,3136", "A7,3520", "B7,3951", "C8,4186", "D8,4699", "E8,5274", "F8,5588", "G8,6272", "A8,7040", "B8,7902", "C9,8372", "D9,9397", "E9,10548", "F9,11175", "G9,12544", "A9,14080", "B9,15804"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('LCD1602', descriptor, ext);


})({});