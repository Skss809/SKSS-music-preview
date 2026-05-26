export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Feedback {
  text: string;
  userId: string;
  userEmail: string;
  createdAt: string;
}
