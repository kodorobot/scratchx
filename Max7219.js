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

		],
        menus: {
        intense: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register(' ', descriptor, ext);


})({});