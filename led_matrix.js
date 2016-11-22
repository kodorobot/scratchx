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
    
    ext.matrix_convert_result = function(){
        return sensor_data["matrix_convert_result"];
	}
    
    ext.matrix_initial = function(pin1, pin2, pin3, mode){
        send("/matrix_initial/" + pin1 + "/" + pin2 + "/" + pin3 + "/" + mode);
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
    
    ext.matrix_shift_out = function(value){
        send("/matrix_shift_out/" + value);
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
            [" ", "%m.pin_state : 數位腳位 %d.digital_pin 為 %m.digital_pin_mode", "digital_pin_mode", "啟用", "號碼", "輸入"],
            [" ", "%m.pin_state : 類比腳位(A) %d.analog_pin 為 %m.analog_pin_mode", "analog_pin_mode", "啟用", "號碼", "輸入"],
            ["", "數位輸出: 設定腳位 %d.digital_pin 為 %d.high_low", "digital_write", "號碼", 0],
            ["", "模擬類比輸出(PWM): 設定腳位 %d.pwm_pin 的值為  %n", "analog_write", "號碼", "數量值"],
            ["", "在腳位 %d.digital_pin 播放音調, 頻率為: %n Hz, 時間為: %n ms", "play_tone", "號碼", 1000, 500],
            ["", "關閉腳位 %d.digital_pin 的音調", "tone_off", "號碼"],
            ["", "設定第 %d.digital_pin 腳位為伺服機輸出 轉動角度為 %n", "set_servo_position", "號碼", 90],
            ["r", "讀取數位腳位 %d.digital_pin 的值", "digital_read", "號碼"],
            ["r", "讀取類比腳位(A) %d.analog_pin 的值", "analog_read", "號碼"],
            ["", "shiftout Din接(D) %n ,Clk接(D) %n ,資料格式: %m.shiftout_type ,資料: %n", "shiftout", "號碼", "號碼", "MSBFIRST", 0],
			["r", "圖形的16位元碼", "matrix_hex_result"],
            ["r", "轉換結果", "matrix_convert_result"],
            [" ", "Din接(D) %n ,CS接(D) %n ,CLK接(D) %n 類型: %m.type", "matrix_initial", 10, 11, 12, "1x1"],
            [" ", "顯示文字(英,數): %s", "matrix_print", ""],
            [" ", "跑馬燈(英,數): %s 延遲: %n (ms)", "matrix_print_scroll", "", 100],
            [" ", "顯示圖形(16位元碼) %s", "matrix_print_hex", ""],
            [" ", "雙位元組傳送 %s", "matrix_shift_out", ""],
            [" ", "清空文字", "matrix_clear"],
            [" ", "左移 模式: %m.shift_type %s", "matrix_scrollDisplayLeft", "預設"],
            [" ", "右移 模式: %m.shift_type %s", "matrix_scrollDisplayRight", "預設"],
            [" ", "上移 模式: %m.shift_type %s", "matrix_scrollDisplayUp", "連續"],
            [" ", "下移 模式: %m.shift_type %s", "matrix_scrollDisplayDown", "連續"],
            [" ", "自訂圖形", "matrix_print_single"],
            [" ", "顯示自訂圖形第 %n 張", "show_matrix_print_single", "1"],
            [" ", "亮度 %d.intense", "matrix_Intensity", 1],
            [" ", "2進位轉16進位 %s", "bin_to_hex", ""],
            [" ", "16進位轉2進位 %s", "hex_to_bin", ""],

		],
        menus: {
            intense: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            type: ["1x1", "2x1", "4x1", "1x2", "2x2", "1x4"],
            shift_type: ["預設", "連續", "位元組傳遞積木"],
            pin_state: ['啟用', '停用'],
            digital_pin_mode: ['輸入',"輸入(pull-up)","輸入(pull-down)", '輸出', 'PWM', '伺服機', '音調'],
            analog_pin_mode: ["輸入", "輸入(pull-up)", "輸入(pull-down)"],
            high_low: ["0", "1"],
            digital_pin: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "A0", "A1", "A2", "A3", "A4", "A5"],
            analog_pin: ["0", "1", "2", "3", "4", "5"],
            pwm_pin: ["3", "5", "6", "9", "10", "11"],
            shiftout_type: ["MSBFIRST", "LSBFIRST"],

    },
        url: 'https://kodorobot.github.io/scratchx/'
  };

    ScratchExtensions.register('Max7219', descriptor, ext);


})({});