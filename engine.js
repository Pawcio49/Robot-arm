// CONSTS
var BASE_URL = "127.0.0.1";
var lastDirection = false;
var READ_COORD_INTERVAL = null;

$(document).ready(function() {
    main();
});

function main() {
    // --- start reading data
    ReadCoordinates();
    
    
    // --- bind events ###################### zrobić bindy na klawiaturę, wysyłać AJAXem gdzieś dane
    
    // base spin
    $('.arrow-spin-left').on('click', function() {
        AnimateRotate(2, $('#robot-part-base'), $('#robot-part-base-angle'), "left", 360);
    });
    
    $('.arrow-spin-right').on('click', function() {
        AnimateRotate(2, $('#robot-part-base'), $('#robot-part-base-angle'), "right", 360);
    });
    
    // bottom arm swing
    $('.arrow-bottom-arm-swing-left').on('click', function() {
        AnimateRotate(2, $('#robot-part-bottom'), $('#robot-part-bottom-arm-angle'), "left", 180);
    });
    
    $('.arrow-bottom-arm-swing-right').on('click', function() {
        AnimateRotate(2, $('#robot-part-bottom'), $('#robot-part-bottom-arm-angle'), "right", 180);
    });
    
    // middle arm swing
    $('.arrow-middle-arm-swing-left').on('click', function() {
        AnimateRotate(2, $('#robot-part-middle'), $('#robot-part-middle-arm-angle'), "left", 180);
    });
    
    $('.arrow-middle-arm-swing-right').on('click', function() {
        AnimateRotate(2, $('#robot-part-middle'), $('#robot-part-middle-arm-angle'), "right", 180);
    });
    
    // top arm spin
    $('.arrow-top-arm-spin-left').on('click', function() {
        AnimateRotate(2, $('#robot-part-top-spin'), $('#robot-part-top-spin-arm-angle'), "left", 360);
    });
    
    $('.arrow-top-arm-spin-right').on('click', function() {
        AnimateRotate(2, $('#robot-part-top-spin'), $('#robot-part-top-spin-arm-angle'), "right", 360);
    });
    
    // top arm swing
    $('.arrow-top-arm-swing-left').on('click', function() {
        AnimateRotate(2, $('#robot-part-top'), $('#robot-part-top-arm-angle'), "left", 180);
    });
    
    $('.arrow-top-arm-swing-right').on('click', function() {
        AnimateRotate(2, $('#robot-part-top'), $('#robot-part-top-arm-angle'), "right", 180);
    });
    
    // grapser
    $('.grasper-open').on('click', function() {
        changeGrasperState(0);
    });
    
    $('.grasper-close').on('click', function() {
        changeGrasperState(1);
    });
}

function AnimateRotate(angle, $elem, $angleHolder, direction, maxAngle) {    
    var currentAngle = getRotationDegrees($elem);
    
    if(direction == "left") {
        if((currentAngle == (360 - maxAngle) && currentAngle - angle < maxAngle && (direction != lastDirection)) || (currentAngle < maxAngle && currentAngle - angle < maxAngle) || (currentAngle > maxAngle && currentAngle - angle >= 360 - maxAngle)) {
            $elem.css({
                transform: 'rotate(' + (currentAngle - angle) + 'deg)'
            }); 
            lastDirection = direction;
        }
    } else if (direction == "right") {    
        if(((currentAngle == maxAngle && currentAngle + angle > (360 - maxAngle)) && (direction != lastDirection)) || ((currentAngle < maxAngle && currentAngle + angle <= maxAngle) || (currentAngle > maxAngle && currentAngle + angle >= (360 - maxAngle)))) {
            $elem.css({
                transform: 'rotate(' + (currentAngle + angle) + 'deg)'
            });
            lastDirection = direction;
        }
    }
    
    $angleHolder.val(getRotationDegrees($elem));
    
    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    }
}

function changeGrasperState(newState) {
    var grapser = $('#robot-part-grasper-state');
    var grapserState = grapser.val();
    
    if(newState == 1 && grapserState == "OPEN") {
        grapser.val("CLOSE");
    } else if(newState == 0 && grapserState == "CLOSE") {
        grapser.val("OPEN");
    }
}

function ReadCoordinates() { 
    READ_COORD_INTERVAL = setInterval(function() {
        var baseSpinCoord = parseInt($('#robot-part-base-angle').val());
        var bottomArmCoord = parseInt($('#robot-part-bottom-arm-angle').val());
        var middleArmCoord = parseInt($('#robot-part-middle-arm-angle').val());
        var topArmSpinCoord = parseInt($('#robot-part-top-spin-arm-angle').val());
        var topArmCoord = parseInt($('#robot-part-top-arm-angle').val());
        var grasperCoord = $('#robot-part-grasper-state').val();
        
        if(grasperCoord == "OPEN") {
            grasperCoord = 0;
        } else if(grasperCoord == "CLOSE") {
            grasperCoord = 1;
        }
        
        SendCoordinates(baseSpinCoord + ' | ' + bottomArmCoord + ' | ' + middleArmCoord + ' | ' + topArmSpinCoord + ' | ' + topArmCoord + ' | ' + grasperCoord);
    }, 100);
}

function SendCoordinates(coords) {
    // AJAX SEND SOMEWHERE COORDS
    console.log(coords);
}