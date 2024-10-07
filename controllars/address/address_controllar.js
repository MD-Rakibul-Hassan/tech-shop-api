const Address = require('../../models/address/address_modle');

const addressControllar = {};

addressControllar.addAddress = async (req, res) => {
    const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
    const userId = req.user;
    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    res.json({message:"Address added",success:true,userAddress})
}

addressControllar.getAddress = async (req, res) => {
    const address = await Address.find({userId:req.user}).sort({ createdAt: -1 })
    res.json({message:"Your address",userAddress:address[0],success:true})
}


module.exports = addressControllar