export interface User {
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  user: User;
  time: string;
  text: string;
  image?: string; // optional
  likes: number;
  comments: number;
}
export const POSTS: Post[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    time: "2h ago",
    text: "Crushed an early morning leg day 🔥💯 Feel unstoppable.",
    image: "https://picsum.photos/400/300?random=7",
    likes: 82,
    comments: 14,
  },
  {
    id: "2",
    user: {
      name: "Emily Parker",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    time: "5h ago",
    text: "Hit a new personal record today! Deadlift 225lbs 🎉",
    image: "https://picsum.photos/400/300?random=9",
    likes: 143,
    comments: 22,
  },
  {
    id: "3",
    user: {
      name: "Alice Carter",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    time: "3h ago",
    text: "Just finished a 5km run! Feeling amazing 💪",
    image: "https://picsum.photos/400/300?random=3",
    likes: 64,
    comments: 9,
  },
  {
    id: "4",
    user: {
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    time: "4h ago",
    text: "Back at the gym! #gains",
    image: "https://picsum.photos/400/300?random=4",
    likes: 97,
    comments: 11,
  },
  {
    id: "5",
    user: {
      name: "Charlie Daniels",
      avatar: "https://i.pravatar.cc/150?img=23",
    },
    time: "6h ago",
    text: "Morning yoga is the best way to start the day 🌞",
    likes: 51,
    comments: 6,
  },
  {
    id: "6",
    user: {
      name: "Mia Reynolds",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
    time: "1h ago",
    text: "Trying out a new protein shake recipe today 🥤✨",
    image: "https://picsum.photos/400/300?random=6",
    likes: 34,
    comments: 4,
  },
  {
    id: "7",
    user: {
      name: "Daniel Wright",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    time: "8h ago",
    text: "Finally hit my bench PR — 275lbs! 💪🔥",
    image: "https://images.unsplash.com/photo-1508117639632-4e4bbf0b79a0",
    likes: 201,
    comments: 39,
  },
  {
    id: "8",
    user: {
      name: "Sophia Martinez",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    time: "10h ago",
    text: "Recovery day 😌 Hydration + stretching!",
    likes: 29,
    comments: 3,
  },
];
