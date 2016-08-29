{ 
	"extensionName": " 1",
 	"extensionPort": 50209,
 	"blockSpecs": 
 	[
	
		["r", "Analog0",  "Analog0"],
		["r", "Analog1",  "Analog1"],
		["r", "Analog2",  "Analog2"],
		["r", "Analog3",  "Analog3"],
		["r", "Analog4",  "Analog4"],
		["r", "Analog5",  "Analog5"],
		["r", "Digital2", "Digital2"],
		["r", "Digital3", "Digital3"],
		["r", "value of sensor %m.ValueOfSensor", "getvalue", "Analog0"],
		["b", "sensor %m.d2d3 pressed?", "getbool", "Digital2"],
		["w", "digital %m.digitalOutPin on", "OutPinOn","13"],
		["w", "digital %m.digitalOutPin off", "OutPinOff","13"],
		["w", "analog %m.analogOutPin value %n", "analogOutPin", "9", 255],
		["w", "motor  %m.MotorPin off", "motoroff", "8"],
		["w", "motor  %m.MotorPin direction %m.MotorDirection","MotorDirection","8","clockwise"],
		["w", "motor  %m.MotorPin angle %n","motorangle", "8", 180],
 	],
 	"menus": 
 	{
		"ValueOfSensor"  : ["Analog0", "Analog1", "Analog2", "Analog3", "Analog4", "Analog5"],
		"d2d3"  : ["Digital2","Digital3"],
		"digitalOutPin"  : ["13","12","11","10"],
		"analogOutPin"   : ["9","6","5"],
		"MotorPin"		 : ["8","7","4"],
		"MotorDirection" :  ["clockwise","anticlockwise"],
		"coordinate": ["x", "y", "z"],
		"bodyPart": ["head", "shoulder", "elbow", "hand"], 	
	},
}