"use strict";

/*************** Init JS *********************
	
  TABLE OF CONTENTS
  ---------------------------
  .Tools
  .Language
  .Content
  .Navigation
	.Main
  

  Copyright © 2010 Sylvain Decombe.
  All rights reserved.

*************** Init JS *********************/




/*************** Tools Begin ***************/

String.prototype.capitalize = function( ) {
  return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
}

$.url_param = function( name ){
  var results = new RegExp( "[\?&]" + name + "=([^&#]*)").exec( window.location.href );
  if ( results == null ) {
     return null;
  }
  return decodeURI( results[1] ) || 0;
}

function generate_random_color( ) {
  var letters = "0123456789ABCDEF";
  var color = '#';
  for ( var i = 0; i < 6; ++i ) {
    color += letters[ Math.floor( Math.random() * 16 ) ];
  }
  return color;
}

/*************** Tools End ***************/




/*************** Language Begin ***************/

function set_language( ) {
  var lang = $.url_param( "lang" );

  if ( !lang ) {
    window.location.search += $.param( { lang : "en" } );
    lang = "en";
  }
  switch ( lang.toLowerCase() ) {
    case "en":
      $( "#lang_chooser_txt" ).text( "FR" );
      break;
    case "fr":
      $( "#lang_chooser_txt" ).text( "EN" );
      break;
    default:
      lang = "en";
      $( "#lang_chooser_txt" ).text( "FR" );
      break;
  }
  load_lang_from_json( lang )
  return lang;
}

/*************** Language End ***************/




/*************** Content Begin ***************/

function load_lang_from_json( lang ) {
  $.getJSON( "data/lang.json" , function( data ) {
      for (const property in data[lang]) {
        $( `[id=${property}]` ).text(data[lang][property]);
        if (property === "hello_txt") {
          $( `#${property}` ).append(" <span id='typed'></span>");
        }
      }
  });
}

function load_data_from_json( lang ) {
  $.getJSON( "data/decombe_sylvain_cv_" + lang + ".json" , function( data ) {
    //INFO
    $( "#name" ).text( data.info.firstname + " " + data.info.lastname );
    $( "#age_txt" ).append( data.info.age );
    $( "#address_txt" ).append( data.info.address );
    $( "#driver_txt" ).append( data.info.driver_licence );
    $( "#email_txt" ).text( data.info.email );
    $( "#email_txt" ).attr( "href", "mailto:" + data.info.email );
    //$( "#profil_picture" ).attr( "src", data.info.picture );
    $( "#profil_picture" ).css("background-image", "url(" + data.info.picture + ")")
    $( "#info_description" ).html( data.info.description );

    var typed = new Typed("#typed", {
      strings: [ "^2100&nbsp;", data.info.short_description ],
      typeSpeed: 75,
      backDelay: 750,
      loop: false,
      cursorChar: "|",
      contentType: 'html',
      loopCount: false
    });
    typed = undefined;

    //LANGUAGES
    $.each( data.languages , function( key, val ) {
      $( "#lang_list" ).append(`<li>${key.capitalize()} <span>${val}</span></li>`);
    });
    
    //INTEREST
    var interests_items = [];
    $.each( data.interests , function( key, val ) {
      interests_items.push( "<i title=\"" + key.capitalize() + "\" style=\"margin: 10%\" class=\"fa " + val + " fa-2x\"></i>" );
    });
    $( "<h4/>", {
      html: interests_items.join( "" )
    }).appendTo( "#interests_container" );
    interests_items = undefined;

    // EDUCATION
    var education_items = [];
    $.each( data.education, function( key, val ) {
      education_items.push("<div class=\"row qualfication\">\
                    <div class=\"col-sm-2\">\
                      <span class=\"row-count\"><span>" + ( key + 1 ) + "</span></span>\
                    </div>\
                    <div class=\"col-sm-2\">\
                      <span class=\"yr-pers vertical-align-pad\">" + val.date + "</span>\
                    </div>\
                    <div class=\"col-sm-5\">\
                      <span class=\"insti vertical-align-pad\">" + val.school + ", " + val.location + "</span>\
                    </div>\
                    <div class=\"col-sm-3\">\
                      <span class=\"design vertical-align-pad\">" + val.title + "</span>\
                    </div>\
                  </div>");
    });
    $( "<ul/>", {
      html: education_items.join( "" )
    }).appendTo( "#education_container" );
    education_items = undefined;

    //WORK EXPERIENCE
    var workexperience_items = [];
    $.each( data.work_experience, function( key, val ) {
      workexperience_items.push("<li>\
      <div class=\"col-xs-10 exp-content-wrap\">\
          <div class=\"row\">\
              <div class=\"col-sm-3 duration\"><span>" + val.date + "<br/><span style=\"font-size: smaller;\">" + val.type_of_contract + "</span></span></div>\
              <div class=\"col-sm-9\">\
                <span class=\"job-desn\">" + val.job_title + "</span>\
                <span class=\"job-loc\">" + val.company + ", " + val.location + "</span>\
                <p class=\"job-summary p-small\">" + val.description + "</p>\
            </div>\
          </div>\
      </div>\
      </li>");
    });
    $( "<ul/>", {
      "class": "timeline",
      html: workexperience_items.join( "" )
    }).appendTo( "#workexperience_container" );
    workexperience_items = undefined;

    //SKILLS
    var skills_categories = Object.keys( data.skills );
    var skills_items = [];
    $.each( skills_categories, function( key_0, val_0 ) {
      skills_items.push("<div class=\"col-sm-6 margin-bottom-sm\">\
                          <div class=\"main-skills-container\">\
                            <h4>" + val_0.capitalize().replace(/_/g, " ") + "</h4>");
      
      if ( jQuery.type(data.skills[val_0]) === "object" ) {
        skills_items.push("<div class=\"skills-container\"><div class=\"sub-skills-container\"><ul>");
        $.each( data.skills[val_0], function( key_1, val_1) {
          skills_items.push("<li>" + key_1 + " <span>" + val_1 + "</span></li>");
        });
        skills_items.push("</ul></div></div>");
      }
      else if ( jQuery.type(data.skills[val_0]) === "array" ) {
        skills_items.push("<div style=\"margin-top: 26px; text-align: center;\">");
        $.each( data.skills[val_0], function( key_1, val_1) {
          var tmp_str = "<span class=\"desc\" style=\"color: #42A5F5; font-family: Lato;\">" + val_1;
          if ( key_1 == data.skills[val_0].length - 1 ) {
            tmp_str += "</span>";
          } else {
            tmp_str += ", </span>";
          }
          skills_items.push( tmp_str );
        });
        skills_items.push("</div>");
      }
      skills_items.push("</div></div>");
    });
    $("#skills_container").append(skills_items.join( "" ));
  
    // REFERENCES
    $.each( data.reference , function( key, val ) {
        $( "#reference_list" ).append(`<li><a href="${val}">${key.capitalize()}</a></li>`);
    });
  
  });
}

