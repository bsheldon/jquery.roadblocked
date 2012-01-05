# jquery.Roadblocked

A jQuery plugin to rapidly implement device-targeted, landing interstitials for mobile + tablet visitors to your site. Basically, with just a few configurations, you can surface full-screen media to specific devices (say iPad) before showing standard page content. Interstitials can be configured to run once per X period for special promotions/campaigns. 

First, the basic setup requires inclusion of jQuery and jQuery.Cookie

```javascript
  <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
  <script type='text/javascript' src='resources/jquery.cookie.js'></script>
  <script type='text/javascript' src='jquery.roadblocked.js'></script>
```

Then, simply attach roadblock to element

```javascript
  $('body').roadblocked({
        'devices' : { iphone : { img:'iphone.jpg', link:'http://your-iphone-promo-url' }},
        'dismissLabel' : 'dismiss_label.jpg', 
    	});
```

And, full set of configuration options for more advanced control

```javascript
  $('body').roadblocked({
    	'devices' : { 
        // Assign each target device an image (or selector) and link (optional) for interstitial content
  			iphone : { img:'iphone.jpg', link:'http://your-iphone-promo-url'},
  			ipod : { img:'ipod.jpg', link: 'http://your-ipod-promo-url' },
  			android : { img:'android.jpg', link: 'http://your-android-promo-url' },
  			ipad : { selector: $('#ipad-dynamic-content'), link: 'http://your-ipad-promo-url' }
  		},
      'imgPath' : 'demo_images', // path to image assets
      'overlayBackgroundColor' : '#000',
      'dismissLabel' : 'dismiss_label.jpg', // image for dismiss label (or selector)
      'dismissLabelAlign' : 'center', // alignment of dismiss label on screen
      'dismissLabelHeight' : '7.5%', // sets relative percentage of screen
      'dismissPlacement' : 'top', // top or bottom of screen (default top)
      'campaignName' : 'your-interstitial-campaign', // unique campaign name
      'lifetime' : 30, // run once per X period in days, 0 to run every visit (default)
      'path' : '/' // cookie path, defaults to full domain scope
  	});
```

Please see the demo page for an example of implementation and details.

  