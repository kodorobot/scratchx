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
	
    var isConnected = true;
	var sensor_data = {};

    ext._getStatus = function () {
        if (isConnected) return { status: 2, msg: 'Okay' };
        //if (!isConnected) return { status: 1, msg: 'no product is running' };
    };
	
    ext._shutdown = function() {
  };
  
    ext.connect = function () {
        if (!isConnected)
            socketConnection("127.0.0.1", 50209);
    }
	
	ext.matrix_hex_result = function(){
        return sensor_data["matrix_hex_result"];
	}
    
    ext.matrix_initial = function(pin1, pin2, pin3){
        send("/matrix_initial/" + pin1 + "/" + pin2 + "/" + pin3);
	}
    
    ext.matrix_print = function(value){
        send("/matrix_print/" + value);
	}
    
    ext.matrix_print_scroll = function(value, delay){
        send("/matrix_print_scroll/" + value + "/" + delay);
	}
		
    ext.matrix_print_hex = function(value){
        send("/matrix_print_hex/" + value);
	}
        
    ext.matrix_clear = function(){
        send("/matrix_clear/");
	}
    
    ext.matrix_scrollDisplayLeft = function(){
        send("/matrix_scrollDisplayLeft/");
	}
    
    ext.matrix_scrollDisplayRight = function(){
        send("/matrix_scrollDisplayRight/");
	}
    
    ext.matrix_scrollDisplayUp = function(){
        send("/matrix_scrollDisplayUp/");
	}
    
    ext.matrix_scrollDisplayDown = function(){
        send("/matrix_scrollDisplayDown/");
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
        send("/httpPOST/" + url);
	}
	
    ext.httpGET_type = function(type, url){
        url = replaceAll(url,"/","%2F")
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
    
    ext.distance_HC-SR04 = function(){
        return sensor_data["distance_HC-SR04"];
    }
    
    ext.distance = function(pin, pin2){
        send("/distance/" + pin + "/" + pin2);
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
	
    function replaceAll(str, find, replace) {
        while(str.search(find) != -1) str = str.replace(find, replace);
    return str;
	}

    var descriptor = {
        blocks: [
			["r", "圖形的16位元碼", "matrix_hex_result"],
            [" ", "Din接(D) %n ,CS接(D) %n ,CLK接(D) %n ", "matrix_initial", 10, 11, 12],
            [" ", "顯示文字(英,數): %s", "matrix_print", ""],
            [" ", "跑馬燈(英,數): %s 延遲: %n (ms)", "matrix_print_scroll", "", 100],
            [" ", "顯示圖形(16位元碼) %s", "matrix_print_hex", ""],
            [" ", "清空文字", "matrix_clear"],
            [" ", "左移", "matrix_scrollDisplayLeft"],
            [" ", "右移", "matrix_scrollDisplayRight"],
            [" ", "上移", "matrix_scrollDisplayUp"],
            [" ", "下移", "matrix_scrollDisplayDown"],
            [" ", "自訂圖形(8x8)", "matrix_print_single"],
            [" ", "顯示自訂圖形第 %n 張(8x8)", "show_matrix_print_single", "1"],
            [" ", "亮度 %m.intense", "matrix_Intensity", 1],
            ["r", "資料", "datavalue"],
            [" ", "讀取本機資料 從 %s", "opendata", "temp.txt"],
            [" ", "讀取本機資料 從 %s 第 %n 行", "opendata2", "temp.txt", 1],
            [" ", "儲存資料 %s 在 %s", "writedata", "", "temp.txt"],
            [" ", "附加資料 %s 在 %s", "appenddata", "", "temp.txt"],
            [" ", "開啟檔案 %s", "open_notepad", "temp.txt"],
            ["r", "virtual sensor s0",  "s0"],
            ["r", "virtual sensor s1",  "s1"],
            ["w", "向ip: %s 傳送變數 %s 值 %s", "sensor_update_scratch", "127.0.0.1:50209", "s0", 0],
            ["w", "send %s value %n", "sensor_update", "temp", 255],
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
            [" ", "Data 剖析可使用的欄位", "keyFind"],
            [" ", "Data 剖析 第 %n 筆的欄位", "keySelect", "1"],
            ["r", "DHT11 濕度", "humidity_dht11"],
            ["r", "DHT11 溫度", "temperature_dht11"],
            [" ", "DHT11 溫濕度感測器(D) %n", "dht11", 2],
            ["r", "HC-SR04 距離", "distance_HC-SR04"],
            [" ", "距離感測器HC-SR04 trig %n echo(A) %n", "distance", 10, 0],
		],
        menus: {
        intense: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        type: ["raw", "json_thingspeak", "json_opendata"],
        key: ["field1", "field2"],
        database: ["thingspeak"],

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register(' ', descriptor, ext);


})({});