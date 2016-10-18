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
	
	
	ext.OutPinOn = function(pin){
		send("/OutPinOn/" + 0 + "/" + pin);
	}
	
	ext.OutPinOff = function(pin){
		send("/OutPinOff/" + 0 + "/" + pin);
	}
	
	ext.analogOutPin = function(pin,value){
		send("/analogOutPin/" + 0 + "/" + pin + "/" + value);
	}
	
	ext.MotorDirection = function(pin, way){
		send("/MotorDirection/" + 0 + "/" + pin + "/" + way);
	}
	
	ext.motoroff = function(pin){
		send("/motoroff/" + 0 + "/" + pin);
	}
	
	ext.motorangle = function(pin, angle){
		send("/motorangle/" + 0 + "/" + pin + "/" + angle);
	}
	
	ext.getbool = function(pin){
		var pin = "getbool/" + pin;
		var value = sensor_data[pin];
		return value;
	}
	
	ext.getvalue = function(pin){
		var pin = "getvalue/" + pin;
		var value = sensor_data[pin];
		return value;
	}
	
	ext.Analog0 = function(){
		return sensor_data["Analog0"];
	}
	
	ext.Analog0 = function(){
		return sensor_data["Analog0"];
	}
	
	ext.Analog1 = function(){
		return sensor_data["Analog1"];
	}
	
	ext.Analog2 = function(){
		return sensor_data["Analog2"];
	}
	
	ext.Analog3 = function(){
		return sensor_data["Analog3"];
	}
	
	ext.Analog4 = function(){
		return sensor_data["Analog4"];
	}
	
	ext.Analog5 = function(){
		return sensor_data["Analog5"];
	}
	
	ext.Digital2 = function(){
		return sensor_data["Digital2"];
	}
	
	ext.Digital3 = function(){
		return sensor_data["Digital3"];
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
	
    ext.httpPOST = function(url){
        url = replaceAll(url,"/","%2F")
        send("/httpPOST/" + url);
	}
	
    ext.httpGET = function(url){
        url = replaceAll(url,"/","%2F")
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
        connection = new WebSocket('ws://' + ip + ':' + port + "/ws");
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
			[' ', '連接 Transformer', 'connect'],
            ["r", "Analog0", "Analog0"],
			["r", "Analog1", "Analog1"],
			["r", "Analog2", "Analog2"],
			["r", "Analog3", "Analog3"],
			["r", "Analog4", "Analog4"],
			["r", "Analog5", "Analog5"],
			["r", "Digital2", "Digital2"],
			["r", "Digital3", "Digital3"],
			["r", "value of sensor %m.ValueOfSensor", "getvalue", "Analog0"],
			["b", "sensor %m.d2d3 pressed?", "getbool", "Digital2"],
			["w", "digital %m.digitalOutPin on", "OutPinOn", "13"],
			["w", "digital %m.digitalOutPin off", "OutPinOff", "13"],
			["w", "analog %m.analogOutPin value %n", "analogOutPin", "9", 255],
			["w", "motor  %m.MotorPin off", "motoroff", "8"],
			["w", "motor  %m.MotorPin direction %m.MotorDirection", "MotorDirection", "8", "clockwise"],
			["w", "motor  %m.MotorPin angle %n", "motorangle", "8", 180],

		],
        menus: {
            d2d3: ["Digital2", "Digital3"],
            ValueOfSensor: ["Analog0", "Analog1", "Analog2", "Analog3", "Analog4", "Analog5"],
            MotorDirection: ["clockwise", "anticlockwise"],
            digitalOutPin: ["13", "12", "11", "10"],
            MotorPin: ["8", "7", "4"],
            bodyPart: ["head", "shoulder", "elbow", "hand"],
            coordinate: ["x", "y", "z"],
            analogOutPin: ["9", "6", "5"],

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register(' ', descriptor, ext);


})({});