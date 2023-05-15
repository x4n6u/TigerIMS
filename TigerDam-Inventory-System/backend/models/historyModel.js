const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    itemChanges: {
      sku: {
        type: Number
      },
      quantity: {
        type: Number
      },
      description: {
        type: String
      },
      name: {
        type: String
      },
      unitPrice: {
        type: Number
      }
    },

    orderChanges: {
      orderDate:{
        type:  Date,
      },
      orderName:{
          type:  String,
      },
      orderItems: [{
          itemName:{
              type: String
          },
          itemQuantity:{
              type: Number
          },
          itemID:{
              type: Schema.Types.ObjectId
          }    
      }],
      isFulfilled:{
          type: Boolean,
      }
    },

    userChanges: {
      username: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
      }
    },
    objectType: {
      type: String,
      enum: ['item', 'order'],
      required: true
    },
    actionType: {
      type: String,
      enum: ['created', 'edited', 'deleted', 'fulfilled'],
      required: true
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
