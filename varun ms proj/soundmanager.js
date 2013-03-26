
		var SoundManager =
		{
			ctx:null, //audio context
			buf:null, //audio buffer
			gainNode: null,
			bufA:null,
			src:null,
			srcA:null,
			srcN:null,
			srcU:null,
			srcAw:null,
			srcS:null,

			//init the sound system
			init: function() 
			{
				console.log("in init");
				try {
					ctx = new webkitAudioContext(); 
					var req = new XMLHttpRequest();
					req.open("GET","sounds/alert.wav",true);
					req.responseType = "arraybuffer";
					req.onload = function() {
					//decode the loaded data
					ctx.decodeAudioData(req.response, function(buffer) {
						bufA= buffer;
					});
					};
					req.send();
				} catch(e) {
				alert('you need webaudio support');
				}
			},
			
			createAlert: function(fname) {
			SoundManager.loadFile(fname,'alert');
			},
			
			createNotification: function(fname) {
			SoundManager.loadFile(fname,'noti');
			},
			
			createUpdate: function(fname) {
			SoundManager.loadFile(fname,'update');
			},
			
			createAwareness: function(fname) {
			SoundManager.loadFile(fname,'aw');
			},
			
			createSpeech: function(fname) {
			SoundManager.loadFile(fname,'speech');
			},
			
			//load and decode mp3 file
			loadFile: function(fname,type) {
				var req = new XMLHttpRequest();
				req.open("GET",fname,true);
				req.responseType = "arraybuffer";
				req.onload = function() {
					//decode the loaded data
					ctx.decodeAudioData(req.response, function(buffer) {
						buf = buffer;
						SoundManager.createSound(type);
					});
				};
				req.send();
			},

			createSound: function(type) {
					if(type=='alert')
					{
					src= ctx.createBufferSource();
					src.buffer = bufA;
					src.connect(ctx.destination);
					src.noteOn(0);
					srcA= ctx.createBufferSource();
					console.log('alert');
					SoundManager.play(1,srcA,src.buffer.duration);
					}
					else if(type=='noti')
					{srcN= ctx.createBufferSource();
					console.log('noti');
					SoundManager.play(1,srcN,3);
					}
					else if(type=='update')
					{srcU=ctx.createBufferSource();
					console.log('update');
					SoundManager.play(1,srcU,0);
					}
					else if(type=='aw')
					{srcAw=ctx.createBufferSource();
					console.log('aw');
					SoundManager.play(0.1,srcAw,0);
					}
					else if(type=='speech')
					{srcS=ctx.createBufferSource();
					console.log('speech');
					SoundManager.play(1,srcS,0);
					}
				
				
			},
			
			//play the loaded file
			play: function(volume,src,startTime) {
				src.buffer = buf;
				//play immediately
				gainNode = ctx.createGainNode();
				gainNode.gain.value = volume;
				// Connect the source to the gain node.
				src.connect(gainNode);
				// Connect the gain node to the destination.
				gainNode.connect(ctx.destination);
				src.noteOn(ctx.currentTime + startTime);
			},
			
			stopA: function(){
				srcA.noteOff(0);
			},
			
			stopN: function(){
				srcN.noteOff(0);
			},
			
			stopU: function(){
				srcU.noteOff(0);
			},
			
			stopAw: function(){
				srcAw.noteOff(0);
			},
			
			stopS: function(){
				srcS.noteOff(0);
			}
			
			
		};
		
