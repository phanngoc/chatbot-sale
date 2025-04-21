import { UserModel } from '../models/User';

/**
 * Lấy thông tin người dùng dựa trên ID
 */
export async function getUserData(userId: string) {
  try {
    // Đầu tiên tìm trong database
    const user = await UserModel.findOne({ userId }).lean();
    
    if (user) {
      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        orderHistory: user.orderHistory || [],
        preferences: user.preferences || {}
      };
    }
    
    // Nếu không tìm thấy, trả về đối tượng rỗng
    return {
      userId,
      orderHistory: [],
      preferences: {}
    };
  } catch (error) {
    console.error('Error retrieving user data:', error);
    // Trả về dữ liệu tối thiểu nếu có lỗi
    return {
      userId,
      orderHistory: [],
      preferences: {}
    };
  }
}

/**
 * Cập nhật thông tin người dùng
 */
export async function updateUserData(userId: string, data: any) {
  try {
    const result = await UserModel.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true, upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
}

/**
 * Lấy lịch sử đơn hàng của người dùng
 */
export async function getUserOrderHistory(userId: string) {
  try {
    const user = await UserModel.findOne({ userId }).lean();
    return user?.orderHistory || [];
  } catch (error) {
    console.error('Error retrieving user order history:', error);
    return [];
  }
} 