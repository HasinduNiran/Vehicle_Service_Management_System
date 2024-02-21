const router = requare ("express").router();
let packge = requare("../models/package");

router.route.add("/add").post((req, res)=>{
    const pakgname = req.body.pakgname;
    const pkgdiscription = req.body.pkgdiscription;
    const pkgimage = req.body.pkgimage;
    const includes = req.body.includes;
    const extraFetures = req.body.extraFetures;

    const newPackage = new packge({
        pakgname,
        pkgdiscription,
        pkgimage,
        includes,
        extraFetures
    })
   newPackage.save().then(()=>{
       res.json("Package Added")
   }).catch((err)=>{
       console.log(err);
   })
})
router.route("/").get((req, res)=>{
    packge.find().then((packages)=>{
    res.json(packages);
    }).catch((err)=>{
        console.log(err);
    })
});
router.route("/update/:id").put(async(req, res)=>{
    let packageId = req.params.id;
    const {pakgname, pkgdiscription, pkgimage, includes, extraFetures} = req.body;
    const updatePackage = {
        pakgname,
        pkgdiscription,
        pkgimage,
        includes,
        extraFetures
    }
    const update = await packge.findByIdAndUpdate(packageId, updatePackage).then(()=>{
        res.status(200).send({status: "Package Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})
router.route("/delete/:id").delete(async(req, res)=>{
    let packageId = req.params.id;
    const deletePackage = await packge.findByIdAndDelete(packageId).then(()=>{
        res.status(200).send({status: "Package Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data", error: err.message});
    })
})
    
router.route("/get/:id").get(async(req, res)=>{
    let packageId = req.params.id;
    const package = await packge.findById(packageId).then(()=>{
        res.status(200).send({status: "Package fetched", package})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with fetching data", error: err.message});
    })
})