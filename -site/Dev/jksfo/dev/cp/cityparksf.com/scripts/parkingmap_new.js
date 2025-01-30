
var geocoder;
var myDest;

var markerImgOver = 'https://maps.google.com/mapfiles/kml/pal4/icon7.png';
var markerImgStd = 'https://maps.google.com/mapfiles/kml/pal4/icon15.png';

var mapOpts = {
    center: new google.maps.LatLng(37.793737,-122.416706),
    overviewMapControl: true,
    scaleControl: true,
    zoomControlOptions: {
        position:google.maps.ControlPosition.TOP_RIGHT
    },
    panControlOptions: {
        position:google.maps.ControlPosition.TOP_RIGHT
    },
    zoom: 14,
    scrollwheel: false
}

var imageStd = {
    url: 'https://maps.google.com/mapfiles/kml/pal4/icon15.png',
    // This marker is 32 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(32, 16)
};

var imageOvr = {
    url: 'https://maps.google.com/mapfiles/kml/pal4/icon7.png',
    // This marker is 32 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(32, 16)
}

var shadow = {
    url: 'https://www.google.com/mapfiles/shadow50.png',
    // This marker is 32 pixels wide by 32 pixels tall.
    size: new google.maps.Size(16, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(32, 32)
};

var theMap;
var infoWins = new Array();
var markers = new Array();
var byDist = new Array();

$(window).resize(function() {
    // This will execute whenever the window is resized
    $(window).height(); // New height
    $(window).width(); // New width
});

$(document).ready(function(){
    
    $(".accordion_icon").click(accordControl);
    $('.arrow_container').click(slidePane);
    
    function closeAllWins() {
        for(i=0;i<infoWins.length;i++) {
            infoWins[i].close();
        }
        $('.information_window').each(function(){
            $(this).hide();
        });
    }
    function closeBroker(){
        if(!($('.parking_broker .accordion_icon').hasClass('open'))){
            $('.parking_broker .accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
            $('.parking_broker').find('.collapse').slideToggle('fast');
        }
    }
    function searchAccordControl(){
        closeAllWins();
        closeBroker();
        var icon = $('.loc_list').find('.accordion_icon');
        if(icon.hasClass('open')){
            icon.removeClass('open').css('background-image','url("../images/close_acc.png")');
            icon.parent().find('.collapse').slideToggle('fast');
        }
    }
    function accordControl() {
        closeAllWins();
        if($('.location_windows').css("display") == "block"){
            $('.location_windows').css("display","none");
        }
        if($(this).hasClass('open')){
            $(this).removeClass('open').css('background-image','url("../images/close_acc.png")');
            $(this).parent().find('.collapse').slideToggle('fast');
        } else{
            $(this).addClass('open').css('background-image','url("../images/open_acc.png")');
            $(this).parent().find('.collapse').slideToggle('fast');
        }
    }
    function resetMapIcons() {
        for(i=0;i<markers.length;i++) {
            markers[i].setIcon(imageStd);
        }
    }

    function sortByDist(a,b) {
        var d1 = a[1];
        var d2 = b[1];
        return ((d1 < d2) ? -1 : ((d1 > d2) ? 1 : 0));

    }

    function geoCodeAddress(address,maxDist) {
        // remove the marker from the map if it exists
        if (myDest instanceof google.maps.Marker) {
            myDest.setMap(null);
        }

        if (address.length > 0) { // only geocode if we have an address
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    myDest = new google.maps.Marker({
                        map: theMap,
                        position: results[0].geometry.location
                    });
                    theMap.setCenter(results[0].geometry.location);
                    buildGarageListByDist(address,maxDist);
                } else {
                    $('form').find('.parking-info').css('color','red');
                }
            });
        }
    }

    function buildGarageListByDist(address,maxDist) {

        resetMapIcons();
        $('#select-location').find('.locations').remove().end();
        byDist = new Array(); // reset by dist list
        if (myDest instanceof google.maps.Marker) {
            for(j=0;j<markers.length;j++) {
                tdist = google.maps.geometry.spherical.computeDistanceBetween(myDest.getPosition(),markers[j].getPosition());

                if (tdist <= maxDist) {
                    byDist.push(new Array(markers[j],tdist));
                }
            }
            if (byDist.length < 1) {
                $('.address_box').find('label').remove();
                $('.address_box').append('<label>For: '+address+'</label>');
                $('.warning').show();
                $('.search_results').hide();
                $('.loc_list').show();
            } else {
                byDist = byDist.sort(sortByDist);

                for(j=0;j<byDist.length;j++) {
                    byDist[j][0].setIcon(imageOvr);
                    $('.warning').hide();
                    $('.address_box').find('label').remove();
                    $('.address_box').append('<label>For: '+address+'</label>');
                    $('#select-location').append('<div class="locations" data-value="'+j+'">'+byDist[j][0].getTitle()+'</div>');
                    $('.search_results').show();
                }
                $('.loc_list').show();
            }
        } else {
            alert("Please input your destination!");
        }

        $('.locations').click(function() {
            idx = $(this).attr('data-value');
            if (idx) {
                closeAllWins();
                m = byDist[idx][0];
                $('.search_criteria').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
                $('.search_criteria').find('.collapse').slideUp('fast');
                google.maps.event.trigger(m, 'click');
            }
        });
    }

    geocoder = new google.maps.Geocoder();
    theMap = new google.maps.Map(document.getElementById('map'), mapOpts);
    $.ajax({
        dataType: "json",
        async: false,
        url:'parkingmap/garages.json',
        success: function(data) {
            $.each( data.markers, function(i, m) {

                idx = infoWins.push(new google.maps.InfoWindow({
                    content: m.html
                }));

                infoWins[idx-1].set('gid',""+m.ID+"");

                midx = markers.push(new google.maps.Marker({
                    icon: imageStd,
                    shadow: shadow,
                    position: new google.maps.LatLng(m.Lat, m.Lng),
                    map: theMap,
                    title: m.Name
                }));
                markers[midx-1].set('widx',idx);

                var loc_win = "<div id='info-win-"+m.ID+"' class='information_window'><div class='close_icon'></div><div class='arrow_container' onclick='slidePane();'><div class='arrow-left'></div></div><h3>"+m.Name+"</h3><p>"+m.Address+"<br>"+m.City+"<br><a tel='"+m.Telephone+"' class='telnumber'>"+m.Telephone+"</a></p><p>Directions: <a target='_blank' href='http://maps.google.com/maps?f=d&amp;source=s_d&amp;t=m&amp;daddr="+m.Address+","+m.City+"'>To Here</a><strong> OR </strong><a target='_blank' href='http://maps.google.com/maps?f-d&amp;source=s_d&amp;t=m&amp;saddr="+m.Address+","+m.City+"'>From Here</a></p><div class='accordion park_hours'><h3>Location Hours:</h3><div class='collapse'><p>"+m.hours+"</p></div></div><div class='accordion park_rates'><h3>Location Rates:</h3><div class='collapse'><p>"+m.rates+"</p></div></div><div class='accordion park_monthly'><h3>Monthly Parking:</h3><div class='collapse'><p>"+m.Monthly+"</p></div></div></div>";
                $('.location_windows').append(loc_win);
                
                var monthly_url = 'parkingmap/monthly.php';

                if(m.Monthly.indexOf("LID=") > -1){
                    id = m.Monthly.split("LID=");
                    id = id[1];
                    monthly_url = "parkingmap/monthly.php?o=1&id="+id;
                } else{
                    monthly_url = "parkingmap/monthly.php?o=2";
                }

                $.get(monthly_url, function(data){
                    $('#info-win-'+m.ID+' .park_monthly .collapse p').html(data.html);
                    console.log(data.html);
                }, "json");

                google.maps.event.addListener(infoWins[idx-1], 'domready', function() {
                    var gid = this.get('gid');
                    $('#goaddrtab-'+gid).trigger('click');
                });

                google.maps.event.addListener(markers[midx-1], 'click', function() {
                    closeAllWins();
                    closeBroker();
                    $('.parking_broker').css('margin','20px 0 0');
                    myWin = this.get("widx");
                    $('#mapselectors .section.location_windows').css("display","block");
                    if($('#mobile_header').css('display') == 'block'){
                        $('.loc_list').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
                        $('.loc_list').find('.collapse').slideToggle('fast');
                        $('#info-win-'+m.ID).css('top','10px').fadeIn('slow');
                    }else if($('.loc_list').css('display') == 'none'){
                        closeAllWins();
                        $('.search_criteria .accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
                        $('.search_criteria .accordion_icon').parent().find('.collapse').slideUp('fast');
                        $('#info-win-'+m.ID).css('top','115px').fadeIn('slow');
                    }else{
                        if($('.loc_list').find('.collapse').css('display') == 'block'){
                            $('.loc_list').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
                            $('.loc_list').find('.collapse').slideToggle('fast');
                        }
                        $('#info-win-'+m.ID).css('top','5px').fadeIn('slow');
                    }
                    if($('#mapselectors').css('display') == 'none'){
                        slidePane();
                    }
                    infoWins[parseInt(myWin)-1].open(theMap,this);
                });

                google.maps.event.addListener(markers[midx-1], 'mouseover', function() {
                    this.setIcon(imageOvr);
                });

                google.maps.event.addListener(markers[midx-1], 'mouseout', function() {
                    this.setIcon(imageStd);
                });
            });
        }
    });

    $('#find-locations').bind('click',function(e){
        e.preventDefault();
        var address;
        if( $('#myDestinationInput').val() && $('#selectcity option:selected').val().length > 0){
            $('form').find('.parking-info').css('color','#3D3A3A');
            address = $('#myDestinationInput').val() + ', ' + $('#selectcity option:selected').val();
            $('.search_criteria').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
            $('.search_criteria').find('.collapse').slideToggle('fast');
            searchAccordControl();
        } else if( $('#selectcity option:selected').val().length > 0 ) {
            $('form').find('.parking-info').css('color','#3D3A3A');
            address = $('#selectcity option:selected').val();
            $('.search_criteria').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
            $('.search_criteria').find('.collapse').slideToggle('fast');
            searchAccordControl();
        } else if( $('#myDestinationInput').val()){
            $('form').find('.parking-info').css('color','#3D3A3A');
            address = $('#myDestinationInput').val();
            $('.search_criteria').find('.accordion_icon').addClass('open').css('background-image','url("../images/open_acc.png")');
            $('.search_criteria').find('.collapse').slideToggle('fast');
        } else {
            $('form').find('.parking-info').css('color','red');
        }
        var theDist = $('#show-parking option:selected').val();
        geoCodeAddress(address,theDist);

    });
    $('.close_icon').click(function(){
        $('.location_windows').css("display","none");
        searchAccordControl();
    });
});
function slidePane(){
    var effect="slide";
    var options={ direction: 'left'};
    var duration=700;
    $('#mapselectors').toggle(effect,options,duration);
    $('#inner.arrow_container').fadeToggle();
}
function checkPane(){
    if($('#mapselectors').css('display') == 'none'){
        slidePane();
    }
}