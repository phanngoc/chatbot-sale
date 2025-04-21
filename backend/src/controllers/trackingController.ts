import { Request, Response } from 'express';
import { db } from '../services/database';

// Interface cho dữ liệu tracking
interface TrackingEvent {
  userId?: string;
  anonymousId: string;
  eventType: string;  // view_product, add_to_cart, begin_checkout, purchase
  timestamp: Date;
  metadata: any;
}

// Theo dõi một sự kiện từ người dùng
export const trackEvent = async (req: Request, res: Response) => {
  try {
    const { 
      userId, 
      anonymousId, 
      eventType, 
      metadata 
    } = req.body;
    
    if (!eventType || !anonymousId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Thiếu thông tin bắt buộc: eventType, anonymousId' 
      });
    }
    
    const event: TrackingEvent = {
      userId: userId || undefined,
      anonymousId,
      eventType,
      timestamp: new Date(),
      metadata: metadata || {}
    };
    
    await db.collection('tracking_events').insertOne(event);
    
    return res.status(201).json({ 
      success: true, 
      message: 'Đã ghi nhận sự kiện'
    });
  } catch (error) {
    console.error('Lỗi khi theo dõi sự kiện:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra khi theo dõi sự kiện' 
    });
  }
};

// Lấy các sự kiện đã theo dõi
export const getTrackedEvents = async (req: Request, res: Response) => {
  try {
    const { userId, anonymousId, eventType, limit = 20, skip = 0 } = req.query;
    
    // Xây dựng filter dựa trên các tham số truy vấn
    const filter: any = {};
    
    if (userId) filter.userId = userId;
    if (anonymousId) filter.anonymousId = anonymousId;
    if (eventType) filter.eventType = eventType;
    
    const events = await db.collection('tracking_events')
      .find(filter)
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .toArray();
    
    const total = await db.collection('tracking_events').countDocuments(filter);
    
    return res.status(200).json({
      success: true,
      data: {
        events,
        pagination: {
          total,
          limit: Number(limit),
          skip: Number(skip)
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy các sự kiện:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra khi lấy các sự kiện' 
    });
  }
}; 