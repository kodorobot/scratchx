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

  ext._getStatus = function() {
    return { status:2, msg:'Ready' };
  };

  ext._shutdown = function() {
  };

  var descriptor = {
    blocks: [
        [" ", "%m.pin_state : �Ʀ�}�� %n �� %m.digital_pin_mode", "digital_pin_mode", "�ҥ�", "���X", "��J"],
		[" ", "%m.pin_state : ����}��(A) %n �� ��J", "analog_pin_mode", "�ҥ�", "���X"],
		["", "�Ʀ��X: �]�w�}�� %n �� %m.high_low", "digital_write", "���X", 0],
		["", "���������X(PWM): �]�w�}�� %n ���Ȭ�  %n", "analog_write", "���X", "�ƶq��"],
		["", "�b�}�� %n ���񭵽�, �W�v��: %n Hz, �ɶ���: %n ms", "play_tone", "���X", 1000, 500],
		["", "�����}�� %n ������", "tone_off", "���X"],
		["", "�]�w�� %n �}�쬰���A����X ��ʨ��׬� %n", "set_servo_position", "���X", 90],
		["r", "Ū���Ʀ�}�� %n ����", "digital_read", "���X"],
		["r", "Ū������}��(A) %n ����", "analog_read", "���X"],
		["", "�����u�� %m.off_on", "debugger", "��"]
    ],
    menus: {
      off_on: ["��", "�}"],
	pin_state: ["�ҥ�", "����"],
	digital_pin_mode: ["��J", "��X", "PWM", "���A��", "����", "�W���i"],
	high_low: ["0", "1"]
    },
    url: 'http://khanning.github.io/scratch-isstracker-extension'
  };

  ScratchExtensions.register('S2Aplus', descriptor, ext);

})({});