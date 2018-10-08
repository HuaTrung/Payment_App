// Some public config
const mongoOnline = "mongodb://root:root1997@ds161102.mlab.com:61102/online_payment";
const mongoLocal = "mongodb://localhost:27017/OnlinePayment";

module.exports = {
    port: 5000,
    mongoURL: /*mongoLocal ||*/ mongoOnline ,

    nexmoKey : "ac6eeac2",
    nexmoSecret: '29nIW80lLaDZoWlT',
    appId: '2f2a8b1d-ec2f-47e7-95c9-ae8dd1dff2ac',
    privateKey: '3d723308700b784',
    testNumber: '84932311434',
    
    nexmoSuccess: '0',
    nexmoCodeLength:6,

    apiProductKey: 'pob7OWUrOSWApAXEMyzL0swsSdL33wVM'


}