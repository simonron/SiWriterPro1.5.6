
		var label = Titanium.UI.createButton({
			title:'Custom Toolbar',
			color:'#fff',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
	
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var close = Titanium.UI.createButton({
			title:'Close',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		var hello = Titanium.UI.createButton({
			title:'Hello',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});

		// create and add toolbar
		var toolbar = Titanium.UI.iOS.createToolbar({
			items:[hello,flexSpace,label, flexSpace,close],
			top:0,
			borderTop:false,
			borderBottom:true,
			zIndex:10,
		});

	
	