/*************** Content End ***************/




/*************** Navigation Begin ***************/

function nav_bar_init( ) {
  var __offset = 150;

  $( window ).scroll(function() {
    var scroll = $( window ).scrollTop();
    if (scroll >= __offset) {
      $( "header" ).addClass("fixed");
    } else {
      $( "header" ).removeClass("fixed");
    }
  });
}

function smooth_scroll_on_click( ) {
  $( ".smooth" ).click( function() {
    var page = $( this ).attr( "href" );
    $( "html, body" ).animate( { scrollTop: $( page ).offset().top }, "slow" );
    return false;
  });
}

function collapse_menu_on_click( ) {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #main_content').toggleClass('active');
    return false;
  });
}

function change_lang( ) {
  $( "#lang_chooser_txt" ).on( "click", function() {
    var act_lang = $( "#lang_chooser_txt" ).text();
    switch ( act_lang.toLowerCase() ) {
      case "en":
        location.href = location.href.replace("lang=fr", "lang=en");
        break;
      case "fr":
        location.href = location.href.replace("lang=en", "lang=fr");
        break;
      default:
        location.href = location.href.replace("lang=fr", "lang=en");
        break;
    }
  });
}

/*************** Navigation End ***************/




/*************** Main Begin ***************/

$( document ).ready( function() {
  smooth_scroll_on_click();
  nav_bar_init();
  collapse_menu_on_click();
  var lang = set_language();
  load_data_from_json( lang );
  change_lang();

  $( "#gen_pdf" ).click(function() {
    window.scrollTo( 0, 0 );
    console.log( "Generating PDF..." );
    setTimeout(() => {  to_pdf( "curriculum_vitae_" + $( "#name" ).text().replace( " ", "_" ).toLowerCase() ); }, 200 );
  });
});

/*************** Main End ***************/

/**
Copyright © 2010 Sylvain Decombe. All rights reserved.
**/
