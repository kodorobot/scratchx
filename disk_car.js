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
	
    ext.3_color_led_red = function(value){
        send("/3_color_led_red/" + value);
	}
    
    ext.3_color_led_green = function(value){
        send("/3_color_led_green/" + value);
	}
    
    ext.3_color_led_blue = function(value){
        send("/3_color_led_blue/" + value);
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
            [" ", "L293D A側狀態 %m.state 速度 %n", "l293d_dira", "正轉", 0],
            [" ", "L293D B側狀態 %m.state 速度 %n", "l293d_dirb", "正轉", 0],
            [" ", "三色LED紅色 值 %n", "3_color_led_red", 0],
            [" ", "三色LED綠色 值 %n", "3_color_led_green", 0],
            [" ", "三色LED藍色 值 %n", "3_color_led_blue", 0],
            [" ", "蜂鳴器 頻率為: %n Hz, 時間為: %n ms", "play_tone", 1000, 500],

		],
        menus: {
            high_low: ["0", "1"],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('LCD1602', descriptor, ext);


})({});