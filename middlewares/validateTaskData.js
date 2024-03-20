export const validateTaskData = (req,res,next) =>{
    const {description,status} = req.body;
    if(!description || typeof description!=='string'){
        return res.status(400).json({message:'Invalid or missing descrition'});

    }
    next();
}
