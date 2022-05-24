const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trades = new Schema({
    RequesterId: { type: Schema.Types.ObjectId },
    ReceiverId: { type: Schema.Types.ObjectId },
    RequesterProductId: { type: Schema.Types.ObjectId },
    ReceiverProductId: { type: Schema.Types.ObjectId },
    RequesterName: { type: String },
    ReceiverName: { type: String },
    RequesterProductName: { type: String },
    ReceiverProductName: { type: String },
    tradeStatus: { type: String, default: "pending" }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Trade', trades);