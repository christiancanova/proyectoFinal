class MessageDto {
    constructor(message) {
      this.id = message._id;
      this.date = message.date;
      this.email = message.email;
      this.user = message.user;
      this.body = message.body;
    }
  }
  export const messageDto = (messages) => {
    if (Array.isArray(messages)) {
      return messages.map((message) => new MessageDto(message));
    } else {
      return new MessageDto(messages);
    }
  };