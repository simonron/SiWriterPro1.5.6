	//
	

		//  TRADITIONAL MODAL (FROM 0.8.x)
		//
		
			var b2 = Titanium.UI.createButton({
			title: 'Open (Nav Bar Covered)',
			width: 200,
			height: 40,
			top: 60
		});
		
		var b3 = Titanium.UI.createButton({
			title: 'Traditional Modal',
			width: 200,
			height: 40,
			top: 110
		});
		
		var SiWriter_help_win = Titanium.UI.createWebView({
	backgroundColor : '#FFF',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	zIndex :0,
});

		b3.addEventListener('click', function() {
			var Win = require('help_win'),
				win3 = new Win({title: 'Modal Window'}),
				b = Titanium.UI.createButton( {title: 'Close'} );

			win3.title = 'Modal Window';
			win3.barColor = 'black';
			win3.add(b);
			win3.add(SiWriter_help_win);
			
			b.addEventListener('click',function() {
				win3.close();
			});
			win3.open({ modal: true });
		});
	{
			b2.addEventListener('click', function() {
				var options = {
					backgroundColor: '#336699',
					bottom: 0,
					right: 0
				};
		{
					options.height = 0;
					options.width = 0;
				}
				var win3 = Titanium.UI.createWindow(options);
				var a = Titanium.UI.createAnimation();

				// NOTE: good example of making dynamic platform height / width values
				// iPad vs. iPhone vs Android etc.
				if (isIOS) {
					a.height = Ti.UI.FILL;
					a.width = Ti.UI.FILL;
				} else {
					a.height = Titanium.Platform.displayCaps.platformHeight;
					a.width = Titanium.Platform.displayCaps.platformWidth;
				}
				a.duration = 300;

				// create a button to close window
				var b = Titanium.UI.createButton({
					title: 'Close',
					height: 30,
					width: 150	
				});
				win3.add(b);
				b.addEventListener('click', function() {
					a.height = 0;
					a.width = 0;
					win3.close(a);
				});


win3.add(SiWriter_help_win);
				win3.open(a);				
			});
		}

		