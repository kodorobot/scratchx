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
	
    ext.slider = function(){
        return sensor_data["slider"];
	}
    
    ext.button = function(){
        return sensor_data["button"];
	}
    
    ext.light = function(){
        return sensor_data["light"];
	}
    
    ext.sound = function(){
        return sensor_data["sound"];
	}
    
    ext.resistance_A = function(){
        return sensor_data["resistance-A"];
	}
    
    ext.resistance_B = function(){
        return sensor_data["resistance-B"];
	}
    
    ext.resistance_C = function(){
        return sensor_data["resistance-C"];
	}
    
    ext.resistance_D = function(){
        return sensor_data["resistance-D"];
	}
    
    ext.getbool = function(type){
        var type = "getbool/" + type;
		var value = sensor_data[type];
		return value;
	}
    
    ext.getvalue = function(type){
        var type = "getvalue/" + type;
		var value = sensor_data[type];
		return value;
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
            [ "r", "slider", "slider" ],
            [ "r", "button", "button" ],
            [ "r", "light", "light" ],
            [ "r", "sound", "sound" ],
            [ "r", "resistance-A", "resistance_A" ],
            [ "r", "resistance-B", "resistance_B" ],
            [ "r", "resistance-C", "resistance_C" ],
            [ "r", "resistance-D", "resistance_D" ],

            [ "b", "sensor %m.booleanSensor?", "getbool", "button pressed" ],
            [ "r", "%m.sensor sensor value", "getvalue", "slider" ],
		],
        menus: {
            booleanSensor: [ "button pressed", "A connected", "B connected", "C connected", "D connected" ],
            sensor: [ "slider", "light", "sound", "resistance-A", "resistance-B", "resistance-C", "resistance-D" ],
    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register(' ', descriptor, ext);


})({});