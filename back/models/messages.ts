interface Message {
  id: string;
  conversation_id: string;
  role_ia: 'user' | 'assistant';
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default Message;
