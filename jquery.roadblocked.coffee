###
jQuery.Roadblocked (0.1)
Rapidly implement device-targeted, landing interstitials for mobile + tablet visitors to your site.
Source: http://github.com/bsheldon/jquery.roadblocked by @ojogringo
Built from coffee-plate: http://github.com/pthrasher/coffee-plate by @philipthrasher
Requires: jquery, jquery-cookie
###

(($) ->
  
  $.roadblocked = (el, options) ->
    @el = el
    @$el =  $ el
    @$el.data "roadblocked", @
    
    @init = =>
      @options = $.extend {}, $.roadblocked.defaults, options
      detectedDevice = scanDevice @options.devices
      # if specified device present and not cookied, proceed
      if (interstitial = @options.devices[detectedDevice]) and (jQuery.cookie("#{@options.campaignName}") != 'done')
        dismiss = buildDismissUI()
        content = @setContent(interstitial)
        link = interstitial['link']
        @placeInterstitial(dismiss, content, link, detectedDevice)
        setCookie(@options.lifetime, @options.campaignName)
      # return this
      @
    
    # Check current user's device and return with match
    scanDevice = (devices) =>
      present = ''
      featured_list = []
      for d of devices
        featured_list.push(d)
      device_agent = navigator.userAgent.toLowerCase()
      for device in featured_list
        do (device) ->
          if device_agent.indexOf(device) > -1 
            if device == 'android'
              # verify this is an android phone, not tablet
              if device_agent.indexOf('mobile') > -1
                present = device
            else
              present = device
      return present
     
    # Append interstitial element to target
    @placeInterstitial = (dismiss, content, link, device) =>
      container = $('<div\>', { id: 'roadblocked-container', class: device })
      container.html('')
      container.css
        'background-color' : @options.overlayBackgroundColor
        'top' : '0'
        'left' : '0'
        'height' : '100%'
        'width' : '100%'
        'position' : 'absolute'
        'z-index' : '100'
        'margin' : '0'
        'display' : 'block',
        'overflow': 'hidden'
      $('body').prepend(container)
      $('#roadblocked-container').prepend(dismiss)
      if @options.dismissPlacement == 'top'
        $('#dismiss-bar').after(content)
      else if @options.dismissPlacement == 'bottom'
        $('#dismiss-bar').before(content)
      else
        $('#dismiss-bar').after(content)
      # set tap regions to links
      $('#dismiss-bar').click(->
        $('#roadblocked-container').hide()
      )
      $('#inter-content').click(->
        if link?
          window.location = "#{link}"
          $('#roadblocked-container').hide()
      )
         
    # Build dismiss bar
    buildDismissUI = =>
      dismissLabel = @options.dismissLabel
      # if message is text, build standard label
      if typeof dismissLabel == 'string'
        self = $('<div\>', { id: 'dismiss-bar' })
        self.css
          'height' : "#{@options.dismissLabelHeight}"
          'background-color' : "#{@options.overlayBackgroundColor}"
          'text-align' : "#{@options.dismissLabelAlign}"
          'background-image' : "url('#{@options.imgPath}/#{@options.dismissLabel}')"
          'background-position' : "#{@options.dismissLabelAlign}"
          'background-repeat' : 'no-repeat'
          'background-size' : '75%'
        return self 
      # if jQuery object place it as dismiss UI
      else if typeof dismissLabel == 'object'
        dismissLabel.attr('id','dismiss-bar')
        dismissLabel.show()
        return dismissLabel 
    
    # Set interstitial content   
    @setContent = (interstitial) =>
      if interstitial['img']?
        self = $('<div\>', { id: 'inter-content' })
        # if dismiss label is image, use height config value to calculate diff
        if typeof @options.dismissLabel == 'string'
          height = (100 - parseFloat @options.dismissLabelHeight).toString() + '%'
        else
          height = '100%'
        self.css
          'height' : height
          'width' : '100%'
          'background-image' : "url('#{@options.imgPath}/#{interstitial['img']}')"
          'background-position' : 'top'
          'background-repeat' : 'no-repeat'
          'background-size' : 'cover'
        return self 
      else if interstitial['selector']?
        interstitial['selector'].attr('id','inter-content')
        interstitial['selector'].show()
        return interstitial['selector']        
    
    setCookie = (lifetime, campaign) ->
      jQuery.cookie("#{campaign}", 'done', { expires: lifetime })
      
    # Method to check whether device is retna display
    @isRetna = =>
      window.devicePixelRatio > 1 ? true : false
      
    @init()
      
  $.roadblocked.defaults =
    imgPath : 'images' # defaults to local images dir for plugin
    retnaPath : 'images/retna' # retna versions of files in subfolder retna
    overlayBackgroundColor : '#000'
    dismissLabelHeight : '7.5%' # sets relative percentage of screen
    dismissLabelAlign : 'center'  # left, center, right (defaults right)
    dismissPlacement : 'top' # top or bottom (default top)
    lifetime : 0 # run once per X period in days, 0 to run every visit
    campaignName : 'jqueryRoadblocked'

  $.fn.roadblocked = (options) ->
    $.each @, (i, el) ->
      $el = ($ el)
      # Only instantiate if not previously done.
      unless $el.data 'roadblocked'
        $el.data 'roadblocked', new $.roadblocked el, options
  undefined
        
)(jQuery)
