/*
A4
300 dpi 2480 X 3508 pixels
200 dpi 1654 X 2339 pixels
100 dpi 827 X 1170 pixels
100 dpi 596 X 842 pixels
*/

function to_pdf( filename ) {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    if (iOS) {
        alert("Info: Can't download PDF with iOS device");
        return;
    }

    $( "#navigation" ).css( "visibility", "hidden" );
    $( "#gen_pdf" ).css( "visibility", "hidden" );
    $( "#mainview" ).css( "padding-top", "0vh");
    $( "#skills" ).parent().parent().css( "margin-top", "42vh" );
    old_width = document.body.style.width;
    width = 1654;
    document.body.style.width = width + "px";

    var html_body = document.body;
    var tmp = $( "#home" ).get(0);

    var w = tmp.offsetWidth;
    var h = tmp.offsetHeight;

    var doc = new jsPDF( 'p', "mm", "a4" );

    doc.setProperties({
        title: filename.replace( "_", " " ).capitalize( ),
        subject: filename.replace( "_", " " ).capitalize( ),		
        author: filename.split("curriculum_vitae_")[1].replace("_", " ").capitalize(),
        creator: filename.split("curriculum_vitae_")[1].replace("_", " ").capitalize(),
        keywords: "generated, javascript, web, curriculum, vitae, cv, dev, developer"
    });

    html2canvas( html_body ).then( canvas => {
        var img = canvas.toDataURL( "image/png", 1 );
        var img_width = 210;
        var img_height = canvas.height * img_width / canvas.width;
        var page_height = 295;
        var height_left = img_height;

        var position = 0;
        
        doc.addImage( img, "PNG", 0, position, img_width, img_height );
        height_left -= page_height;

        while (height_left >= 0) {
            position = height_left - img_height;
            doc.addPage( );
            doc.setDrawColor(0)
            doc.setFillColor( 224, 224, 224 );
            doc.rect(0, 0, img_width, page_height + 20, 'F');
            doc.addImage( img, "PNG", 0, position, img_width, img_height );
            height_left -= page_height;
        }
        doc.save( filename + ".pdf" );
    });

    /*var doc = new jsPDF('p', 'pt', 'a4');
	doc.html( html_body, { callback : function( doc ) {
            doc.save( "html.pdf" );
		}
    });*/

    setTimeout( function( ) {
        $( "#navigation" ).css( "visibility", "visible" );
        $( "#gen_pdf" ).css( "visibility", "visible" );
        $( "#mainview" ).css( "padding-top", "8vh");
        $( "#skills" ).parent().parent().css( "margin-top", "0vh" );
        document.body.style.width = old_width;
    }, 6000);
}