import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
  orderHistory?: Array<{
    orderId: string;
    date: Date;
    total: number;
    status: string;
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  }>;
  preferences?: {
    categories?: string[];
    favoriteProducts?: string[];
    theme?: 'light' | 'dark';
    notificationSettings?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    sparse: true
  },
  avatar: String,
  orderHistory: [
    {
      orderId: String,
      date: {
        type: Date,
        default: Date.now
      },
      total: Number,
      status: String,
      items: [
        {
          productId: String,
          name: String,
          quantity: Number,
          price: Number
        }
      ]
    }
  ],
  preferences: {
    categories: [String],
    favoriteProducts: [String],
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notificationSettings: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      }
    }
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', UserSchema); 