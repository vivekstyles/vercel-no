
let toSenter = [];
function sent(toSent){

    var push = require('web-push')

    // var key = push.generateVAPIDKeys();

    var VAPIDKeys = {
        publicKey: 'BFYw_Pb5y4ha8-H8r3NJoa33xwRuGBetzTHkrk02p_1z4hWRhP7mAdZCh002mt2XAnVq98DlknuFaFOxaYnqRWo',
        privateKey: 'M-vWGgaSaHf1gqT8Fdy895T0L0cvI0qqMbUUs-9tWps'
    }

    push.setVapidDetails('mailto:vivek@logasapp.om',VAPIDKeys.publicKey,VAPIDKeys.privateKey);

    let sub = {"keys": {"auth": "dyipHN-Y7Qr9QRGKHvbfsQ", "p256dh": "BC6FM5AQSE2Rgtw5PZ58v9ESRpA9ai4yPBta85_Z-RsTs-WdkWA4Jkjohvi-F85fkLM7M2OPzXzC87PDRvgwMSs"}, "endpoint": "https://fcm.googleapis.com/fcm/send/dHg-LyLW2L8:APA91bEvwXkhpBajRJ_twzZTeLX-7Qqu8L3GuCbFpxRn3o9SoWAf1rxxPQzE0Bx4sdaDknOO2K8mmcFiGwA9_hWxjt5WKkeqojSOuPTJubYfpZ3co6zj0Vb2x-tZMK7Oud8JIqUw8cuS", "expirationTime": null}
    console.log(toSent)
     
    let b = push.sendNotification(toSent ,'test message')   
    
    return b
}

var http = require('http');


let triger = async () => {
    let res = '';

    var mysql = require('mysql');
    const util = require('util');

    var con = mysql.createConnection({
    host: "logasapp.com",
    user: "logassok_ro",
    password: "L0g@s123",
    database: "logassok_LogasDemo"
    });

    con.connect(function(err) {  
        if (err) throw err;  
        res = "Connected!";  
      }); 
    
    

    const query = util.promisify(con.query).bind(con);
    
    try {
        const rows = await query("SELECT browser_id FROM `browser_push_notify` order by date_added desc limit 2");
        
        for (let i = 0; i < rows.length; i++) {  
                if(i == 0){      
                let a = JSON.parse(rows[i].browser_id) 
                res = sent(a); 
                 
                break;}
            }
            // res = "yes";
    } finally {
        

        con.end();
        
    }
        return res;
}



module.exports = async (req,res) => {
    if (req.method == 'GET' ) {

        res.json(JSON.stringify(await triger()))        
    }else{
        
    }
}