const GPS = require('../model/GPS');



exports.getData = (req, res, next) => {
    let totalItems;
    GPS.findAll().then((gps) => {totalItems = gps.length})

    let page = req.query.page || 1; 
    let limit = 5;
    let offset = (page - 1) * limit;
//Pagination
    GPS.findAll({
        //limit: limit,
        //offset: offset,
    }).then((gps => {
        const PageMarker = (offset + 1) + "-" + limit*page + " " + "of" + " " + totalItems;
//Sorting
        if (req.query.sortDeviceId){
            gps.sort((function(a,b){
                return (a["DeviceId"] > b["DeviceId"]) ? 1 : ((a["DeviceId"] < b["DeviceId"]) ? -1 : 0);
            }))
            return res.status(200).json({
                gps,
                // PageMarker, 
            });
        }
        else if(req.query.sortDeviceType){
            gps.sort((function(a,b){
                return (a["DeviceType"] > b["DeviceType"]) ? 1 : ((a["DeviceType"] < b["DeviceType"]) ? -1 : 0);
            }))
            return res.status(200).json({
                gps,
                //PageMarker, 
            });            

        }
        else{res.status(200).json({
            gps,
            // PageMarker, 
        });}
    }));

}


exports.searchData = (req, res, next) => {
//Query Search
    if (req.query.DeviceId){
        GPS.findAll({
            where: {
                DeviceId: req.query.DeviceId,
            },
        }).then((gps) => {
            res.status(200).json({
                gps,
              });
        })
    }

    else if (req.query.DeviceType){
        GPS.findAll({
            where: {
                DeviceType: req.query.DeviceType,
            },
        }).then((gps) => {
            res.status(200).json({
                gps,
              });
        });
    };
}



