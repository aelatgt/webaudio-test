		var ctx; //audio context
		var buffersA=new Array();
		var sources=new Array();
		var files=new Object();
		
		//init the sound system
		function init() {
			console.log("in init");
			try {
				ctx = new webkitAudioContext(); 
			} catch(e) {
				alert('you need webaudio support');
			}
		}

		//load and decode mp3 file
		function loadFile(fname) {
			var req = new XMLHttpRequest();
			req.open("GET",fname,true);
			req.responseType = "arraybuffer";
			req.onload = function() {
				//decode the loaded data
				ctx.decodeAudioData(req.response, function(buffer) {
					buffersA.push(buffer);	
					sources.push(ctx.createBufferSource());
					files[fname]=buffersA.length-1;
				});
			};
			req.send();
		}
		
		
		
		//play the loaded file
		function play(fname) {
			var index=files[fname];
			console.log("i"+index);
			//create a source node from the buffer
			sources[index].buffer = buffersA[index];
			//connect to the final output node (the speakers)
			sources[index].connect(ctx.destination);
			sources[index].loop=true;
			//play immediately
			sources[index].noteOn(0);
		}
		
		function stop(fname)
		{	
			var index=files[fname];
			sources[index].noteOff(0);
			sources[index]=ctx.createBufferSource();
		}