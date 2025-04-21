import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  messageId: string;
  sessionId: string;
  userId: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: Record<string, any>;
}

const MessageSchema = new Schema<IMessage>({
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String, 
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Tạo index cho việc tìm kiếm nhanh
MessageSchema.index({ userId: 1, timestamp: -1 });
MessageSchema.index({ sessionId: 1, timestamp: 1 });

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema); 