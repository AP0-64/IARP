interface Message {
  id: string;
  conversationId: string;
  roleIa: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Message;
