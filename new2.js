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
	
	function socketConnection(ip, port) {
        connection = new WebSocket('ws://' + ip + ':' + port);
        connection.onopen = function (e) {
            isConnected = true;
        };
        connection.onclose = function (e) {
            isConnected = false;
        };
        connection.onmessage = function (e) {
            console.log(e.data);
            if (e.data[0] != "{")
                return;

            var jsonObj = JSON.parse(e.data.substring(0, e.data.length - 1));

        };
        connection.onerror = function (e) {
            isConnected = false;
        };
    }

    var descriptor = {
		blocks: [
			[" ", "%m.pin_state : 數位腳位 %n 為 %m.digital_pin_mode", "digital_pin_mode", "啟用", "號碼", "輸入"],
			[" ", "%m.pin_state : 類比腳位(A) %n 為 輸入", "analog_pin_mode", "啟用", "號碼"],
			["", "數位輸出: 設定腳位 %n 為 %m.high_low", "digital_write", "號碼", 0],
			["", "模擬類比輸出(PWM): 設定腳位 %n 的值為  %n", "analog_write", "號碼", "數量值"],
			["", "在腳位 %n 播放音調, 頻率為: %n Hz, 時間為: %n ms", "play_tone", "號碼", 1000, 500],
			["", "關閉腳位 %n 的音調", "tone_off", "號碼"],
			["", "設定第 %n 腳位為伺服機輸出 轉動角度為 %n", "set_servo_position", "號碼", 90],
			["r", "讀取數位腳位 %n 的值", "digital_read", "號碼"],
			["r", "讀取類比腳位(A) %n 的值", "analog_read", "號碼"],
		],
		menus: {
			pin_state: ['啟用', '停用'],
			digital_pin_mode: ['輸入', '輸出', 'PWM', '伺服機', '音調'],
			high_low: ["0", "1"]
    },
		url: 'https://kodorobot.github.io/scratchx/'
  };

	ScratchExtensions.register('S2Aplus', descriptor, ext);


})({});