import ApiService from "./apiService";

export interface Message {
  sender: string;
  recipient: string;
  text: string;
  timestamp: Date;
}

export class MessageService {
  static async getMessagesWithUser(username: string): Promise<Message[]> {
    return ApiService.get<Message[]>(`/chat/messages/${username}`);
  }
}
