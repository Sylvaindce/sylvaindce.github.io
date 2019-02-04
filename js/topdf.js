/*
A4
300 dpi 2480 X 3508 pixels
200 dpi 1654 X 2339 pixels
100 dpi 827 X 1170 pixels
100 dpi 596 X 842 pixels
*/

function mobile_check() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function to_pdf( filename ) {
    if (mobile_check()) {
        alert("Info: Can't download PDF with mobile device");
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
        title: filename.replace(/_/g, " " ).capitalize( ),
        subject: filename.replace(/_/g, " " ).capitalize( ),		
        author: filename.split("curriculum_vitae_")[1].replace(/_/g, " ").capitalize( ),
        creator: filename.split("curriculum_vitae_")[1].replace(/_/g, " ").capitalize( ),
        keywords: "generated, javascript, web, curriculum, vitae, cv, dev, developer"
    });

    html2canvas( html_body ).then( canvas => {
        var img = canvas.toDataURL( "image/png", 1 );
        var img_width = 210;
        var img_height = canvas.height * img_width / canvas.width;
        var page_height = 295;
        var height_left = img_height;

        var position = 0;
        
        doc.setDrawColor(0)
        doc.setFillColor( 224, 224, 224 );
        doc.rect(0, 0, img_width, page_height + 20, 'F');
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