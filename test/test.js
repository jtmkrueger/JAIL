// Create new YUI instance, and populate it with the required modules
YUI().use("node", "console", "test", "node-event-simulate", function (Y) {
 
	// Test Case for delayed images loaded
		var testCaseAsynch = new Y.Test.Case({
			name: "TestCase Images loaded after timeout",
			setUp : function() {
				$('#container')
					.append('<img class="lazy" data-href="../sample1.jpg" src="../img/blank.jpg" width="200" height="200"/> ')
					.append('<img class="lazy" data-href="../sample2.jpg" src="../img/blank.jpg" width="200" height="200" style="position:absolute; left:-1000px;"/> ')
			},
			tearDown : function() {
				$('.lazy').remove();
			},

			"test Images Loaded Asynchronously after DOM is ready - Demo/Example 1" : function() {
				// Call to the method
				$('img.lazy').jail();

				this.wait(function(){
					Y.Assert.areEqual("../sample1.jpg", $('img.lazy').attr("src"));
					Y.Assert.isUndefined( $('img.lazy').attr('data-href'));
				}, 10);
			},

			"test Images Loaded Asynchronously with 1 seconds Delay - Demo/Example 5" : function () {
				// Call to the method with timeout
				$('img.lazy').asynchImageLoader({timeout : 1000 });

				Y.Assert.areEqual("../img/blank.jpg", $('img.lazy').attr("src"));

				this.wait(function(){
					Y.Assert.areEqual("../sample1.jpg", $('img.lazy').attr("src"));
				}, 1000);
			},

			"Visible images should load immediately and hidden images on a delay" : function () {
				$('img.lazy').asynchImageLoader({ event:'load', timeout : 1000 });

				Y.Assert.areEqual( "../sample1.jpg", $('img.lazy:first').attr("src") );
				Y.Assert.areEqual( "../img/blank.jpg", $('img.lazy:last').attr("src") );

				this.wait(function(){
					Y.Assert.areEqual( "../sample2.jpg", $('img.lazy:last').attr("src") );
				}, 1001);
			},
			
			"Visible images should load immediately with offset 100 - Demo/Example 7" : function () {
				$('img.lazy').asynchImageLoader({timeout : 1000, offset: 100 });

				Y.Assert.areEqual("../img/blank.jpg", $('img.lazy').attr("src"));

				this.wait(function(){
					Y.Assert.areEqual("../sample1.jpg", $('img.lazy').attr("src"));
				}, 1000);
			}
		});
	
		// Test Case for images loading after a click
		var testCaseClickAsynch = new Y.Test.Case({
			name: "TestCase Images loaded after a click",
			setUp : function() {
				$('#container')
					.append('<a class="link">Link</a><img id="img1" class="lazy" data-href="img1.jpg" src="blank.jpg" width="1" height="10"/><img class="lazy" data-href="img2.jpg" src="blank.jpg" /> ')
					.append('<a class="link2">Link</a><img class="lazy" data-href="img3.jpg" src="blank.jpg" /><img class="lazy" data-href="img4.jpg" src="blank.jpg" 	/>');
			},
			tearDown : function() {
				$('.lazy').remove();
				$('.link').remove();
				$('.link2').remove();
			},

			"test All Images Loaded after a click on a link - Demo/Example 2" : function () {
				$('img.lazy').jail({event: "click", selector : "a.link" });

				// Click on the link
				Y.one("a.link").simulate("click");

				this.wait(function() {
					Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
					Y.Assert.areEqual("img2.jpg", $('img.lazy').eq(1).attr("src"));
					Y.Assert.areEqual("img3.jpg", $('img.lazy').eq(2).attr("src"));
					Y.Assert.areEqual("img4.jpg", $('img.lazy').eq(3).attr("src"));
				}, 100);
			},

			"test Image Fades in after a click on the placeholder for the image  - Demo/Example 3" : function () {
				$('img.lazy').asynchImageLoader({event: "click", effect : "fadeIn", placeholder: "img/loader" });

				Y.one("#img1").simulate("click");

				Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
				Y.Assert.areEqual("img/loader", $('img.lazy').eq(1).attr("src"));
				Y.Assert.areEqual("img/loader", $('img.lazy').eq(2).attr("src"));
				Y.Assert.areEqual("img/loader", $('img.lazy').eq(3).attr("src"));
			}
		});

		// Test Case for images loading after mouseover on a div
		var testCaseMouseOverAsynch = new Y.Test.Case({
			name: "TestCase Images loaded after mousing over on a div",
			setUp : function() {
				$('#container').append('<div id="tool" class="tool"></div><img id="img1" class="lazy" data-href="img1.jpg" src="blank.jpg" /><img class="lazy" data-href="img2.jpg" src="blank.jpg" /> ');
				$('body').append('<div id="wrapper"><div class="container2"><a class="link2">Link</a><img class="lazy" data-href="img3.jpg" src="blank.jpg" /><img class="lazy" data-href="img4.jpg" src="blank.jpg" /></div></div>');
			},
			tearDown : function() {
				$('.tool').remove().empty();
				$('.lazy').remove().empty();
				$('.link').remove().empty();
				$('#wrapper').remove().empty();
			},

			"test All Images Loaded after a mouse over on a div" : function () {
				$('img.lazy').jail({event: "mouseover", selector : ".tool" });

				//Click on the link
				Y.one("#tool").simulate("mouseover");

				this.wait(function() {
					Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
					Y.Assert.areEqual("img2.jpg", $('img.lazy').eq(1).attr("src"));
					Y.Assert.areEqual("img3.jpg", $('img.lazy').eq(2).attr("src"));
					Y.Assert.areEqual("img4.jpg", $('img.lazy').eq(3).attr("src"));

					testCaseMouseOverAsynch.tearDown();
				}, 100);
			},

			"test Image loading after mousing over - Demo/Example 4" : function() {
				testCaseMouseOverAsynch.setUp();

				$('img.lazy').asynchImageLoader({event: "mouseover"});

				Y.one("#img1").simulate("mouseover");

				Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(1).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(2).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(3).attr("src"));

				testCaseMouseOverAsynch.tearDown();
			}
		});
		
		// Test Case for images loading after mouseover on a div
		var testCaseMouseOverAsynch = new Y.Test.Case({
			name: "TestCase Images loaded after mousing over on a div",
			setUp : function() {
				$('#container').append('<div id="tool" class="tool"></div><img id="img1" class="lazy" data-href="img1.jpg" src="blank.jpg" /><img class="lazy" data-href="img2.jpg" src="blank.jpg" /> ');
				$('body').append('<div id="wrapper"><div class="container2"><a class="link2">Link</a><img class="lazy" data-href="img3.jpg" src="blank.jpg" /><img class="lazy" data-href="img4.jpg" src="blank.jpg" /></div></div>');
			},
			tearDown : function() {
				$('.tool').remove().empty();
				$('.lazy').remove().empty();
				$('.link').remove().empty();
				$('#wrapper').remove().empty();
			},

			"test All Images Loaded after a mouse over on a div" : function () {
				$('img.lazy').asynchImageLoader({event: "mouseover", selector : ".tool" });

				//Click on the link
				Y.one("#tool").simulate("mouseover");

				this.wait(function() {
					Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
					Y.Assert.areEqual("img2.jpg", $('img.lazy').eq(1).attr("src"));
					Y.Assert.areEqual("img3.jpg", $('img.lazy').eq(2).attr("src"));
					Y.Assert.areEqual("img4.jpg", $('img.lazy').eq(3).attr("src"));

					testCaseMouseOverAsynch.tearDown();
				}, 100);
			},

			"test Image loading after mousing over" : function() {
				testCaseMouseOverAsynch.setUp();

				$('img.lazy').asynchImageLoader({event: "mouseover"});

				Y.one("#img1").simulate("mouseover");

				Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(1).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(2).attr("src"));
				Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(3).attr("src"));

				testCaseMouseOverAsynch.tearDown();
			}
		});
		
		var testCaseCallbacks = new Y.Test.Case({
			name: "TestCase Images for callbacks",
			
			setUp : function() {
				$('#container').append('<div id="tool" class="tool"></div><img id="img1" class="lazy" data-href="img1.jpg" src="blank.jpg" /><img class="lazy" data-href="img2.jpg" src="blank.jpg" /> ');
				$('body').append('<div id="wrapper"><div class="container2"><a class="link2">Link</a><img class="lazy" data-href="img3.jpg" src="blank.jpg" /><img class="lazy" data-href="img4.jpg" src="blank.jpg" /></div></div>');
			},
			
			tearDown : function() {
				$('.tool').remove().empty();
				$('.lazy').remove().empty();
				$('.link').remove().empty();
				$('#wrapper').remove().empty();
			},
			
			"test Image loading after mousing over and callbackAfterEachImage - Demo/Example 4" : function() {
					testCaseMouseOverAsynch.setUp();
					var global1 = 3;

					$('img.lazy').asynchImageLoader({event: "mouseover", effect: 'fadeIn',speed : '1500',callbackAfterEachImage : (function(){global1=5;}) });

					Y.one("#img1").simulate("mouseover");

					Y.Assert.areEqual("img1.jpg", $('img.lazy').eq(0).attr("src"));
					Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(1).attr("src"));
					Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(2).attr("src"));
					Y.Assert.areEqual("blank.jpg", $('img.lazy').eq(3).attr("src"));
					Y.Assert.areEqual(5, global1);

					testCaseMouseOverAsynch.tearDown();
			}
		});

	var console = new Y.Console({
		verbose: true,
		newestOnTop: false,
		style: "separate", // This prevents the Logger console from interferring with the tests
		width:"600px",
		height:"900px"
	});

	console.render('#testLogger');

	Y.Test.Runner.add(testCaseAsynch);
	Y.Test.Runner.add(testCaseClickAsynch);
	Y.Test.Runner.add(testCaseMouseOverAsynch);
	Y.Test.Runner.add(testCaseCallbacks);
	Y.Test.Runner.run();

	// Ensure that the test window isn't scrolled itself, or tests will fail!
	$(window).scrollTop(0);
	$('body').css('overflow','hidden'); // Prevent the scrolling of the test window to prevent false test failures
3});
